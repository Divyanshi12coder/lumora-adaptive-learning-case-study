import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowRight, Bot, CheckCircle2, Cpu, Database, FileSearch, FileText, Filter, Hash, Layers3, MessageSquareQuote,
  Pause, Play, Scissors, ShieldCheck, Sparkles, Split,
} from "lucide-react";
import { Reveal, SectionHeader, SourceRef, Status } from "@/components/ui";
import { DOCS, blob, tree } from "@/data/links";

/* ============================================================ AI LAYER ==== */

const PROVIDERS = {
  demo: {
    name: "Demo provider",
    status: "built" as const,
    statusText: "Default · offline",
    body: "Builds answers from the retrieved passages and the structured lesson, shaped by the strategy. It does not imitate an LLM, and every message is badged “Demo mode”. Public demos always use it, so anonymous traffic can never spend API credits.",
    file: "backend/app/ai/providers/demo.py",
  },
  openai: {
    name: "OpenAI",
    status: "optional" as const,
    statusText: "Integrated · needs API key",
    body: "Chat completions with strict JSON-schema structured output (default model gpt-4.1-mini, overridable with AI_MODEL). Switched on with AI_PROVIDER=openai and AI_API_KEY.",
    file: "backend/app/ai/providers/openai_provider.py",
  },
  anthropic: {
    name: "Anthropic",
    status: "optional" as const,
    statusText: "Integrated · needs API key",
    body: "The official SDK with structured outputs (output_config.format with a strict JSON schema). Refusals and max-token stops raise typed errors. Switched on with AI_PROVIDER=anthropic and AI_API_KEY.",
    file: "backend/app/ai/providers/anthropic_provider.py",
  },
};
type ProviderKey = keyof typeof PROVIDERS;

export function AILayer() {
  const [p, setP] = useState<ProviderKey>("demo");
  const prov = PROVIDERS[p];
  const Step = ({ title, sub, accent = false }: { title: string; sub: string; accent?: boolean }) => (
    <div className={`rounded-2xl border px-4 py-3 text-center ${accent ? "border-maroon-600 bg-maroon-600 text-cream-50" : "border-sand-200 bg-white"}`}>
      <p className={`text-sm font-semibold ${accent ? "" : "text-maroon-800"}`}>{title}</p>
      <p className={`text-[0.72rem] ${accent ? "text-cream-100/75" : "text-sand-500"}`}>{sub}</p>
    </div>
  );
  const Down = () => <ArrowDown size={16} className="mx-auto my-1.5 text-maroon-300" aria-hidden />;

  return (
    <section id="ai" aria-labelledby="ai-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          index="07"
          eyebrow="AI / LLM layer"
          title={<span id="ai-title">One interface, three providers, zero crashes for a child.</span>}
          lede="Every AI feature (tutor replies, generated quizzes, document summaries, study plans) goes through one provider-agnostic interface and comes back as a validated Pydantic object. The application never parses free text."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="card p-5 sm:p-7">
              <Step title="Application services" sub="tutor · quiz generation · summaries · study plans" />
              <Down />
              <Step accent title="LLMProvider interface" sub="generate(LLMRequest) → BaseModel" />
              <Down />
              <div role="radiogroup" aria-label="Choose a provider" className="grid grid-cols-3 gap-2">
                {(Object.keys(PROVIDERS) as ProviderKey[]).map((k) => (
                  <button
                    key={k}
                    role="radio"
                    aria-checked={p === k}
                    onClick={() => setP(k)}
                    className={`min-h-[52px] rounded-2xl border px-2 py-2 text-sm font-medium transition ${p === k ? "border-cream-500 bg-cream-200 text-maroon-800 shadow-glow" : "border-sand-200 bg-white text-cocoa-soft hover:border-maroon-200"}`}
                  >
                    {PROVIDERS[k].name.replace(" provider", "")}
                  </button>
                ))}
              </div>
              <Down />
              <Step title="Structured output" sub="TutorReply · GeneratedQuiz · DocumentSummary · StudyPlan" />
              <Down />
              <Step title="Output safety screen → application logic" sub="reply + steps + examples + cited sources" />
              <div className="mt-4 rounded-2xl border border-dashed border-maroon-300 bg-maroon-50/60 p-3 text-[0.75rem] text-maroon-800">
                <strong>Fallback:</strong> provider error, timeout, refusal or invalid JSON → grounded demo answer, and the UI says so.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.article key={p} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="card p-6 sm:p-7" aria-live="polite">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <Bot size={20} className="text-maroon-600" aria-hidden />
                  <h3 className="font-display text-2xl font-semibold text-maroon-800">{prov.name}</h3>
                  <Status kind={prov.status}>{prov.statusText}</Status>
                </div>
                <p className="text-sm leading-relaxed text-cocoa-soft">{prov.body}</p>
                <div className="mt-4"><SourceRef path={prov.file} href={blob(prov.file)} /></div>
              </motion.article>
            </AnimatePresence>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Why an abstraction?", b: "Swap vendors with one environment variable, run the whole product offline in CI and demos, and test every AI path without network calls or keys." },
                { t: "Why structured output?", b: "Strict JSON schemas, generated from the same Pydantic models the API uses, mean a malformed reply is caught at the boundary instead of reaching a child." },
                { t: "Child-safety prompt", b: "The system prompt keeps Divi on learning, has it identify as an AI, and forbids diagnosis and requests for personal information." },
                { t: "Two safety layers", b: "Rule-based input and output screens around every call. Personal details are redacted before any text leaves for a provider." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-sand-200 bg-cream-50 p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
                  <h4 className="font-display text-base font-semibold text-maroon-800">{c.t}</h4>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-cocoa-soft">{c.b}</p>
                </div>
              ))}
            </div>
            <SourceRef path="backend/app/ai" href={tree("backend/app/ai")} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ RAG ==== */

const INGEST = [
  { Icon: FileText, t: "Documents", d: "The 12 seeded lessons are ingested at startup as a shared library. Learners can upload .txt, .md or .pdf files up to 5 MB, which stay private to them." },
  { Icon: Filter, t: "Extract + validate", d: "Extension allow-list, magic-byte and binary checks, UTF-8 decoding, a page cap for PDFs and sanitised filenames. Nothing is written to disk." },
  { Icon: Scissors, t: "Chunking", d: "Heading-aware windows of 120 words with a 30-word overlap. Overlap never crosses a section boundary, and the section name is kept as metadata." },
  { Icon: Hash, t: "Embeddings", d: "384 dimensions. The default local embedder uses deterministic feature hashing (unigrams, bigrams, character trigrams) and runs fully offline. text-embedding-3-small is optional." },
  { Icon: Database, t: "Vector storage", d: "PostgreSQL vector(384) column with an HNSW cosine index. The query planner was verified to use it. SQLite falls back to an exact NumPy scan." },
];
const RETRIEVE = [
  { Icon: FileSearch, t: "Similarity retrieval", d: "The question is embedded the same way, and the top 24 candidates are fetched by cosine distance." },
  { Icon: Split, t: "Re-ranking", d: "Score = 0.8 × cosine + 0.2 × lexical overlap, plus a boost for chunks about the current topic." },
  { Icon: Layers3, t: "Context assembly", d: "The top-k chunks become numbered context in a structured prompt, alongside the teaching strategy." },
  { Icon: Sparkles, t: "AI response", d: "The provider must return a TutorReply object; demo mode builds the answer directly from these passages." },
  { Icon: MessageSquareQuote, t: "Source references", d: "Each reply lists the passages it was grounded in, with document title and section, and the learner can expand them." },
];

export function RagPipeline() {
  const steps = [...INGEST, ...RETRIEVE];
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!playing || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [playing, reduce, steps.length]);

  const Lane = ({ title, items, offset }: { title: string; items: typeof INGEST; offset: number }) => (
    <div>
      <p className="eyebrow mb-3 text-cream-400">{title}</p>
      <ol className="grid gap-2 sm:grid-cols-5">
        {items.map((s, k) => {
          const idx = k + offset;
          const on = idx === i;
          return (
            <li key={s.t} className="relative">
              <button
                type="button"
                onClick={() => { setI(idx); setPlaying(false); }}
                aria-current={on ? "step" : undefined}
                className={`flex h-full w-full items-center gap-3 rounded-2xl border p-3 text-left transition duration-300 sm:flex-col sm:items-start ${on ? "border-cream-400 bg-cream-400 text-maroon-900 shadow-[0_0_30px_-6px_rgba(248,213,112,0.7)]" : "border-white/10 bg-white/[0.04] text-cream-50 hover:border-white/30"}`}
              >
                <s.Icon size={18} aria-hidden className={on ? "text-maroon-800" : "text-cream-300"} />
                <span className="text-sm font-medium">{s.t}</span>
              </button>
              {k < items.length - 1 && <ArrowRight aria-hidden size={14} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-cream-400/60 sm:block" />}
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <section aria-labelledby="rag-title" className="relative overflow-hidden bg-maroon-900 py-24 text-cream-50 on-dark sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-70" />
      <div className="container-x relative">
        <SectionHeader
          dark
          index="08"
          eyebrow="RAG pipeline"
          title={<span id="rag-title">Answers grounded in the lesson, with the receipts.</span>}
          lede="Retrieval-augmented generation keeps the tutor anchored to the curriculum and to the learner's own notes. Every stage below is implemented and covered by tests; the walkthrough highlights each in turn."
        />
        <Reveal>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <Lane title="Ingest" items={INGEST} offset={0} />
            <Lane title="Retrieve & answer" items={RETRIEVE} offset={INGEST.length} />
            <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-start sm:justify-between">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="max-w-2xl" aria-live="polite">
                  <p className="font-mono text-xs text-cream-400">step {String(i + 1).padStart(2, "0")} / {steps.length}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{steps[i].t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-100/75">{steps[i].d}</p>
                </motion.div>
              </AnimatePresence>
              {!reduce && (
                <button type="button" onClick={() => setPlaying((v) => !v)} className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 text-sm hover:border-cream-400">
                  {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />} {playing ? "Pause walkthrough" : "Play walkthrough"}
                </button>
              )}
            </div>
          </div>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-cream-100/60">
          <Status kind="built">Implemented</Status> local embeddings, pgvector + HNSW, hybrid re-rank, uploads, cited sources
          <Status kind="optional">Optional</Status> OpenAI embeddings
          <Status kind="future">Future work</Status> semantic local encoder and cross-encoder re-ranking
        </div>
        <div className="mt-4"><SourceRef dark path="backend/app/rag" href={tree("backend/app/rag")} /></div>
      </div>
    </section>
  );
}

/* ================================================================= ML ==== */

const MODELS = [
  {
    id: "mastery", name: "Mastery tracing", algo: "Bayesian Knowledge Tracing",
    input: "Each answer on a topic, in order", features: "correct?, hints used, number of options shown",
    prediction: "P(learner knows the topic)", decision: "Engine mastery family (weight 0.25), journey stage, review scheduling, quiz results",
    note: "p_guess = 1 / options shown, so 3-option mode correctly makes guessing likelier. A hinted success counts as weaker evidence. Parameters are literature-typical defaults, not fitted.",
  },
  {
    id: "struggle", name: "Struggle predictor", algo: "Logistic regression (standardised)",
    input: "History before the answer being predicted", features: "mastery, recent accuracy, hint rate, skip rate, mistake streak, response-time ratio, “not sure” rate, next difficulty, log attempts",
    prediction: "P(next answer is incorrect)", decision: "Engine ml_struggle family (weight 0.20)",
    note: "Chosen for interpretability: coefficients point the expected way (harder questions and “not sure” raise struggle; recent accuracy and practice lower it).",
  },
  {
    id: "engagement", name: "Engagement predictor", algo: "Gradient boosting vs. logistic regression, selected on validation data",
    input: "One snapshot per answer within a session", features: "session minutes, events per minute, recent accuracy, hint rate, skip rate, mistake streak, idle seconds",
    prediction: "P(learner continues ≥ 5 more minutes)", decision: "Gentle nudges only: break suggestions, lighter pages, shorter quizzes",
    note: "This model is weak on synthetic data (see below), so the engine only uses it for low-stakes nudges, and only after 4+ events in a session.",
  },
  {
    id: "trend", name: "Performance trend", algo: "Least-squares slope on rolling accuracy",
    input: "Recent answer outcomes", features: "rolling mean accuracy (window 5)",
    prediction: "Accuracy change per answer", decision: "Engine momentum family (weight 0.10), tone, dashboard insight",
    note: "A deliberately simple statistic: it is transparent and needs no training.",
  },
  {
    id: "profiles", name: "Behaviour profiles", algo: "K-means (k = 4) on standardised aggregates",
    input: "Per-learner aggregates", features: "accuracy, hint rate, response-time ratio, skip rate, average session minutes",
    prediction: "A descriptive cluster", decision: "Grown-up Insights only. Never shown to children, never used as a label",
    note: "Silhouette is low: these behaviours form a continuum, not types. The UI says profiles describe recent behaviour and change as the learner changes.",
  },
  {
    id: "reco", name: "Recommendations", algo: "Interpretable linear ranking",
    input: "Topics + learner state", features: "mastery gap, forgetting (days since practice), prerequisite readiness, interest",
    prediction: "Ranked next steps with their factors", decision: "“What can I try next?” on the dashboard and the study plan",
    note: "Rules a reviewer can read in a few lines, with the contributing factors returned to the client.",
  },
];

export function MLSystem() {
  const [id, setId] = useState("struggle");
  const m = MODELS.find((x) => x.id === id)!;
  const flow: [string, string][] = [["Input", m.input], ["Features", m.features], ["Model", m.algo], ["Prediction", m.prediction], ["Product decision", m.decision]];

  return (
    <section id="ml" aria-labelledby="ml-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="container-x">
        <SectionHeader
          index="09"
          eyebrow="Machine learning"
          title={<span id="ml-title">Interpretable models, honestly evaluated.</span>}
          lede="Lumora favours models a reviewer can reason about: knowledge tracing, logistic regression and an explicit ranking. One feature module serves training and live inference, so there is no train/serve skew."
        />

        <Reveal>
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="ML components">
            {MODELS.map((x) => (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={id === x.id}
                aria-controls="ml-panel"
                onClick={() => setId(x.id)}
                className={`min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-medium transition ${id === x.id ? "border-maroon-600 bg-maroon-600 text-cream-50" : "border-sand-200 bg-white text-maroon-700 hover:border-maroon-300"}`}
              >
                {x.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="ml-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="card p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <ol className="grid gap-3 md:grid-cols-5">
                {flow.map(([k, v], n) => (
                  <motion.li key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: n * 0.07 }} className={`relative rounded-2xl p-4 ${n === 2 ? "bg-maroon-700 text-cream-50" : n === 4 ? "bg-cream-200" : "bg-cream-50 ring-1 ring-sand-200"}`}>
                    <p className={`eyebrow mb-2 text-[0.6rem] ${n === 2 ? "text-cream-300" : "text-maroon-500"}`}>{k}</p>
                    <p className={`text-sm leading-snug ${n === 2 ? "font-semibold" : "text-cocoa"}`}>{v}</p>
                    {n < 4 && <ArrowRight size={14} aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-maroon-300 md:block" />}
                  </motion.li>
                ))}
              </ol>
              <p className="mt-5 flex gap-2 text-sm leading-relaxed text-cocoa-soft">
                <Cpu size={16} className="mt-0.5 shrink-0 text-maroon-400" aria-hidden /> {m.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
            <div className="rounded-3xl border-2 border-dashed border-cream-500/70 bg-cream-100 p-6">
              <p className="eyebrow text-cream-600">Read this first</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-maroon-800">Synthetic/demo data used for development and experimentation.</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">
                On a fresh install every model trains on data from a learner simulator. The numbers on the right validate that the training and
                evaluation pipeline works end to end. They are <strong>not</strong> evidence of real-world accuracy. With enough real interactions,
                <code className="mx-1 font-mono text-xs">python -m app.ml.train --source db</code> retrains on them.
              </p>
              <ul className="mt-4 space-y-1.5 text-[0.8rem] text-cocoa-soft">
                <li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-maroon-500" aria-hidden /> Split grouped by learner: no learner in both train and test</li>
                <li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-maroon-500" aria-hidden /> Model selection on validation data; test set used once</li>
                <li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-maroon-500" aria-hidden /> Every metric reported next to a naive baseline</li>
              </ul>
            </div>
            <div className="card overflow-x-auto p-6">
              <p className="eyebrow mb-3 text-maroon-500">Held-out results · synthetic data · from metrics.json</p>
              <table className="w-full min-w-[30rem] text-left text-sm">
                <caption className="sr-only">Model evaluation on a synthetic hold-out split</caption>
                <thead className="text-[0.7rem] uppercase tracking-wider text-sand-500">
                  <tr><th className="py-2 font-medium">Model</th><th className="font-medium">ROC-AUC</th><th className="font-medium">Brier (baseline)</th><th className="font-medium">Honest reading</th></tr>
                </thead>
                <tbody className="divide-y divide-sand-100 text-cocoa">
                  <tr><td className="py-3 pr-3 font-medium">Struggle</td><td className="font-mono">0.690</td><td className="font-mono">0.209 (0.233)</td><td className="text-[0.8rem] text-cocoa-soft">Modest, real lift over baseline</td></tr>
                  <tr><td className="py-3 pr-3 font-medium">Engagement</td><td className="font-mono">0.573</td><td className="font-mono">0.242 (0.241)</td><td className="text-[0.8rem] text-cocoa-soft">Weak: no better than base rate on Brier</td></tr>
                  <tr><td className="py-3 pr-3 font-medium">Profiles</td><td colSpan={2} className="font-mono">silhouette 0.168</td><td className="text-[0.8rem] text-cocoa-soft">Descriptive only</td></tr>
                </tbody>
              </table>
              <div className="mt-4"><SourceRef path="docs/MODEL_CARD.md" href={DOCS.modelCard} /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================== DATA MODEL ==== */

const GROUPS = [
  { id: "identity", name: "Identity", tables: ["users", "student_profiles", "learning_preferences"], links: ["activity", "state", "ai", "knowledge"] },
  { id: "curriculum", name: "Curriculum", tables: ["subjects", "courses", "topics", "lessons", "questions"], links: ["activity", "state", "knowledge"] },
  { id: "activity", name: "Learning activity", tables: ["learning_sessions", "interaction_events", "quiz_attempts", "answers"], links: ["identity", "curriculum", "state"] },
  { id: "state", name: "Learner state", tables: ["mastery_scores", "mastery_history", "recommendations", "learning_goals"], links: ["identity", "curriculum", "activity"] },
  { id: "ai", name: "AI & audit", tables: ["ai_conversations", "ai_messages", "adaptive_strategies", "model_predictions"], links: ["identity"] },
  { id: "knowledge", name: "Knowledge (RAG)", tables: ["documents", "document_chunks"], links: ["identity", "curriculum"] },
];

export function DataModel() {
  const [hover, setHover] = useState<string | null>(null);
  const related = hover ? [hover, ...GROUPS.find((g) => g.id === hover)!.links] : null;
  return (
    <section aria-labelledby="data-title" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-ruled opacity-50" />
      <div className="container-x relative">
        <SectionHeader
          index="10"
          eyebrow="Data model"
          title={<span id="data-title">22 tables, designed so deletion is real.</span>}
          lede="Hover a domain to see what it connects to. User-owned data cascades on delete, so “delete my account” erases everything. Check and unique constraints guard the invariants; composite indexes back the hot queries."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => {
            const dim = related && !related.includes(g.id);
            const focal = hover === g.id;
            return (
              <Reveal key={g.id} delay={i * 0.05}>
                <div
                  tabIndex={0}
                  onMouseEnter={() => setHover(g.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(g.id)}
                  onBlur={() => setHover(null)}
                  className={`h-full rounded-3xl border bg-white p-5 transition duration-300 ${focal ? "-translate-y-1 border-maroon-400 shadow-lift" : "border-sand-200 shadow-soft"} ${dim ? "opacity-35" : ""}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-maroon-800">{g.name}</h3>
                    <span className="font-mono text-xs text-sand-400">{g.tables.length}</span>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {g.tables.map((t) => (
                      <li key={t} className="rounded-lg bg-cream-100 px-2 py-1 font-mono text-[0.7rem] text-maroon-700">{t}</li>
                    ))}
                  </ul>
                  {focal && <p className="mt-3 text-[0.72rem] text-sand-500">links to: {g.links.map((l) => GROUPS.find((x) => x.id === l)!.name).join(" · ")}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["ON DELETE CASCADE", "for all user-owned rows"],
              ["Constraints", "difficulty 1–3, non-negative indices, one mastery row per user + topic"],
              ["Indexes", "(user_id, created_at) on events, strategies and history"],
              ["Vectors", "vector(384) with an HNSW cosine index"],
            ].map(([a, b]) => (
              <li key={a} className="rounded-2xl border border-sand-200 bg-white/80 p-4">
                <p className="flex items-center gap-2 font-medium text-maroon-800"><ShieldCheck size={15} aria-hidden className="text-maroon-500" /> {a}</p>
                <p className="mt-1 text-[0.78rem] text-cocoa-soft">{b}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-5"><SourceRef path="backend/app/models" href={tree("backend/app/models")} /></div>
      </div>
    </section>
  );
}
