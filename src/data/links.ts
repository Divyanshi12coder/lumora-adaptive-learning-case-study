/** The Lumora application (backend, frontend, ML, RAG). */
export const REPO_URL = "https://github.com/Divyanshi12coder/lumora-adaptive-learning";
/** This case-study website. */
export const CASE_STUDY_REPO_URL = "https://github.com/Divyanshi12coder/lumora-adaptive-learning-case-study";
export const CASE_STUDY_SITE_URL = "https://divyanshi12coder.github.io/lumora-adaptive-learning-case-study/";
export const AUTHOR_GITHUB = "https://github.com/Divyanshi12coder";
export const blob = (path: string) => `${REPO_URL}/blob/main/${path}`;
export const tree = (path: string) => `${REPO_URL}/tree/main/${path}`;
export const csBlob = (path: string) => `${CASE_STUDY_REPO_URL}/blob/main/${path}`;

/** Set VITE_LIVE_DEMO_URL at build time once the app is deployed. Until then no "live" button is shown. */
export const LIVE_DEMO_URL: string | null = (import.meta.env.VITE_LIVE_DEMO_URL as string | undefined)?.trim() || null;

export const DOCS = {
  architecture: blob("docs/ARCHITECTURE.md"),
  modelCard: blob("docs/MODEL_CARD.md"),
  api: blob("docs/API.md"),
  deployment: blob("docs/DEPLOYMENT.md"),
  readme: `${REPO_URL}#readme`,
};
