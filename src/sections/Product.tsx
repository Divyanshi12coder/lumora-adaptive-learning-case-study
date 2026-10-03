import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Compass, LayoutDashboard, Library, ListChecks, MessageCircle, Target } from "lucide-react";
import { BrowserFrame, PhoneFrame, Reveal, SectionHeader } from "@/components/ui";
import { shots } from "@/data/screenshots";

const TOUR = [
  {
    id: "dashboard", n: "12", Icon: LayoutDashboard, tab: "Learner dashboard",
    title: "Three questions a child actually asks.",
    body: "What should I learn today? How am I doing? What did I achieve? The dashboard answers them with a recommended next step, a mastery ring, a learning week and a journey path. “Why does Divi say that?” expands the engine's reasoning in child-friendly words.",
    points: ["Next step from the recommendation ranking", "Mastery from Bayesian Knowledge Tracing", "Encouraging words instead of raw numbers", "Demo account clearly labelled as simulated"],
    src: shots.dashboard, alt: "Lumora learner dashboard showing a recommended lesson, a 77% mastery ring, a learning week and the learning journey", url: "lumora / app",
  },
  {
    id: "quiz", n: "13", Icon: ListChecks, tab: "Quiz experience",
    title: "Quizzes generated for this learner, right now.",
    body: "The engine picks difficulty, length, the number of answer choices and which review items to include. Learners can ask for a hint at the strategy's hint level, skip without penalty and say how sure they are. Results show the mastery update, a revision plan and what comes next.",
    points: ["Difficulty, length and 3 or 4 options chosen by the engine", "Hints, skips and “how sure are you?” become signals", "Mastery before → after, from BKT", "Revision plan and “ask Divi to explain differently”"],
    src: shots.quizResults, alt: "Quiz results page showing topic mastery change, next-time difficulty and a recommended revision list", url: "lumora / app / quiz",
  },
  {
    id: "tutor", n: "14", Icon: MessageCircle, tab: "AI tutor",
    title: "Divi: a patient guide that shows its sources.",
    body: "Quick actions (explain, easier example, hint, quiz me, “I don't understand”, explain differently) map to tutor intents. Each reply follows the current strategy, arrives as structured steps and examples, and cites the library passages it was grounded in.",
    points: ["Intent → strategy → RAG → structured reply", "Expandable cited sources", "Feedback (too long, too hard…) adjusts preference biases", "Identifies as an AI; reminds learners not to share personal details"],
    src: shots.tutor, alt: "Divi AI tutor reply with numbered steps, examples, a practice question and four cited source passages", url: "lumora / app / tutor",
  },
  {
    id: "analytics", n: "15", Icon: BarChart3, tab: "Analytics",
    title: "A separate, transparent view for grown-ups.",
    body: "Insights shows mastery over time, accuracy and engagement trends, per-topic signals, the current strategy with factor contributions, the history of engine decisions, model predictions and the model card, with a reminder that it describes behaviour, never a condition.",
    points: ["Engine decisions over time", "Factor contributions for the current strategy", "Model card with data provenance", "Safety log counts only, never message contents"],
    src: shots.insights, alt: "Grown-up insights page with mastery, accuracy and engagement charts, topic table, adaptive strategy and model card", url: "lumora / app / insights", position: "top",
  },
  {
    id: "goals", n: "16", Icon: Target, tab: "Goals & progress",
    title: "Gentle progress, no streak pressure.",
    body: "Learners set their own goals, see growth over time and move along a learning journey from Start to Explore. Badges reward effort and understanding. The design deliberately avoids streak mechanics that punish a missed day.",
    points: ["Create, complete and delete goals (/api/goals)", "Growth chart from mastery history", "Journey stages derived from mastery", "Badges computed from real activity"],
    src: shots.dashboardFull, alt: "Dashboard growth chart and goals panel with an add-goal button", url: "lumora / app", position: "50% 54%",
  },
  {
    id: "library", n: "+", Icon: Library, tab: "Library (RAG)",
    title: "Learn from your own notes, and inspect the retriever.",
    body: "Learners upload .txt, .md or .pdf notes, which are chunked, embedded and indexed in pgvector. A search box shows exactly which passages the retriever returns, with their scores: the same context the tutor receives.",
    points: ["Upload → validate → chunk → embed → index", "Private to the uploader; built-in library is read-only", "Transparent retrieval scores", "Extractive or LLM document summaries"],
    src: shots.library, alt: "Library page with an upload form and search results showing passages with retrieval scores", url: "lumora / app / library",
  },
  {
    id: "explore", n: "+", Icon: Compass, tab: "Subjects",
    title: "Subjects, topics and lessons that open the right sections.",
    body: "Four starter subjects and twelve topics with prerequisites. Lessons are structured JSON sections; the engine decides which ones open by default for each learner.",
    points: ["4 subjects · 12 topics · 72 questions seeded", "Topic prerequisites feed readiness", "Custom SVG subject illustrations", "Starter curriculum is illustrative, not aligned to a national curriculum"],
    src: shots.explore, alt: "Explore page listing subjects and topic cards with mastery", url: "lumora / app / explore",
  },
] as const;

export function Product() {
  const [id, setId] = useState<string>("dashboard");
  const item = TOUR.find((t) => t.id === id)!;

  return (
    <section id="product" aria-labelledby="product-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,231,163,0.6),transparent_65%)]" />
      <div className="container-x">
        <SectionHeader
          index="11"
          eyebrow="Product experience"
          title={<span id="product-title">Warm for the learner. Transparent for everyone else.</span>}
          lede="Every image below is a real capture of the running app (React + FastAPI on PostgreSQL with pgvector). Demo-account screens use a seeded learner whose history is simulated, and the app says so."
        />

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Product areas">
          {TOUR.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`ptab-${t.id}`}
              aria-selected={id === t.id}
              aria-controls="product-panel"
              onClick={() => setId(t.id)}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${id === t.id ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-lift" : "border-sand-200 bg-white text-maroon-700 hover:border-maroon-300"}`}
            >
              <t.Icon size={15} aria-hidden /> {t.tab}
            </button>
          ))}
        </div>

        <div id="product-panel" role="tabpanel" aria-labelledby={`ptab-${id}`}>
          <AnimatePresence mode="wait">
            <motion.div key={id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <p className="font-mono text-xs text-sand-500">{item.n !== "+" ? item.n : ""}</p>
                <h3 className="mt-1 font-display text-3xl font-semibold leading-tight text-maroon-800">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-cocoa-soft">{item.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-cocoa">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative [perspective:1600px]">
                <motion.div initial={{ rotateY: -6, rotateX: 3 }} animate={{ rotateY: 0, rotateX: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <BrowserFrame src={item.src} alt={item.alt} url={item.url} position={"position" in item ? item.position : "top"} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Responsive proof */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid items-center gap-10 rounded-[2rem] border border-sand-200 bg-gradient-to-br from-cream-100 via-white to-maroon-50 p-6 sm:p-10 md:grid-cols-[1fr_auto_auto]">
            <div>
              <p className="eyebrow text-maroon-500">Responsive by design</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-maroon-800 sm:text-3xl">Rebuilt for small screens, not shrunk.</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa-soft">
                The app shell collapses its sidebar, cards restack and touch targets stay at 44–64 px. These captures come from the same automated
                browser run at phone width.
              </p>
            </div>
            <PhoneFrame src={shots.dashboardPhone} alt="Lumora dashboard on a phone-sized screen" className="mx-auto w-40 sm:w-44" />
            <PhoneFrame src={shots.landingPhone} alt="Lumora landing page on a phone-sized screen" className="mx-auto hidden w-40 rotate-3 sm:block sm:w-44" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <figure>
              <BrowserFrame src={shots.sliderStruggling} alt="Landing page engine slider set to struggling, showing gentle difficulty and guided hints" url="lumora / landing" aspect="aspect-[16/9]" position="center" />
              <figcaption className="mt-2 text-xs text-sand-500">Public landing demo: the real Python engine responding to a “struggling” learner.</figcaption>
            </figure>
            <figure>
              <BrowserFrame src={shots.tutorDemo} alt="Watch the tutor adapt demo: the learner says I'm confused and Divi slows down with steps and examples" url="lumora / landing" aspect="aspect-[16/9]" position="center" />
              <figcaption className="mt-2 text-xs text-sand-500">“Watch the tutor adapt”: engine + RAG + the offline demo provider, open to anonymous visitors.</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
