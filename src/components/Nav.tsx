import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { Wordmark } from "./ui";
import { REPO_URL } from "@/data/links";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "engine", label: "Adaptive Engine" },
  { id: "ai", label: "AI" },
  { id: "ml", label: "ML" },
  { id: "product", label: "Product" },
  { id: "ux", label: "UX" },
  { id: "engineering", label: "Engineering" },
  { id: "deployment", label: "Deployment" },
] as const;

/** Tracks which top-level section is currently in the reading zone. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const first = ids.find((id) => seen.get(id));
        if (first) setActive(first);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export function Nav() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-sand-200/70 bg-cream-50/80 shadow-soft backdrop-blur-xl" : "bg-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-maroon-700 focus:px-4 focus:py-2 focus:text-cream-50">
        Skip to content
      </a>
      <nav aria-label="Case study sections" className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#overview" aria-label="Lumora — back to top" className="shrink-0">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3 py-2 text-[0.8rem] font-medium transition-colors ${active === item.id ? "text-maroon-800" : "text-cocoa-soft/80 hover:text-maroon-700"}`}
              >
                {active === item.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-cream-200/90 ring-1 ring-cream-400/50" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-primary hidden !min-h-[40px] !py-2 sm:inline-flex">
            <Github size={16} aria-hidden /> GitHub
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white/80 text-maroon-700 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>
      <motion.div aria-hidden className="h-[2px] origin-left bg-gradient-to-r from-maroon-600 via-maroon-400 to-cream-500" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-sand-200 bg-cream-50/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="container-x grid gap-1 py-6">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`flex items-baseline gap-4 rounded-2xl px-4 py-3 font-display text-2xl ${active === item.id ? "bg-cream-200 text-maroon-800" : "text-maroon-700"}`}
                  >
                    <span className="font-mono text-xs text-sand-400">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 px-4">
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  <Github size={16} aria-hidden /> View on GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
