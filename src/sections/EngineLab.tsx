import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info, RotateCcw } from "lucide-react";
import { Reveal, SectionHeader, SourceRef } from "@/components/ui";
import { blob, csBlob } from "@/data/links";
import {
  COLD_START_PRIOR, DEFAULT_PREFS, DEFAULT_SIGNALS, ENGINE_VERSION, FAMILY_WEIGHTS, decideStrategy, signalsForLevel,
  type Family, type LearnerPreferences, type LearnerSignals, type TeachingStrategy,
} from "@/lib/engine";

type NumKey = "recent_accuracy" | "historical_accuracy" | "mastery" | "avg_response_ratio" | "hint_rate" | "skip_rate" |
  "mistake_streak" | "low_confidence_rate" | "trend_slope" | "attempts" | "struggle_probability" | "engagement_probability" | "session_minutes";

interface SignalDef {
  key: NumKey;
  label: string;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  help: string;
  group: "Performance" | "Behaviour" | "Models & context";
}

const pct = (v: number) => `${Math.round(v * 100)}%`;
const DEFS: SignalDef[] = [
  { key: "recent_accuracy", label: "Recent accuracy", min: 0, max: 1, step: 0.01, fmt: pct, group: "Performance", help: "Accuracy over the last ~10 answers. It carries 65% of the performance family, so recent form matters more than history." },
  { key: "historical_accuracy", label: "Overall accuracy", min: 0, max: 1, step: 0.01, fmt: pct, group: "Performance", help: "All answers on this topic. It carries the other 35% of the performance family." },
  { key: "mastery", label: "Mastery (BKT)", min: 0, max: 1, step: 0.01, fmt: pct, group: "Performance", help: "Bayesian Knowledge Tracing estimate that the learner knows the topic. Low mastery after practice also schedules a review." },
  { key: "trend_slope", label: "Accuracy trend", min: -0.05, max: 0.05, step: 0.001, fmt: (v) => `${v >= 0 ? "+" : ""}${v.toFixed(3)}/answer`, group: "Performance", help: "Least-squares slope of rolling accuracy. An improving trend lowers the momentum family's need and can switch the tone to celebratory." },
  { key: "avg_response_ratio", label: "Response time", min: 0.5, max: 3, step: 0.05, fmt: (v) => `${v.toFixed(2)}× expected`, group: "Behaviour", help: "Longer response time can influence pacing and support recommendations. Very slow answers under high support also suggest read-aloud." },
  { key: "hint_rate", label: "Hints per question", min: 0, max: 1.5, step: 0.05, fmt: (v) => v.toFixed(2), group: "Behaviour", help: "Hint use is the strongest behavioural signal (25% of the behaviour family). In mastery tracing, a correct answer after a hint counts as weaker evidence." },
  { key: "skip_rate", label: "Skipped questions", min: 0, max: 0.5, step: 0.01, fmt: pct, group: "Behaviour", help: "Skips count as weak negative evidence. Skipping is always allowed: it just helps the next quiz fit better." },
  { key: "mistake_streak", label: "Mistake streak", min: 0, max: 5, step: 1, fmt: (v) => `${v} in a row`, group: "Behaviour", help: "Repeated errors can increase the need for revision or alternative explanations. Two or more in a row also switch the tone to gentle." },
  { key: "low_confidence_rate", label: "“Not sure” answers", min: 0, max: 1, step: 0.01, fmt: pct, group: "Behaviour", help: "Learners can mark how sure they are. Low confidence raises the support need, even when the answer was right." },
  { key: "attempts", label: "Answers on this topic", min: 0, max: 20, step: 1, fmt: (v) => String(v), group: "Models & context", help: `Data confidence = answers ÷ 12. With little data the score is shrunk toward a gently supportive prior of ${COLD_START_PRIOR}.` },
  { key: "struggle_probability", label: "ML struggle prediction", min: 0, max: 1, step: 0.01, fmt: pct, group: "Models & context", help: "Logistic-regression estimate that the next answer will be wrong. If no prediction exists, this family is dropped and the other weights re-normalised." },
  { key: "engagement_probability", label: "ML engagement prediction", min: 0, max: 1, step: 0.01, fmt: pct, group: "Models & context", help: "Estimated chance the learner keeps going for 5+ minutes. Below 40%, pages get lighter, quizzes shorter and a break is suggested." },
  { key: "session_minutes", label: "Session length", min: 0, max: 40, step: 1, fmt: (v) => `${v} min`, group: "Models & context", help: "From 25 minutes on, a brain break is suggested to keep learning comfortable." },
];

const PRESETS: { label: string; make: () => LearnerSignals }[] = [
  { label: "Struggling", make: () => signalsForLevel(10) },
  { label: "Improving", make: () => signalsForLevel(40) },
  { label: "Steady", make: () => signalsForLevel(62) },
  { label: "Mastered", make: () => signalsForLevel(95) },
  { label: "Brand new", make: () => ({ ...DEFAULT_SIGNALS, recent_accuracy: 0.5, historical_accuracy: 0.5, attempts: 1 }) },
];

const FAMILY_LABEL: Record<Family, string> = {
  performance: "Performance",
  mastery: "Mastery (BKT)",
  ml_struggle: "ML struggle",
  behaviour: "Behaviour",
  momentum: "Momentum",
};

const BANDS = [
  { key: "stretch", label: "Stretch", from: 0, to: 0.36, color: "#E9B949" },
  { key: "balanced", label: "Balanced", from: 0.36, to: 0.52, color: "#CF8591" },
  { key: "guided", label: "Guided", from: 0.52, to: 0.68, color: "#8E2F3F" },
  { key: "high_support", label: "High support", from: 0.68, to: 1, color: "#46121E" },
] as const;

function rationale(sig: LearnerSignals, s: TeachingStrategy): string[] {
  const out: string[] = [];
  if (s.data_confidence < 0.35) out.push("Only a few answers so far, so the engine starts with friendly scaffolding.");
  [...s.factors]
    .sort((a, b) => b.need * b.weight - a.need * a.weight)
    .slice(0, 2)
    .forEach((f) => out.push(`Main factor: ${FAMILY_LABEL[f.family].toLowerCase()} (need ${pct(f.need)} × weight ${f.weight.toFixed(2)}).`));
  if (s.review_required) out.push("A short review is scheduled because some ideas need another look.");
  if (s.suggest_break) out.push("A brain break is suggested to keep learning comfortable.");
  if (s.band === "stretch") out.push("Strong, steady results: ready for a bigger challenge.");
  if (sig.struggle_probability === null) out.push("No ML prediction: that family is dropped and weights re-normalised.");
  return out;
}

export function EngineLab() {
  const [sig, setSig] = useState<LearnerSignals>(() => signalsForLevel(40));
  const [prefs, setPrefs] = useState<LearnerPreferences>(DEFAULT_PREFS);
  const [focus, setFocus] = useState<SignalDef>(DEFS[4]);
  const [preset, setPreset] = useState("Improving");
  const s = useMemo(() => decideStrategy(sig, prefs), [sig, prefs]);
  const band = BANDS.find((b) => b.key === s.band)!;

  const set = (k: NumKey, v: number | null) => {
    setPreset("Custom");
    setSig((p) => ({ ...p, [k]: v }));
  };

  const outputs: [string, string][] = [
    ["Difficulty", s.difficulty],
    ["Explanation", s.explanation_style.replace(/_/g, " ")],
    ["Content density", s.content_density],
    ["Hint level", s.hint_level],
    ["Worked examples", String(s.example_count)],
    ["Pacing", s.pacing],
    ["Visual support", s.visual_support],
    ["Answer choices", String(s.option_count)],
    ["Quiz length", `${s.question_count} questions`],
    ["Review", s.review_required ? "scheduled" : "not needed"],
    ["Brain break", s.suggest_break ? "suggested" : "not needed"],
    ["Tone", s.tone],
  ];

  return (
    <section id="engine" aria-labelledby="engine-title" className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-0 bg-dots opacity-40" />
      <div className="container-x relative">
        <SectionHeader
          index="06"
          eyebrow="The adaptive learning engine"
          title={<span id="engine-title">Play with the signals. Watch the strategy change.</span>}
          lede={
            <>
              This lab runs a line-by-line TypeScript port of Lumora's engine in your browser. A parity test checks it against golden
              outputs from the real Python engine, which serves signed-in learners and the product's landing-page demo
              (<code className="font-mono text-sm">POST /api/adaptive/preview</code>).
            </>
          }
        />

        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Learner presets">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-sand-500">Presets</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={preset === p.label}
                onClick={() => {
                  setSig(p.make());
                  setPreset(p.label);
                }}
                className={`min-h-[40px] rounded-full border px-4 text-sm transition ${preset === p.label ? "border-maroon-600 bg-maroon-600 text-cream-50" : "border-sand-200 bg-white text-maroon-700 hover:border-maroon-300"}`}
              >
                {p.label}
              </button>
            ))}
            <button type="button" onClick={() => setPrefs(DEFAULT_PREFS)} className="ml-auto inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-xs text-sand-500 hover:text-maroon-700">
              <RotateCcw size={13} aria-hidden /> Reset preferences
            </button>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.55fr_1.3fr]">
          {/* 1. INPUT SIGNALS */}
          <Reveal className="card p-5 sm:p-6">
            <h3 className="eyebrow mb-4 text-maroon-500">1 · Input signals</h3>
            {(["Performance", "Behaviour", "Models & context"] as const).map((group) => (
              <fieldset key={group} className="mb-5 last:mb-0">
                <legend className="mb-2 text-xs font-semibold text-maroon-800">{group}</legend>
                <div className="space-y-3">
                  {DEFS.filter((d) => d.group === group).map((d) => {
                    const raw = sig[d.key];
                    const off = raw === null;
                    const v = (raw ?? (d.key === "struggle_probability" ? 0.5 : 0)) as number;
                    const fill = ((v - d.min) / (d.max - d.min)) * 100;
                    const nullable = d.key === "struggle_probability" || d.key === "engagement_probability";
                    const id = `sig-${d.key}`;
                    return (
                      <div key={d.key} onMouseEnter={() => setFocus(d)} className={`rounded-xl px-2 py-1.5 transition ${focus.key === d.key ? "bg-cream-100" : ""}`}>
                        <div className="flex items-center justify-between gap-2 text-[0.8rem]">
                          <label htmlFor={id} className="font-medium text-cocoa">{d.label}</label>
                          <span className="font-mono text-[0.72rem] text-maroon-600">{off ? "no model" : d.fmt(v)}</span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <input
                            id={id}
                            type="range"
                            className="signal w-full disabled:opacity-40"
                            min={d.min}
                            max={d.max}
                            step={d.step}
                            value={v}
                            disabled={off}
                            onFocus={() => setFocus(d)}
                            onChange={(e) => set(d.key, Number(e.target.value))}
                            style={{ ["--fill" as string]: `${fill}%` }}
                            aria-describedby="signal-help"
                          />
                          {nullable && (
                            <label className="flex shrink-0 items-center gap-1 text-[0.65rem] text-sand-500">
                              <input type="checkbox" className="accent-maroon-600" checked={!off} onChange={(e) => set(d.key, e.target.checked ? v : null)} onFocus={() => setFocus(d)} />
                              on
                            </label>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <fieldset className="mt-5 border-t border-sand-100 pt-4">
              <legend className="mb-2 text-xs font-semibold text-maroon-800">Stated preferences</legend>
              <div className="grid grid-cols-2 gap-3 text-[0.8rem]">
                <label className="flex flex-col gap-1">
                  <span className="text-sand-500">Explanation length</span>
                  <select className="rounded-lg border border-sand-200 bg-white px-2 py-1.5" value={prefs.explanation_length} onChange={(e) => setPrefs({ ...prefs, explanation_length: e.target.value as LearnerPreferences["explanation_length"] })}>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-sand-500">Pace</span>
                  <select className="rounded-lg border border-sand-200 bg-white px-2 py-1.5" value={prefs.pace} onChange={(e) => setPrefs({ ...prefs, pace: e.target.value as LearnerPreferences["pace"] })}>
                    <option value="relaxed">Relaxed</option>
                    <option value="steady">Steady</option>
                    <option value="quick">Quick</option>
                  </select>
                </label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-maroon-600" checked={prefs.prefers_visuals} onChange={(e) => setPrefs({ ...prefs, prefers_visuals: e.target.checked })} /> Prefers visuals</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-maroon-600" checked={prefs.prefers_examples} onChange={(e) => setPrefs({ ...prefs, prefers_examples: e.target.checked })} /> More examples</label>
                <label className="col-span-2 flex items-center gap-2"><input type="checkbox" className="accent-maroon-600" checked={prefs.difficulty_bias > 0} onChange={(e) => setPrefs({ ...prefs, difficulty_bias: e.target.checked ? 1 : 0 })} /> Tutor feedback said “too hard”</label>
              </div>
            </fieldset>
          </Reveal>

          {/* 2. LEARNER STATE */}
          <Reveal delay={0.08} className="flex flex-col gap-5 self-start lg:sticky lg:top-24">
            <div className="card relative p-5 sm:p-6">
              <h3 className="eyebrow mb-4 text-maroon-500">2 · Learner state</h3>
              <dl className="space-y-4">
                {[
                  ["Mastery", sig.mastery],
                  ["Engagement", sig.engagement_probability],
                  ["Difficulty estimate", sig.struggle_probability],
                  ["Data confidence", s.data_confidence],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="flex justify-between text-[0.78rem] text-cocoa-soft">
                      <span>{k}</span>
                      <span className="font-mono text-maroon-600">{v === null ? "–" : pct(v as number)}</span>
                    </dt>
                    <dd className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand-100">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-maroon-400 to-maroon-700" animate={{ width: `${((v as number) ?? 0) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.7rem] leading-snug text-sand-500">“Difficulty estimate” is the struggle model's P(next answer wrong).</p>
              <div className="mt-4 border-t border-sand-100 pt-3">
                <p className="text-[0.72rem] font-medium text-cocoa">Preferences</p>
                <p className="mt-1 text-[0.7rem] text-sand-500">
                  {prefs.explanation_length} explanations · {prefs.pace} pace{prefs.prefers_visuals ? " · visuals" : ""}{prefs.prefers_examples ? " · examples" : ""}
                </p>
              </div>
            </div>
            <div id="signal-help" aria-live="polite" className="rounded-3xl border border-maroon-200 bg-maroon-50/70 p-5">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-maroon-700">
                <Info size={14} aria-hidden /> {focus.label}
              </p>
              <p className="text-[0.8rem] leading-relaxed text-cocoa-soft">{focus.help}</p>
            </div>
          </Reveal>

          {/* 3 + 4. DECISION & EXPERIENCE */}
          <Reveal delay={0.16} className="flex flex-col gap-5">
            <div className="card overflow-hidden p-5 sm:p-6">
              <h3 className="eyebrow mb-4 text-maroon-500">3 · Adaptive decision</h3>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-sand-500">Support score</p>
                  <p className="font-display text-5xl font-semibold tabular-nums text-maroon-800">{s.support_score.toFixed(3)}</p>
                </div>
                <motion.span key={s.band} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full px-4 py-1.5 text-sm font-semibold text-cream-50" style={{ background: band.color, color: s.band === "stretch" ? "#2C0B13" : undefined }}>
                  {band.label}
                </motion.span>
              </div>
              {/* Band gauge */}
              <div className="relative mt-5" aria-hidden>
                <div className="flex h-3 overflow-hidden rounded-full">
                  {BANDS.map((b) => (
                    <div key={b.key} style={{ width: `${(b.to - b.from) * 100}%`, background: b.color, opacity: b.key === s.band ? 1 : 0.35 }} />
                  ))}
                </div>
                <motion.div className="absolute -top-1.5 h-6 w-1.5 -translate-x-1/2 rounded-full bg-maroon-900 ring-2 ring-white" animate={{ left: `${s.support_score * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 20 }} />
                <div className="mt-1.5 flex justify-between font-mono text-[0.6rem] text-sand-500">
                  <span>0</span><span>0.36</span><span>0.52</span><span>0.68</span><span>1</span>
                </div>
              </div>
              {/* Factor contributions */}
              <p className="mb-2 mt-6 text-xs font-semibold text-maroon-800">Factor contributions (need × weight)</p>
              <ul className="space-y-2">
                {(Object.keys(FAMILY_WEIGHTS) as Family[]).map((fam) => {
                  const f = s.factors.find((x) => x.family === fam);
                  const contrib = f ? f.need * f.weight : 0;
                  return (
                    <li key={fam} className={`grid grid-cols-[6.5rem_1fr_3rem] items-center gap-2 text-[0.75rem] ${f ? "" : "opacity-40"}`}>
                      <span className="text-cocoa-soft">{FAMILY_LABEL[fam]}</span>
                      <span className="h-2 overflow-hidden rounded-full bg-sand-100">
                        <motion.span className="block h-full rounded-full bg-maroon-500" animate={{ width: `${(contrib / 0.3) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                      </span>
                      <span className="text-right font-mono text-maroon-600">{f ? contrib.toFixed(3) : "off"}</span>
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-5 space-y-1 border-t border-sand-100 pt-4 text-[0.78rem] text-cocoa-soft">
                {rationale(sig, s).map((r) => (
                  <li key={r}>· {r}</li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-maroon-800 p-5 text-cream-50 on-dark sm:p-6">
              <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cream-400/20 blur-2xl" />
              <h3 className="eyebrow relative mb-4 text-cream-400">4 · Personalised experience</h3>
              <dl className="relative grid grid-cols-2 gap-2 sm:grid-cols-3">
                {outputs.map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/[0.06] px-3 py-2">
                    <dt className="text-[0.62rem] uppercase tracking-wider text-cream-200/60">{k}</dt>
                    <motion.dd key={v} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="text-sm font-medium capitalize text-cream-50">{v}</motion.dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <SourceRef path={`backend/app/adaptive/engine.py · v${ENGINE_VERSION}`} href={blob("backend/app/adaptive/engine.py")} />
          <SourceRef path="case study · src/lib/engine.ts (port)" href={csBlob("src/lib/engine.ts")} />
          <SourceRef path="case study · src/test/engine.test.ts (parity test)" href={csBlob("src/test/engine.test.ts")} />
        </div>
      </div>
    </section>
  );
}
