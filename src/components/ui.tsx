import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ brand */

/** The Lumora mark: a sun, an open book whose spine grows into a sprout, and a spark. */
export function LogoMark({ size = 36, title, className }: { size?: number; title?: string; className?: string }) {
  const id = `sun-${useId().replace(/:/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <radialGradient id={id} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFF6D6" />
          <stop offset="100%" stopColor="#F8D570" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${id})`} />
      <path d="M31 48C24.5 43.5 16 42.5 9.5 44V27C16 25.5 24.5 26.5 31 31Z" fill="#772233" />
      <path d="M33 48C39.5 43.5 48 42.5 54.5 44V27C48 25.5 39.5 26.5 33 31Z" fill="#8E2F3F" />
      <path d="M13.5 32.5C18 31.8 23 32.3 27.5 34.4M13.5 37.5C18 36.8 23 37.3 27.5 39.4" stroke="#FFF2CC" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M50.5 32.5C46 31.8 41 32.3 36.5 34.4M50.5 37.5C46 36.8 41 37.3 36.5 39.4" stroke="#FFF2CC" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M32 31V20" stroke="#5F1A29" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M32 24C27 24 23.5 21 23 16.5C27.5 16.5 31 19.5 32 24Z" fill="#AE4F5E" />
      <path d="M32 21.5C37 21.5 40.5 18.5 41 14C36.5 14 33 17 32 21.5Z" fill="#772233" />
      <path d="M47 8.5L48.3 12.7L52.5 14L48.3 15.3L47 19.5L45.7 15.3L41.5 14L45.7 12.7Z" fill="#5F1A29" />
    </svg>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={34} />
      <span className={`font-display text-xl font-semibold tracking-[0.14em] ${dark ? "text-cream-100" : "text-maroon-700"}`}>LUMORA</span>
    </span>
  );
}

/** The creator stamp used in the footer, CTA and README. */
export function CreatorStamp({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${dark ? "text-cream-300" : "text-maroon-600"} ${className}`}>
      <span aria-hidden className="text-cream-500">✦</span> Built &amp; created by Divyanshi
    </p>
  );
}

/* ------------------------------------------------------------- structure */

export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  dark = false,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-10 max-w-3xl md:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${dark ? "text-cream-400" : "text-maroon-500"}`}>
        <span className={`font-mono text-[0.72rem] tracking-normal ${dark ? "text-cream-200/70" : "text-sand-500"}`}>{index}</span>
        <span aria-hidden className={`h-px w-8 ${dark ? "bg-cream-400/50" : "bg-maroon-300"}`} />
        {eyebrow}
      </p>
      <h2 className={`text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl md:text-5xl ${dark ? "text-cream-50" : "text-maroon-800"}`}>{title}</h2>
      {lede && <p className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-cream-100/75" : "text-cocoa-soft"}`}>{lede}</p>}
    </Reveal>
  );
}

export type BuildStatus = "built" | "optional" | "future";
export function Status({ kind, children }: { kind: BuildStatus; children?: ReactNode }) {
  const label = children ?? (kind === "built" ? "Implemented" : kind === "optional" ? "Optional · needs API key" : "Future work");
  return <span className={kind === "built" ? "status-built" : kind === "optional" ? "status-optional" : "status-future"}>{label}</span>;
}

/* --------------------------------------------------------------- frames */

export function BrowserFrame({ src, alt, url = "lumora / app", className = "", position = "top", aspect = "aspect-[16/10]" }: { src: string; alt: string; url?: string; className?: string; position?: string; aspect?: string }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lift ${className}`}>
      <div className="flex items-center gap-2 border-b border-sand-100 bg-sand-50 px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-maroon-300" />
          <i className="h-2.5 w-2.5 rounded-full bg-cream-400" />
          <i className="h-2.5 w-2.5 rounded-full bg-sand-300" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 font-mono text-[0.65rem] text-sand-500">{url}</span>
      </div>
      <div className={`${aspect} overflow-hidden bg-cream-50`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" style={{ objectPosition: position }} />
      </div>
    </figure>
  );
}

export function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-[2rem] border-[6px] border-maroon-900 bg-maroon-900 shadow-lift ${className}`}>
      <div className="aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-cream-50">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------- motion */

/** Animated counter. Only ever used for numbers that are verifiably true in the repository. */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setShown(value);
    const c = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      {shown}
    </span>
  );
}

/** A link that leans gently toward the pointer. Disabled for reduced motion and touch. */
export function MagneticLink({ href, className, children, external = false }: { href: string; className: string; children: ReactNode; external?: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  return (
    <motion.a
      href={href}
      className={className}
      style={reduce ? undefined : { x: sx, y: sy }}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

/** Small source-file pointer so every claim can be checked in the repository. */
export function SourceRef({ path, href, dark = false }: { path: string; href: string; dark?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 font-mono text-[0.7rem] underline-offset-4 hover:underline ${dark ? "text-cream-300/80" : "text-maroon-500"}`}>
      ↳ {path}
    </a>
  );
}
