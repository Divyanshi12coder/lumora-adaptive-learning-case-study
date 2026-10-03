import { ArrowUpRight, BookText, Check, FileCode2, Github, PlayCircle } from "lucide-react";
import { CreatorStamp, LogoMark, MagneticLink, Reveal, SectionHeader, Status } from "@/components/ui";
import { AUTHOR_GITHUB, CASE_STUDY_REPO_URL, DOCS, LIVE_DEMO_URL, REPO_URL } from "@/data/links";

/* ======================================================== WHAT I LEARNED ==== */

const LESSONS = [
  { t: "Interpretability is worth the trade", d: "At this data scale an explicit, weighted engine with knowledge tracing beats a black box: it can be tested, explained to a parent and debugged from an audit log." },
  { t: "A weak model can still be useful", d: "The engagement model barely beats chance on synthetic data. Limiting its authority to gentle nudges kept it useful without letting it make important decisions." },
  { t: "Offline-first AI makes everything testable", d: "A grounded demo provider and hashing embeddings let CI exercise every AI and RAG path without keys, network calls or flakiness." },
  { t: "Honesty is a product feature", d: "Synthetic data is labelled as synthetic wherever it appears, in the model card, the Insights view and the demo account banner." },
  { t: "Accessibility and personalisation are one system", d: "Text size, read-aloud and pacing preferences are not just settings; the engine reads them alongside behaviour." },
  { t: "Separate the child's view from the grown-up's", d: "Children see warmth and encouragement; the numbers, factors and model details live in a separate Insights view." },
];

export function Learned() {
  return (
    <section aria-labelledby="learned-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-ruled opacity-50" />
      <div className="container-x">
        <SectionHeader index="24" eyebrow="What I learned" title={<span id="learned-title">Design lessons, written into the code.</span>} />
        <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((l, i) => (
            <Reveal key={l.t} delay={(i % 3) * 0.06}>
              <li className="border-t-2 border-maroon-600 pt-5">
                <span className="font-display text-3xl font-semibold text-cream-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-maroon-800">{l.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{l.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ======================================================= FUTURE WORK ==== */

const FUTURE = [
  "Fit BKT parameters per skill with EM; try deep or attentive knowledge tracing once real data exists",
  "Parent and teacher accounts with consent flows and classroom dashboards",
  "Provider moderation APIs, multilingual safety, multilingual content and TTS voices",
  "Semantic local embeddings (a small ONNX sentence encoder) and cross-encoder re-ranking",
  "Spaced-repetition scheduling with reminders, plus offline / PWA support",
  "A/B evaluation of engine weights against learning gains, with ethics review",
];

export function Future() {
  return (
    <section aria-labelledby="future-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="25" eyebrow="Future improvements" title={<span id="future-title">What comes next.</span>} lede="None of these are built yet. They are the roadmap from the main repository's documentation." />
        <ol className="relative space-y-3 border-l-2 border-dashed border-maroon-200 pl-6 sm:pl-8">
          {FUTURE.map((f, i) => (
            <Reveal key={f} delay={i * 0.05}>
              <li className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sand-200 bg-cream-50/70 p-4">
                <span aria-hidden className="absolute -left-[2.05rem] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-maroon-400 bg-white sm:-left-[2.55rem]" />
                <span className="text-sm text-cocoa">{f}</span>
                <Status kind="future" />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================ HIGHLIGHTS + CTA ==== */

const HIGHLIGHTS = [
  ["Full-stack architecture", "React + TypeScript SPA, FastAPI API, PostgreSQL"],
  ["Adaptive decision engine", "Pure, weighted, explainable, audited"],
  ["AI / LLM integration", "Provider interface · structured outputs · fallback"],
  ["RAG pipeline", "Chunk → embed → pgvector HNSW → re-rank → cite"],
  ["Machine learning", "BKT · logistic regression · gradient boosting · K-means"],
  ["PostgreSQL data modelling", "22 tables · Alembic · cascades · constraints"],
  ["REST API design", "42 operations · OpenAPI docs · friendly errors"],
  ["Authentication & security", "JWT with revocation · bcrypt · rate limits · headers"],
  ["Dockerised deployment", "Compose · Render blueprint · Vercel config"],
  ["Testing & CI", "89 backend + 16 frontend tests · two databases"],
  ["Accessibility-focused UX", "Keyboard, focus, contrast, read-aloud, reduced motion"],
  ["Responsible AI", "No diagnosis · safety screens · PII redaction"],
];

export function Highlights() {
  return (
    <section aria-labelledby="highlights-title" className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader index="26" eyebrow="Engineering highlights" align="center" title={<span id="highlights-title">What Divyanshi engineered.</span>} lede="Lumora was designed and built end to end: product, UX, frontend, backend, AI, ML, RAG and DevOps." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <li className="group flex h-full items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-maroon-300 hover:shadow-soft">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon-600 text-cream-50 transition group-hover:scale-110">
                  <Check size={14} aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-maroon-900">{t}</span>
                  <span className="block text-[0.78rem] text-sand-500">{d}</span>
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-maroon-800 px-6 py-14 text-center text-cream-50 on-dark sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 bg-grid-dark" />
            <div aria-hidden className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-cream-400/25 blur-3xl animate-pulseglow" />
            <div className="relative">
              <LogoMark size={64} className="mx-auto" />
              <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-semibold sm:text-5xl">Explore the code behind the story.</h2>
              <p className="mx-auto mt-4 max-w-xl text-cream-100/75">The application repository has the full source, docs, model card and one-command Docker setup.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <MagneticLink href={REPO_URL} external className="btn bg-cream-400 text-maroon-900 shadow-lift hover:bg-cream-300">
                  <Github size={17} aria-hidden /> Lumora on GitHub
                </MagneticLink>
                {LIVE_DEMO_URL && (
                  <MagneticLink href={LIVE_DEMO_URL} external className="btn border border-cream-300/40 text-cream-50 hover:bg-white/10">
                    <PlayCircle size={17} aria-hidden /> Live demo
                  </MagneticLink>
                )}
                <a href={DOCS.architecture} target="_blank" rel="noreferrer" className="btn border border-cream-300/40 text-cream-50 hover:bg-white/10">
                  <BookText size={17} aria-hidden /> Architecture docs
                </a>
                <a href={DOCS.modelCard} target="_blank" rel="noreferrer" className="btn border border-cream-300/40 text-cream-50 hover:bg-white/10">
                  <FileCode2 size={17} aria-hidden /> Model card
                </a>
              </div>
              <CreatorStamp dark className="mt-10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================ FOOTER ==== */

export function Footer() {
  const links: [string, string][] = [
    ["Lumora application", REPO_URL],
    ["This case study", CASE_STUDY_REPO_URL],
    ["API reference", DOCS.api],
    ["Deployment guide", DOCS.deployment],
    ["Divyanshi on GitHub", AUTHOR_GITHUB],
  ];
  return (
    <footer className="border-t border-sand-200 bg-cream-50 py-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={44} />
            <div>
              <p className="font-display text-xl font-semibold tracking-[0.18em] text-maroon-700">LUMORA</p>
              <p className="text-xs text-sand-500">Adaptive learning, built around the learner.</p>
            </div>
          </div>
          <CreatorStamp className="mt-5" />
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-sand-400">Designed &amp; engineered end to end</p>
        </div>
        <nav aria-label="Project links">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cocoa-soft hover:text-maroon-700">
                  {label} <ArrowUpRight size={13} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container-x mt-10 text-[0.7rem] leading-relaxed text-sand-500">
        Lumora is designed to support diverse learning preferences. It is not a medical device and does not diagnose, screen for or treat any
        condition. ML results shown on this page come from synthetic data and are not real-world accuracy claims. Code released under the MIT
        licence.
      </p>
    </footer>
  );
}
