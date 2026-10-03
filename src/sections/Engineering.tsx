import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Accessibility, AudioLines, CheckCircle2, CircleDashed, Contrast, Eye, Focus, GitBranch, Hand, Keyboard, Layers, MousePointer2,
  Rocket, ScrollText, Server, ShieldAlert, ShieldCheck, Type, UserX, Wand2,
} from "lucide-react";
import { BrowserFrame, Reveal, SectionHeader, SourceRef, Status } from "@/components/ui";
import { shots } from "@/data/screenshots";
import { DOCS, blob, tree } from "@/data/links";

/* ======================================================== ACCESSIBILITY ==== */

const A11Y = [
  { Icon: Type, t: "Readable typography", d: "Adjustable text size and line spacing, plus an optional Atkinson Hyperlegible font designed so letters are easy to tell apart." },
  { Icon: Keyboard, t: "Keyboard first", d: "Tabs, switches, radio groups and accordions are fully operable from the keyboard, with a skip link on every page." },
  { Icon: Focus, t: "Visible focus", d: "A clear :focus-visible ring everywhere, never removed for aesthetics." },
  { Icon: Contrast, t: "Contrast & colour", d: "An extra-contrast mode, and colour is never the only cue: badges carry an icon and a label." },
  { Icon: Layers, t: "Semantic structure", d: "Landmarks, headings, ARIA labels and live regions. Charts ship with a text description and a data table." },
  { Icon: MousePointer2, t: "Reduced motion", d: "Honours the OS setting and an in-app toggle. This case study honours it too." },
  { Icon: AudioLines, t: "Read-aloud", d: "Lessons and questions can be read aloud with the browser's Web Speech API." },
  { Icon: Eye, t: "Focus mode", d: "Hides extra panels and decorations while learning." },
  { Icon: Hand, t: "Generous targets", d: "Touch targets of 44–64 px and calm, explicit interaction feedback." },
];

export function AccessibilitySection() {
  return (
    <section id="ux" aria-labelledby="a11y-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          index="17"
          eyebrow="Accessibility"
          title={<span id="a11y-title">Accessibility settings are also learning signals.</span>}
          lede="Learners control how Lumora looks and sounds, and those preferences are saved to their profile, where the adaptive engine reads them. Accessibility is part of the personalisation loop, not a separate settings page."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {A11Y.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 3) * 0.06}>
              <article className="group flex h-full gap-4 rounded-3xl border border-sand-200 bg-cream-50/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-maroon-200 hover:bg-white hover:shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-maroon-600 ring-1 ring-sand-200 transition group-hover:bg-maroon-600 group-hover:text-cream-50">
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-maroon-800">{t}</h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-cocoa-soft">{d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <figure className="mx-auto mt-12 max-w-4xl">
            <BrowserFrame src={shots.settings} alt="Lumora settings: text size and line spacing sliders, readable font, read-aloud, reduce motion, focus mode and extra contrast toggles, with a live preview" url="lumora / app / settings" aspect="aspect-[16/10]" />
            <figcaption className="mt-2 text-center text-xs text-sand-500">The learner's reading and accessibility settings, with a live preview.</figcaption>
          </figure>
        </Reveal>
        <p className="mt-6 flex items-center gap-2 text-xs text-sand-500">
          <Accessibility size={14} aria-hidden /> All of the above is implemented in the product frontend. The project has not had a formal WCAG audit.
        </p>
      </div>
    </section>
  );
}

/* ================================================== SAFETY & RESPONSIBLE AI ==== */

const SAFE_BUILT = [
  { Icon: UserX, t: "No diagnosis, no treatment claims", d: "The engine has no input that could infer a condition. Diagnosis questions to the tutor get a kind explanation that Divi is a learning helper, not a doctor." },
  { Icon: ShieldAlert, t: "Input & output screens", d: "Rule-based screens catch self-harm, abuse, sexual and dangerous content. A wellbeing concern gets a caring “talk to a trusted adult” response." },
  { Icon: ShieldCheck, t: "Personal details removed", d: "Emails, phone numbers and addresses are redacted before any text reaches a provider." },
  { Icon: Wand2, t: "Controlled outputs", d: "Schema-validated structured output, an output safety screen, and a grounded fallback when anything goes wrong." },
  { Icon: ScrollText, t: "Transparent signals", d: "Every strategy is stored with its inputs, factors and rationale. Grown-ups can see why the engine decided what it did." },
  { Icon: CircleDashed, t: "Privacy-conscious by default", d: "Sign-up asks for name, email and password only. No demographic data. Safety logs store counts, never message contents. Account deletion cascades." },
];

export function Safety() {
  return (
    <section aria-labelledby="safety-title" className="relative overflow-hidden bg-maroon-900 py-24 text-cream-50 on-dark sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark" />
      <div className="container-x relative">
        <SectionHeader
          dark
          index="18"
          eyebrow="Safety & responsible AI"
          title={<span id="safety-title">Adaptive recommendations, not clinical decisions.</span>}
          lede="Lumora is designed to support diverse learning preferences. It is not a medical tool: it does not diagnose, screen for or treat any condition."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SAFE_BUILT.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 3) * 0.06}>
              <article className="glass-dark h-full rounded-3xl p-6 transition hover:border-cream-400/40">
                <div className="mb-4 flex items-center justify-between">
                  <Icon size={22} className="text-cream-300" aria-hidden />
                  <Status kind="built" />
                </div>
                <h3 className="font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{d}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl border border-dashed border-cream-400/40 p-6">
            <p className="eyebrow mb-3 text-cream-400">Known limits, stated plainly</p>
            <ul className="grid gap-2 text-sm text-cream-100/75 md:grid-cols-2">
              <li>· The safety layer is rule-based and English-only. Use with children in production should add a provider moderation API and human review.</li>
              <li>· The rate limiter is in-process (single instance). Several instances would need Redis behind it.</li>
              <li>· JWTs live in localStorage, a documented XSS trade-off. httpOnly cookies are a future option.</li>
              <li>· No parent–child account linking yet: Insights lives on the learner's own account.</li>
            </ul>
          </div>
        </Reveal>
        <div className="mt-5"><SourceRef dark path="backend/app/ai/safety.py" href={blob("backend/app/ai/safety.py")} /></div>
      </div>
    </section>
  );
}

/* ========================================================== TECH STACK ==== */

const STACK = [
  { group: "Frontend", color: "#8E2F3F", items: ["React 18", "TypeScript", "Vite 6", "Tailwind CSS", "TanStack Query", "Framer Motion", "Recharts", "React Router"] },
  { group: "Backend", color: "#5F1A29", items: ["Python 3.12", "FastAPI", "Pydantic v2", "SQLAlchemy 2", "Alembic", "PyJWT", "bcrypt"] },
  { group: "Data", color: "#A0711C", items: ["PostgreSQL 16", "pgvector", "psycopg 3"] },
  { group: "AI / ML", color: "#AE4F5E", items: ["LLM abstraction", "OpenAI SDK", "Anthropic SDK", "RAG", "scikit-learn", "pandas", "NumPy", "pypdf"] },
  { group: "Infra & quality", color: "#76695C", items: ["Docker", "Compose", "nginx", "GitHub Actions", "Render", "Vercel", "Pytest", "Vitest", "Ruff"] },
];

export function TechStack() {
  const reduce = useReducedMotion();
  const [g, setG] = useState<string | null>(null);
  const rings = [
    { r: 30, items: STACK[2].items.concat(STACK[1].items.slice(0, 3)) },
    { r: 41, items: STACK[1].items.slice(3).concat(STACK[3].items) },
    { r: 49, items: STACK[0].items.concat(STACK[4].items) },
  ];
  const groupOf = (name: string) => STACK.find((s) => s.items.includes(name))!;

  return (
    <section aria-labelledby="stack-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="19" eyebrow="Tech stack" title={<span id="stack-title">A constellation, not a checklist.</span>} lede="Everything here is in the repository's package.json, requirements.txt, Dockerfiles or CI workflow. Pick a group to light it up." />
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative mx-auto hidden aspect-square w-[88%] max-w-[600px] md:block" aria-hidden>
            {rings.map((ring, ri) => (
              <div key={ri} className="absolute rounded-full border border-dashed border-maroon-200/70" style={{ inset: `${50 - ring.r}%` }} />
            ))}
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-maroon-700 text-cream-50 shadow-lift">
              <span className="font-display text-lg font-semibold tracking-[0.15em]">LUMORA</span>
              <span className="text-[0.6rem] uppercase tracking-widest text-cream-300">core</span>
            </div>
            {rings.map((ring, ri) => (
              <div key={ri} className={`absolute inset-0 ${reduce ? "" : ri % 2 ? "animate-orbit-rev" : "animate-orbit"}`}>
                {ring.items.map((name, i) => {
                  const a = (i / ring.items.length) * Math.PI * 2 + ri;
                  const grp = groupOf(name);
                  const lit = !g || g === grp.group;
                  return (
                    <div key={name} className="absolute" style={{ left: `${50 + ring.r * Math.cos(a)}%`, top: `${50 + ring.r * Math.sin(a)}%` }}>
                      <div className="-translate-x-1/2 -translate-y-1/2">
                        {/* counter-rotates at exactly the ring's speed, so labels stay upright */}
                        <div className={reduce ? "" : ri % 2 ? "animate-orbit" : "animate-orbit-rev"}>
                        <span
                          className="block whitespace-nowrap rounded-full border bg-white px-2 py-0.5 text-[0.64rem] font-medium shadow-soft transition duration-300"
                          style={{ borderColor: lit ? grp.color : "#E5DCCF", color: lit ? grp.color : "#CDC0AF", opacity: lit ? 1 : 0.5 }}
                        >
                          {name}
                        </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {STACK.map((s) => (
              <button
                key={s.group}
                type="button"
                aria-pressed={g === s.group}
                onClick={() => setG(g === s.group ? null : s.group)}
                onMouseEnter={() => setG(s.group)}
                onMouseLeave={() => setG(null)}
                className={`block w-full rounded-2xl border p-4 text-left transition ${g === s.group ? "border-maroon-300 bg-white shadow-soft" : "border-sand-200 bg-white/60"}`}
              >
                <span className="flex items-center gap-2 font-display font-semibold" style={{ color: s.color }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.group}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-md bg-cream-100 px-2 py-0.5 text-[0.72rem] text-cocoa-soft">{it}</span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================== CHALLENGES ==== */

const CHALLENGES = [
  { t: "Designing an adaptive learning state", p: "Raw database rows are not a learner state, and a model-heavy engine would be impossible to test or explain.", s: "learner_state assembles a typed LearnerSignals snapshot; the engine is a pure function over it. No I/O, so it is unit-tested for monotonicity, cold start and preferences, and reused by the public demos." },
  { t: "Turning interactions into meaningful signals", p: "A 30-second answer means something different on an easy question than on a hard one; a correct answer after a hint is not the same evidence.", s: "Response time is normalised by the expected time for the difficulty. BKT treats hinted successes as weaker evidence and sets p_guess from the options shown. Event payloads are allow-listed." },
  { t: "Keeping decisions interpretable", p: "Personalisation that nobody can explain is hard to trust, especially for children's education.", s: "Five named families with documented weights, explicit thresholds, factor contributions and a rationale on every decision, all persisted to adaptive_strategies." },
  { t: "Cold start without guesswork", p: "A brand-new learner has no history, yet the first lesson still needs a sensible strategy.", s: "Shrinkage: support = c·raw + (1 − c)·0.58 with c = attempts / 12. Missing model families are dropped and weights re-normalised." },
  { t: "Integrating AI safely", p: "LLMs fail, refuse, time out and return malformed JSON, and the user here is a child.", s: "Input and output safety screens, PII redaction, strict structured outputs validated by Pydantic, and a grounded demo fallback that the UI labels honestly." },
  { t: "RAG that works offline", p: "Embedding APIs make CI flaky and demos expensive.", s: "A deterministic feature-hashing embedder with the same 384-dim schema as the optional OpenAI one, plus lexical re-ranking to compensate for its lexical nature." },
  { t: "Avoiding train/serve skew", p: "Features computed one way in training and another in production silently break models.", s: "One feature module serves the simulator, real-data training and live inference. Splits are grouped by learner; metrics sit next to baselines." },
  { t: "One schema, two databases", p: "pgvector is essential in production but heavy for fast unit tests.", s: "A portable EmbeddingVector type falls back to JSON on SQLite, with exact NumPy cosine search. CI runs the same 89 tests on both." },
];

export function Challenges() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <section id="engineering" aria-labelledby="challenges-title" className="relative overflow-hidden bg-cream-100/60 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-dots opacity-30" />
      <div className="container-x relative">
        <SectionHeader index="20" eyebrow="Engineering challenges" title={<span id="challenges-title">What made this technically interesting?</span>} lede="Each card states the problem. Flip it to see how the codebase solves it." />
        <div className="grid gap-4 md:grid-cols-2">
          {CHALLENGES.map((c, i) => {
            const solved = !!open[i];
            return (
              <Reveal key={c.t} delay={(i % 2) * 0.06}>
                <button
                  type="button"
                  aria-expanded={solved}
                  onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                  className={`group block h-full w-full rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lift ${solved ? "border-maroon-700 bg-maroon-700 text-cream-50" : "border-sand-200 bg-white"}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`font-mono text-xs ${solved ? "text-cream-300" : "text-sand-400"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${solved ? "bg-cream-400 text-maroon-900" : "bg-maroon-50 text-maroon-600"}`}>
                      {solved ? "Approach" : "Problem"}
                    </span>
                  </div>
                  <h3 className={`font-display text-xl font-semibold ${solved ? "" : "text-maroon-800"}`}>{c.t}</h3>
                  <AnimatePresence mode="wait">
                    <motion.p key={solved ? "s" : "p"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={`mt-3 text-sm leading-relaxed ${solved ? "text-cream-100/85" : "text-cocoa-soft"}`}>
                      {solved ? c.s : c.p}
                    </motion.p>
                  </AnimatePresence>
                  <span className={`mt-4 inline-block text-xs font-medium ${solved ? "text-cream-300" : "text-maroon-500"}`}>{solved ? "← back to the problem" : "See the approach →"}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ======================================================= IMPLEMENTATION ==== */

const SNIPPETS = [
  {
    id: "engine", label: "Engine weights", file: "backend/app/adaptive/engine.py",
    code: `# Weights for each signal family. Sum = 1.0. Kept explicit for interpretability.
FAMILY_WEIGHTS: dict[str, float] = {
    "performance": 0.30,
    "mastery": 0.25,
    "ml_struggle": 0.20,
    "behaviour": 0.15,
    "momentum": 0.10,
}

COLD_START_PRIOR = 0.58  # new learners start with slightly more scaffolding

    confidence = _clip(signals.attempts / FULL_CONFIDENCE_ATTEMPTS)
    support = confidence * raw + (1 - confidence) * COLD_START_PRIOR`,
  },
  {
    id: "provider", label: "Provider interface", file: "backend/app/ai/providers/base.py",
    code: `@dataclass
class LLMRequest:
    task: str  # tutor | quiz | summary | study_plan
    system: str
    messages: list[dict]
    schema: type[BaseModel]
    context: dict[str, Any] = field(default_factory=dict)
    max_tokens: int = 1200


class LLMProvider(ABC):
    name: str
    model: str
    is_demo: bool = False

    @abstractmethod
    def generate(self, request: LLMRequest) -> BaseModel: ...`,
  },
  {
    id: "rerank", label: "Hybrid re-rank", file: "backend/app/rag/store.py",
    code: `def search(..., candidates: int = 24, ...):
    ...
    for chunk, sim in rows:
        overlap = len(q_terms & set(tokenize(chunk.content))) / max(1, len(q_terms))
        score = 0.8 * sim + 0.2 * overlap
        ...`,
  },
];

const TREE = `lumora/
├── backend/app/
│   ├── adaptive/   # pure adaptive teaching engine
│   ├── ai/         # providers, prompts, schemas, safety
│   ├── api/        # FastAPI routers + auth dependency
│   ├── ml/         # features, BKT, trend, simulator, training, registry
│   ├── rag/        # extract, chunk, embed, vector store
│   ├── models/     # SQLAlchemy models (22 tables)
│   └── services/   # quiz, tutor, analytics, recommendations…
├── backend/alembic/  # migrations: pgvector + HNSW
├── frontend/         # React + TypeScript product app
└── docs/             # architecture, model card, API, deployment`;

export function Implementation() {
  const [id, setId] = useState("engine");
  const s = SNIPPETS.find((x) => x.id === id)!;
  return (
    <section aria-labelledby="impl-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="21" eyebrow="Implementation" title={<span id="impl-title">Read the code, not the claims.</span>} lede="Short excerpts from the repository (trimmed with … where noted). Each one links to its source." />
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-maroon-950 shadow-lift on-dark">
              <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2" role="tablist" aria-label="Code excerpts">
                {SNIPPETS.map((x) => (
                  <button key={x.id} role="tab" aria-selected={id === x.id} onClick={() => setId(x.id)} className={`min-h-[40px] rounded-xl px-3 text-xs font-medium transition ${id === x.id ? "bg-white/10 text-cream-100" : "text-cream-100/50 hover:text-cream-100"}`}>
                    {x.label}
                  </button>
                ))}
              </div>
              <pre className="max-h-[26rem] overflow-auto p-5 font-mono text-[0.78rem] leading-relaxed text-cream-100/90" role="tabpanel" tabIndex={0}>
                <code>{s.code}</code>
              </pre>
              <div className="border-t border-white/10 px-5 py-3"><SourceRef dark path={s.file} href={blob(s.file)} /></div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-sand-200 bg-white p-5">
              <p className="eyebrow mb-3 text-maroon-500">Project structure</p>
              <pre className="overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-cocoa">{TREE}</pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================= TESTING ==== */

const SUITES = [
  { name: "safety", n: 13, side: "backend" }, { name: "rag", n: 11, side: "backend" }, { name: "ml", n: 11, side: "backend" },
  { name: "adaptive engine", n: 11, side: "backend" }, { name: "api: learning", n: 11, side: "backend" }, { name: "api: auth", n: 9, side: "backend" },
  { name: "api: public", n: 9, side: "backend" }, { name: "api: tutor", n: 9, side: "backend" }, { name: "api: documents", n: 5, side: "backend" },
  { name: "components", n: 8, side: "frontend" }, { name: "lib", n: 8, side: "frontend" },
];

export function Testing() {
  return (
    <section aria-labelledby="testing-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="22" eyebrow="Testing" title={<span id="testing-title">105 product tests, on two databases.</span>} lede="89 backend tests run against SQLite and against PostgreSQL 16 with pgvector in CI; 16 frontend tests cover accessibility semantics, the API client and the event tracker. This case study adds its own engine-parity tests." />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-2.5" aria-label="Tests per suite">
              {SUITES.map((s) => (
                <li key={s.name} className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-3 text-sm">
                  <span className="truncate text-cocoa-soft">{s.name}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-sand-100">
                    <motion.span initial={{ width: 0 }} whileInView={{ width: `${(s.n / 13) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} className={`block h-full rounded-full ${s.side === "backend" ? "bg-maroon-600" : "bg-cream-500"}`} />
                  </span>
                  <span className="text-right font-mono text-maroon-700">{s.n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex gap-4 text-xs text-sand-500">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-maroon-600" /> backend · pytest</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-cream-500" /> frontend · Vitest</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-sand-200 bg-cream-50 p-6">
              <p className="eyebrow mb-4 text-maroon-500">What they check</p>
              <ul className="grid gap-2 text-sm text-cocoa">
                {[
                  "Engine monotonicity, cold start, preferences and explainability",
                  "BKT and trend maths; models trained and compared with baselines",
                  "Chunking, extraction security and RAG grounding",
                  "Safety rules for every category, including diagnosis requests",
                  "Auth: hashing, revocation, ownership (404 for others' data)",
                  "Quiz grading and adaptivity, uploads, rate limiting, security headers",
                  "Friendly, child-appropriate error messages",
                ].map((x) => (
                  <li key={x} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-maroon-500" aria-hidden /> {x}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                <SourceRef path="backend/tests" href={tree("backend/tests")} />
                <SourceRef path=".github/workflows/ci.yml" href={blob(".github/workflows/ci.yml")} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ========================================================== DEPLOYMENT ==== */

const PIPE = [
  { Icon: GitBranch, t: "Push to main", d: "GitHub repository", status: "built" as const },
  { Icon: CheckCircle2, t: "CI on GitHub Actions", d: "Ruff · Alembic up/down/drift · pytest on PostgreSQL + SQLite · typecheck · Vitest · Vite build · Docker images · compose smoke test", status: "built" as const },
  { Icon: Server, t: "Render: API", d: "render.yaml blueprint · Docker web service · start.sh: migrate → seed → uvicorn · health check /api/health · PostgreSQL with pgvector", status: "built" as const },
  { Icon: Rocket, t: "Vercel: web app", d: "frontend/vercel.json · SPA rewrites + security headers · VITE_API_URL points at the API, which allow-lists it in CORS", status: "built" as const },
];

export function Deployment() {
  return (
    <section id="deployment" aria-labelledby="deploy-title" className="relative overflow-hidden bg-maroon-950 py-24 text-cream-50 on-dark sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-80" />
      <div className="container-x relative">
        <SectionHeader dark index="23" eyebrow="Deployment" title={<span id="deploy-title">From git push to two hosts, or one box.</span>} lede="Deployment is configuration in the repository: a Render blueprint for the Dockerised API and database, a Vercel config for the SPA, and Docker Compose for a single host." />
        <ol className="relative grid gap-4 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-cream-400/50 to-transparent lg:block" />
          {PIPE.map(({ Icon, t, d, status }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <li className="glass-dark relative h-full rounded-3xl p-6">
                <span className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-400 text-maroon-900 shadow-[0_0_30px_-4px_rgba(248,213,112,0.6)]">
                  <Icon size={22} aria-hidden />
                </span>
                <p className="font-mono text-[0.65rem] text-cream-400">step {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-cream-100/70">{d}</p>
                <div className="mt-4"><Status kind={status}>Config in repo</Status></div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="eyebrow mb-2 text-cream-400">Single host</p>
              <pre className="overflow-x-auto font-mono text-[0.78rem] text-cream-100/85">{`cp .env.example .env   # set JWT_SECRET
docker compose up --build
# app  http://localhost:8080
# API  http://localhost:8080/docs`}</pre>
              <p className="mt-3 text-xs text-cream-100/60">nginx serves the SPA and proxies /api, so only one origin is exposed.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="eyebrow mb-2 text-cream-400">Production guards</p>
              <ul className="space-y-1.5 text-sm text-cream-100/80">
                <li>· The app refuses to start in production with the default JWT secret</li>
                <li>· HSTS in production; strict CORS allow-list</li>
                <li>· ML models are trained into the image at build time</li>
                <li>· Free Render instances sleep, so a first request can take 30–60 s</li>
              </ul>
              <div className="mt-4"><SourceRef dark path="docs/DEPLOYMENT.md" href={DOCS.deployment} /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
