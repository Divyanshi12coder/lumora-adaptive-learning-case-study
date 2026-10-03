import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, BrainCircuit, Database, MonitorSmartphone, Server } from "lucide-react";
import { Reveal, SectionHeader, SourceRef } from "@/components/ui";
import { tree } from "@/data/links";

const LAYERS = [
  {
    id: "client",
    Icon: MonitorSmartphone,
    name: "Client",
    tech: "React 18 · TypeScript · Vite",
    chips: ["TanStack Query", "Tailwind CSS", "Framer Motion", "Recharts", "React Router"],
    points: [
      "An interaction tracker batches learning events and flushes them to POST /api/interactions (only signals are sent, never free text).",
      "A preferences provider applies accessibility settings as CSS variables and classes on <html>.",
      "App routes are lazy-loaded, so the charting library only ships with Dashboard and Insights.",
    ],
    path: "frontend/src",
  },
  {
    id: "api",
    Icon: Server,
    name: "API",
    tech: "FastAPI · Python 3.12 · Pydantic v2",
    chips: ["JWT HS256", "bcrypt", "CORS allow-list", "rate limits", "security headers"],
    points: [
      "42 REST operations under /api, documented automatically at /docs and /redoc.",
      "Revocable JWTs: logout bumps a token version, which invalidates every token for that user.",
      "Middleware adds security headers, a request-size limit and per-IP rate limits on auth, AI and upload routes.",
    ],
    path: "backend/app/api",
  },
  {
    id: "domain",
    Icon: Boxes,
    name: "Domain services",
    tech: "Plain Python services",
    chips: ["learner_state", "adaptive engine", "quiz", "tutor", "analytics", "recommendations", "goals", "documents"],
    points: [
      "learner_state assembles signals from the database, asks the ML registry for predictions, then calls the engine.",
      "The engine itself is a pure function with no I/O, so it can be unit-tested and reused by public demos.",
      "Every strategy and prediction is persisted with its inputs, as an audit trail and future training data.",
    ],
    path: "backend/app/services",
  },
  {
    id: "intel",
    Icon: BrainCircuit,
    name: "Intelligence",
    tech: "AI layer · RAG · ML registry",
    chips: ["safety screens", "structured prompts", "provider interface", "chunk + embed", "hybrid search", "BKT", "scikit-learn"],
    points: [
      "AI: input and output safety screens around a provider-agnostic interface with schema-validated outputs.",
      "RAG: heading-aware chunking, 384-dim embeddings and cosine search with a lexical re-rank.",
      "ML: Bayesian Knowledge Tracing plus scikit-learn models loaded from joblib artifacts by a registry.",
    ],
    path: "backend/app/ai",
  },
  {
    id: "data",
    Icon: Database,
    name: "Data",
    tech: "PostgreSQL 16 + pgvector",
    chips: ["22 tables", "Alembic", "vector(384)", "HNSW index", "SQLite test fallback"],
    points: [
      "SQLAlchemy 2 models with Alembic migrations. CI runs upgrade → downgrade → upgrade → drift check.",
      "document_chunks.embedding is vector(384) with an HNSW cosine index, created by the migration.",
      "On SQLite the vector column falls back to JSON and search to an exact NumPy cosine scan, which keeps tests fast.",
    ],
    path: "backend/alembic",
  },
] as const;

export function Architecture() {
  const [active, setActive] = useState<string>("domain");
  const reduce = useReducedMotion();
  const layer = LAYERS.find((l) => l.id === active)!;

  return (
    <section id="architecture" aria-labelledby="arch-title" className="relative overflow-hidden bg-maroon-950 py-24 text-cream-50 on-dark sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div aria-hidden className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-maroon-600/30 blur-3xl" />
      <div className="container-x relative">
        <SectionHeader
          dark
          index="05"
          eyebrow="System architecture"
          title={<span id="arch-title">Five layers, one direction of dependency.</span>}
          lede="A React client talks to a FastAPI backend over REST. Routers stay thin; the real work lives in domain services, which call into the AI, RAG and ML layers and persist everything to PostgreSQL with pgvector. Select a layer to see what it does."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <ol className="relative space-y-3" aria-label="Architecture layers">
              {/* animated data-flow spine */}
              <svg aria-hidden className="absolute left-[2.15rem] top-6 h-[calc(100%-3rem)] w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(248,213,112,0.25)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line x1="1" y1="0" x2="1" y2="100" stroke="#F8D570" strokeWidth="2" vectorEffect="non-scaling-stroke" className={reduce ? "" : "flow-dash"} />
              </svg>
              {LAYERS.map((l, i) => {
                const on = l.id === active;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setActive(l.id)}
                      onMouseEnter={() => setActive(l.id)}
                      aria-pressed={on}
                      className={`relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition duration-300 ${on ? "border-cream-400/60 bg-white/10 shadow-[0_0_40px_-10px_rgba(248,213,112,0.45)]" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
                      style={{ marginLeft: `${i % 2 ? 0.75 : 0}rem` }}
                    >
                      <span className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${on ? "bg-cream-400 text-maroon-900" : "bg-maroon-800 text-cream-300"}`}>
                        <l.Icon size={20} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="font-display text-lg font-semibold">{l.name}</span>
                          <span className="font-mono text-[0.65rem] text-cream-200/50">L{i + 1}</span>
                        </span>
                        <span className="block truncate text-xs text-cream-100/60">{l.tech}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-dark sticky top-24 min-h-[22rem] rounded-3xl p-6 sm:p-8" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={layer.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  <p className="eyebrow text-cream-400">{layer.tech}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">{layer.name}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {layer.chips.map((c) => (
                      <li key={c} className="chip-dark">{c}</li>
                    ))}
                  </ul>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-cream-100/80">
                    {layer.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <SourceRef dark path={layer.path} href={tree(layer.path)} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Request lifecycle strip */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <p className="eyebrow mb-5 text-cream-400">Request lifecycle · “Ask Divi”</p>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {[
                ["POST /api/tutor/chat", "JWT verified"],
                ["Input safety", "screen + redact PII"],
                ["Intent", "explain · hint · quiz…"],
                ["Retrieve", "pgvector + re-rank"],
                ["Strategy", "signals → engine"],
                ["LLM provider", "schema-validated"],
                ["Output safety", "reply + sources"],
              ].map(([a, b], i) => (
                <li key={a} className="relative rounded-2xl bg-white/[0.05] p-3">
                  <span className="font-mono text-[0.62rem] text-cream-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-sm font-medium">{a}</p>
                  <p className="text-[0.72rem] text-cream-100/55">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
