import "@testing-library/jest-dom/vitest";

// jsdom lacks these browser APIs; the page uses them for scroll effects.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.assign(globalThis, { IntersectionObserver: IO });
window.scrollTo = () => {};
window.matchMedia ||= ((q: string) => ({
  matches: false, media: q, onchange: null,
  addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia;
