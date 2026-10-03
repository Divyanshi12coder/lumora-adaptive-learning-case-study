import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Brain, Coffee, Eye, Gauge, Layers, ListChecks, MessageCircleHeart,
  MousePointerClick, Repeat, ScanEye, ShieldCheck, Signal, Sparkles, TextQuote, Timer, Lightbulb, Waypoints,
} from "lucide-react";
import { Counter, Reveal, SectionHeader } from "@/components/ui";
import { decideStrategy, signalsForLevel, type TeachingStrategy } from "@/lib/engine";

/* ======================================================= AT A GLANCE ==== */

const STATS = [
  { value: 89, label: "backend tests", note: "pytest · run on SQLite and PostgreSQL + pgvector" },
  { value: 16, label: "frontend tests", note: "Vitest + Testing Library" },
  { value: 22, label: "database tables", note: "SQLAlchemy 2 + Alembic" },
  { value: 42, label: "API operations", note: "FastAPI · OpenAPI at /docs" },
  { value: 5, label: "signal families", note: "weighted, explainable engine" },
  { value: 3, label: "LLM providers", note: "demo · OpenAI · Anthropic, one interface" },
];

export function AtAGlance() {
  return (
    <section id="glance" aria-labelledby="glance-title" className="relative border-y border-sand-200/70 bg-white/60 py-14">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="glance-title" className="font-display text-2xl font-semibold text-maroon-800 sm:text-3xl">
            The 15-second version
          </h2>
          <p className="max-w-md text-sm text-sand-500">Every number here can be checked in the repository. None of them are usage or accuracy claims.</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-sand-200 bg-cream-50/70 p-4 transition hover:-translate-y-1 hover:border-maroon-200 hover:shadow-soft">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <Counter value={s.value} className="font-display text-4xl font-semibold text-maroon-700" />
                  <p className="mt-1 text-sm font-medium text-maroon-900">{s.label}</p>
                  <p className="mt-1 text-[0.72rem] leading-snug text-sand-500">{s.note}</p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ========================================================== PROBLEM ==== */

function StrategyMini({ s }: { s: TeachingStrategy }) {
  const rows: [string, string][] = [
    ["Difficulty", s.difficulty],
    ["Explanation", s.explanation_style.replace(/_/g, " ")],
    ["Text density", s.content_density],
    ["Hints", s.hint_level],
    ["Examples", String(s.example_count)],
    ["Answer choices", String(s.option_count)],
    ["Quiz length", `${s.question_count} questions`],
    ["Pacing", s.pacing],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col">
          <dt className="text-[0.68rem] uppercase tracking-wider text-sand-500">{k}</dt>
          <dd className="font-medium capitalize text-maroon-800">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Problem() {
  const [mode, setMode] = useState<"same" | "lumora">("same");
  const learners = [
    { name: "Learner A", desc: "finding fractions tricky: slow answers, several hints, a mistake streak", level: 15 },
    { name: "Learner B", desc: "answering quickly and accurately, rarely asks for hints", level: 85 },
  ];
  const same = decideStrategy(signalsForLevel(50));

  return (
    <section id="problem" aria-labelledby="problem-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-ruled opacity-60" />
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="The problem"
          title={<span id="problem-title">Most learning software teaches every learner the same way.</span>}
          lede="Same pace, same wall of text, the same hint repeated louder. Learners who process information differently, or who simply prefer pictures to paragraphs, pay the highest price for that. A strong learner gets bored; a struggling one gets lost."
        />

        <Reveal>
          <div role="radiogroup" aria-label="Compare teaching approaches" className="mb-8 inline-flex rounded-full border border-sand-200 bg-white p-1 shadow-soft">
            {(["same", "lumora"] as const).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`relative min-h-[44px] rounded-full px-5 text-sm font-medium transition ${mode === m ? "text-cream-50" : "text-maroon-700 hover:text-maroon-900"}`}
              >
                {mode === m && <motion.span layoutId="problem-pill" className="absolute inset-0 -z-0 rounded-full bg-maroon-700" />}
                <span className="relative">{m === "same" ? "One size fits all" : "With Lumora"}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {learners.map((l, i) => {
            const s = mode === "same" ? same : decideStrategy(signalsForLevel(l.level));
            return (
              <Reveal key={l.name} delay={i * 0.08}>
                <article className="card h-full p-6 sm:p-7">
                  <header className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-maroon-800">{l.name}</h3>
                      <p className="mt-1 text-sm text-cocoa-soft">{l.desc}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${mode === "same" ? "bg-sand-100 text-sand-600" : "bg-cream-200 text-maroon-700"}`}>
                      {mode === "same" ? "fixed" : s.band.replace("_", " ")}
                    </span>
                  </header>
                  <AnimatePresence mode="wait">
                    <motion.div key={mode + l.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                      <StrategyMini s={s} />
                    </motion.div>
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-sand-500">
          Both learners' strategies are computed live in your browser by a TypeScript port of Lumora's engine, from the same simulated signal profiles
          the product's public demo uses. "One size fits all" shows a single mid-level strategy applied to both.
        </p>
      </div>
    </section>
  );
}

/* ============================================================= IDEA ==== */

const PRINCIPLES = [
  {
    Icon: ScanEye,
    title: "Adapt the presentation, never label the learner",
    body: "Lumora reasons only about observable learning behaviour and stated preferences. It never infers or names a condition: the engine has no input that could, and the AI tutor refuses diagnosis questions.",
  },
  {
    Icon: Waypoints,
    title: "Explainable by construction",
    body: "Five documented signal families, explicit weights, named thresholds. Every decision returns its factor contributions and a plain-language rationale, and is stored with its inputs.",
  },
  {
    Icon: ShieldCheck,
    title: "Degrade gracefully",
    body: "No ML prediction yet? The family is dropped and weights re-normalised. Little data? The score shrinks toward a gently supportive prior. LLM failure? A grounded demo answer, clearly badged.",
  },
];

export function Idea() {
  return (
    <section aria-labelledby="idea-title" className="relative overflow-hidden bg-maroon-900 py-24 text-cream-50 on-dark sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark" />
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(248,213,112,0.18),transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeader
          dark
          index="03"
          eyebrow="The idea"
          title={<span id="idea-title">Small signals in, a teaching strategy out.</span>}
          lede="Every answer, hint, skip, re-read and “explain it differently” is a signal. Lumora turns those signals into one strategy object, and the lesson, the quiz and the AI tutor all follow it. The child sees warmth and encouragement; grown-ups and engineers can see exactly why."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <article className="glass-dark group h-full rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-cream-400/40">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-400/15 text-cream-300 transition group-hover:bg-cream-400 group-hover:text-maroon-900">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="font-display text-xl font-semibold text-cream-50">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================== HOW IT ADAPTS ==== */

const SIGNALS = [
  "Quiz accuracy (recent + overall)", "Response time vs. expected", "Mistake streaks", "Repeated mistakes", "Skipped questions",
  "Hints requested", "Question difficulty", "“Not sure” confidence", "Answer changes", "Events per minute", "Session length",
  "“Explain again” requests", "Accuracy trend", "Days since practice", "Stated preferences",
];

const LEVERS = [
  { Icon: Gauge, name: "Difficulty", values: "easy · medium · hard", why: "Set by the support band; guided learners with low mastery stay on easy." },
  { Icon: TextQuote, name: "Explanation style", values: "step by step · worked example · guided discovery · concise", why: "More support means more structure; strong learners get it short and sharp." },
  { Icon: Layers, name: "Content density", values: "low · medium · high", why: "Combines support, the learner's preferred length, “too long” feedback and engagement." },
  { Icon: Lightbulb, name: "Hint depth", values: "none · light · guided · full", why: "Hints deepen as the support score rises past 0.33, 0.52 and 0.72." },
  { Icon: BookOpen, name: "Worked examples", values: "1 – 4", why: "More scaffolding means more examples, capped at 2 on low-density pages." },
  { Icon: Timer, name: "Pacing", values: "slow · steady · brisk", why: "High support or a “relaxed” preference slows things down." },
  { Icon: Eye, name: "Visual support", values: "low · medium · high", why: "On for learners who prefer visuals, and for anyone who needs high support." },
  { Icon: ListChecks, name: "Answer choices", values: "3 or 4", why: "High-support mode drops a distractor; BKT's guess probability adjusts to match." },
  { Icon: Sparkles, name: "Quiz length", values: "4 · 5 · 6 questions", why: "Shorter when support is high or the engagement model predicts drop-off." },
  { Icon: Repeat, name: "Review & revision", values: "scheduled · not needed", why: "Low mastery after practice, repeated mistakes or a long gap trigger review." },
  { Icon: Coffee, name: "Brain breaks", values: "suggested · not needed", why: "After 25 minutes, or when engagement looks low." },
  { Icon: MessageCircleHeart, name: "Tone", values: "gentle · warm · celebratory", why: "Gentle after a mistake streak; celebratory when the trend is improving." },
];

export function HowItAdapts() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.min(360, rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <section aria-labelledby="adapts-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="How Lumora adapts"
          title={<span id="adapts-title">Fifteen kinds of signal. Twelve things that change.</span>}
          lede="These are the actual inputs the backend computes and the actual outputs of the TeachingStrategy schema. Nothing here is aspirational."
        />

        <Reveal>
          <div className="mb-12 rounded-3xl border border-sand-200 bg-white/70 p-5 sm:p-6">
            <p className="eyebrow mb-4 flex items-center gap-2 text-maroon-500">
              <Signal size={14} aria-hidden /> Signals the engine reads
            </p>
            <ul className="flex flex-wrap gap-2">
              {SIGNALS.map((s) => (
                <li key={s} className="chip transition hover:border-maroon-300 hover:text-maroon-700">
                  <MousePointerClick size={12} className="text-maroon-400" aria-hidden /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-sand-500">
              Lesson reading progress and section views are tracked too. They feed activity history and badges, not the engine.
            </p>
          </div>
        </Reveal>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="eyebrow flex items-center gap-2 text-maroon-500">
            <Brain size={14} aria-hidden /> What the strategy controls
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll levers left" className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white text-maroon-700 hover:border-maroon-300">
              <ArrowLeft size={18} aria-hidden />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll levers right" className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white text-maroon-700 hover:border-maroon-300">
              <ArrowRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label="Adaptation levers (scrollable)"
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
      >
        {LEVERS.map(({ Icon, name, values, why }, i) => (
          <article
            key={name}
            className="group relative w-[78vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-sand-200 bg-gradient-to-b from-white to-cream-50 p-6 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift"
          >
            <span aria-hidden className="absolute right-5 top-4 font-display text-5xl font-semibold text-cream-300/70">{String(i + 1).padStart(2, "0")}</span>
            <span className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-maroon-600 text-cream-100 transition group-hover:rotate-[-6deg] group-hover:scale-110">
              <Icon size={20} aria-hidden />
            </span>
            <h3 className="font-display text-lg font-semibold text-maroon-800">{name}</h3>
            <p className="mt-1 font-mono text-[0.7rem] text-maroon-500">{values}</p>
            <p className="mt-4 text-sm leading-relaxed text-cocoa-soft">{why}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
