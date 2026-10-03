/**
 * Real captures of the running Lumora app, copied from the main repository's
 * docs/screenshots. The README and this site share the copies in docs/screenshots.
 * Static `new URL(..., import.meta.url)` literals let Vite fingerprint them.
 */
export const shots = {
  sliderStruggling: new URL("../../docs/screenshots/02-adaptive-slider-struggling.png", import.meta.url).href,
  tutorDemo: new URL("../../docs/screenshots/04-watch-the-tutor-adapt.png", import.meta.url).href,
  quizResults: new URL("../../docs/screenshots/08-quiz-results.png", import.meta.url).href,
  tutor: new URL("../../docs/screenshots/09-ai-tutor-rag-sources.png", import.meta.url).href,
  dashboard: new URL("../../docs/screenshots/10-dashboard-demo-learner.png", import.meta.url).href,
  dashboardFull: new URL("../../docs/screenshots/11-dashboard-full.png", import.meta.url).href,
  explore: new URL("../../docs/screenshots/12-explore-subjects.png", import.meta.url).href,
  insights: new URL("../../docs/screenshots/13-insights-grown-up-view.png", import.meta.url).href,
  library: new URL("../../docs/screenshots/14-rag-library-search.png", import.meta.url).href,
  settings: new URL("../../docs/screenshots/15-accessibility-settings.png", import.meta.url).href,
  dashboardPhone: new URL("../../docs/screenshots/16-dashboard-phone.png", import.meta.url).href,
  landingPhone: new URL("../../docs/screenshots/17-landing-phone.png", import.meta.url).href,
} as const;
