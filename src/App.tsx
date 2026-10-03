import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { AtAGlance, HowItAdapts, Idea, Problem } from "@/sections/Story";
import { Architecture } from "@/sections/Architecture";
import { EngineLab } from "@/sections/EngineLab";
import { AILayer, DataModel, MLSystem, RagPipeline } from "@/sections/Intelligence";
import { Product } from "@/sections/Product";
import { AccessibilitySection, Challenges, Deployment, Implementation, Safety, TechStack, Testing } from "@/sections/Engineering";
import { Footer, Future, Highlights, Learned } from "@/sections/Closing";

export default function App() {
  // The browser tries to scroll to #section before React has rendered it, so deep links
  // (e.g. a recruiter sharing …/#engine) need one explicit scroll after mount.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, []);

  return (
    // "user" makes every Framer Motion animation honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main">
        <Hero />
        <AtAGlance />
        <Problem />
        <Idea />
        <HowItAdapts />
        <Architecture />
        <EngineLab />
        <AILayer />
        <RagPipeline />
        <MLSystem />
        <DataModel />
        <Product />
        <AccessibilitySection />
        <Safety />
        <TechStack />
        <Challenges />
        <Implementation />
        <Testing />
        <Deployment />
        <Learned />
        <Future />
        <Highlights />
      </main>
      <Footer />
    </MotionConfig>
  );
}
