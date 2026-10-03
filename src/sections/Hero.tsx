import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowDown, ArrowRight, BookOpenCheck, Compass, Github, MousePointerClick, PlayCircle, Sparkles, UserRound } from "lucide-react";
import { useRef } from "react";
import { CreatorStamp, LogoMark, MagneticLink } from "@/components/ui";
import { DOCS, LIVE_DEMO_URL, REPO_URL } from "@/data/links";
import { decideStrategy, signalsForLevel } from "@/lib/engine";

const NODES = [
  { x: 75, y: 60, label: "Learner", sub: "answers · hints · pauses", Icon: UserRound },
  { x: 350, y: 156, label: "Interactions", sub: "batched events", Icon: MousePointerClick },
  { x: 125, y: 300, label: "Learning signals", sub: "accuracy · pace · confidence", Icon: Activity },
  { x: 360, y: 420, label: "Adaptive engine", sub: "support score → strategy", Icon: Compass },
  { x: 175, y: 540, label: "Personalised experience", sub: "lesson · quiz · tutor", Icon: Sparkles },
];
const PATH = "M75 60 C 200 60, 330 90, 350 156 S 140 230, 125 300 S 340 360, 360 420 S 190 490, 175 540";

const TECH = ["React 18", "TypeScript", "FastAPI", "PostgreSQL + pgvector", "scikit-learn", "Docker"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  // A real engine output (level-30 learner), computed by the TypeScript port of engine.py.
  const sample = decideStrategy(signalsForLevel(30));

  return (
    <section ref={ref} id="overview" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      {/* Background: paper dots, sun glow, orbit rings */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]" />
      <motion.div aria-hidden style={{ y: yGlow }} className="absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,#FFE7A3_0%,rgba(255,231,163,0.35)_40%,transparent_70%)] animate-pulseglow" />
      <div aria-hidden className="absolute -left-56 top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(230,181,188,0.35),transparent_65%)]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-maroon-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-maroon-700 backdrop-blur">
              <span className="font-mono text-[0.65rem] text-sand-500">01</span> Engineering case study
            </span>
            <span className="text-xs text-sand-500">AI · ML · RAG · Full stack · Accessibility</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mb-5 flex items-center gap-4">
            <LogoMark size={56} title="Lumora logo" />
            <span className="font-display text-4xl font-semibold tracking-[0.2em] text-maroon-700 sm:text-5xl">LUMORA</span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-[2.6rem] font-semibold leading-[1.02] text-maroon-900 sm:text-6xl lg:text-[4.4rem]"
          >
            Adaptive learning, <span className="text-gradient animate-gradient italic">built around</span> the learner.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22 }} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cocoa-soft">
            Lumora treats every answer, hint, skip and pause as a learning signal. An explainable engine turns those signals into a
            teaching strategy, choosing difficulty, explanation style, hints, pacing and quiz length, and every lesson, quiz and
            AI-tutor reply follows it.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.32 }} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink href={REPO_URL} external className="btn-primary">
              <Github size={17} aria-hidden /> View on GitHub
            </MagneticLink>
            {LIVE_DEMO_URL ? (
              <MagneticLink href={LIVE_DEMO_URL} external className="btn-ghost">
                <PlayCircle size={17} aria-hidden /> Live demo
              </MagneticLink>
            ) : (
              <MagneticLink href={DOCS.deployment} external className="btn-ghost">
                <PlayCircle size={17} aria-hidden /> Run or deploy it
              </MagneticLink>
            )}
            <a href="#engine" className="btn text-maroon-700 hover:text-maroon-900">
              Explore the engine <ArrowRight size={16} aria-hidden />
            </a>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} aria-label="Core technologies" className="mt-9 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <li key={t} className="chip">{t}</li>
            ))}
          </motion.ul>

          <CreatorStamp className="mt-9" />
        </div>

        {/* The adaptive flow, drawn as a learning path */}
        <motion.div style={{ y: yVisual }} className="relative mx-auto w-full min-w-0 max-w-[520px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full border border-dashed border-maroon-200/60 animate-spin-slow" />
            <div className="absolute inset-[13%] rounded-full border border-cream-400/50 animate-spin-slower" />
          </div>

          <figure className="relative mx-auto aspect-[5/6] w-[72%] sm:w-full" aria-label="How Lumora adapts: learner, interactions, learning signals, adaptive engine, personalised experience">
            <svg viewBox="0 0 500 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="hero-path" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E6B5BC" />
                  <stop offset="55%" stopColor="#8E2F3F" />
                  <stop offset="100%" stopColor="#E9B949" />
                </linearGradient>
                <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              <path d={PATH} fill="none" stroke="#F4DCE0" strokeWidth="14" strokeLinecap="round" />
              <motion.path
                d={PATH}
                fill="none"
                stroke="url(#hero-path)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
              />
              <path d={PATH} fill="none" stroke="#FFFDF7" strokeWidth="1.5" className={reduce ? "" : "flow-dash"} opacity="0.9" />
              {!reduce &&
                [0, 1.3, 2.6].map((begin) => (
                  <g key={begin}>
                    <circle r="9" fill="#F8D570" filter="url(#hero-glow)" opacity="0.8">
                      <animateMotion dur="4s" begin={`-${begin}s`} repeatCount="indefinite" path={PATH} />
                    </circle>
                    <circle r="4" fill="#772233">
                      <animateMotion dur="4s" begin={`-${begin}s`} repeatCount="indefinite" path={PATH} />
                    </circle>
                  </g>
                ))}
            </svg>

            {NODES.map(({ x, y, label, sub, Icon }, i) => (
              // Positioning lives on a plain wrapper: Framer Motion's scale would overwrite a translate on the same element.
              <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(x / 500) * 100}%`, top: `${(y / 600) * 100}%` }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.28, type: "spring", stiffness: 200, damping: 18 }}
              >
                <div className="glass flex items-center gap-3 rounded-2xl py-2 pl-2 pr-3 sm:pr-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${i === 3 ? "bg-maroon-700 text-cream-200" : i === 4 ? "bg-cream-400 text-maroon-800" : "bg-maroon-50 text-maroon-600"}`}>
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block whitespace-nowrap text-[0.78rem] font-semibold text-maroon-800 sm:text-sm">{label}</span>
                    <span className="hidden whitespace-nowrap text-[0.68rem] text-sand-500 sm:block">{sub}</span>
                  </span>
                </div>
              </motion.div>
              </div>
            ))}

            {/* Floating learning cards, fed by real engine output */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2 }} className="absolute -left-4 top-[19%] hidden w-44 animate-float sm:block lg:-left-10">
              <div className="glass rounded-2xl p-3">
                <p className="eyebrow mb-2 text-[0.58rem] text-maroon-500">Engine output</p>
                <p className="font-display text-sm font-semibold capitalize text-maroon-800">{sample.band.replace("_", " ")} band</p>
                <ul className="mt-2 space-y-1 text-[0.68rem] text-cocoa-soft">
                  <li>· {sample.explanation_style.replace(/_/g, " ")}</li>
                  <li>· hints: {sample.hint_level}</li>
                  <li>· {sample.option_count} answer choices</li>
                </ul>
                <p className="mt-2 font-mono text-[0.6rem] text-sand-500">support {sample.support_score.toFixed(3)}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }} className="absolute -right-2 top-[77%] hidden w-40 animate-float-slow sm:block lg:-right-6">
              <div className="glass rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <BookOpenCheck size={15} className="text-maroon-600" aria-hidden />
                  <p className="text-[0.7rem] font-semibold text-maroon-800">Quiz · fractions</p>
                </div>
                <div className="mt-2 space-y-1.5">
                  {["1/3", "1/5", "same"].map((o, i) => (
                    <div key={o} className={`rounded-lg px-2 py-1 text-[0.65rem] ${i === 0 ? "bg-maroon-600 text-cream-50" : "bg-white/80 text-cocoa-soft"}`}>{o}</div>
                  ))}
                </div>
                <p className="mt-2 text-[0.6rem] text-sand-500">3 options in high-support mode</p>
              </div>
            </motion.div>
          </figure>
        </motion.div>
      </div>

      <a href="#glance" className="mx-auto mt-10 hidden w-fit sm:flex flex-col items-center gap-1 text-xs text-sand-500 hover:text-maroon-600">
        Scroll the story <ArrowDown size={16} className={reduce ? "" : "animate-bounce"} aria-hidden />
      </a>
    </section>
  );
}
