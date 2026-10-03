import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { NAV_ITEMS } from "@/components/Nav";

describe("case study page", () => {
  it("renders one h1 and a section for every navigation item", () => {
    const { container } = render(<App />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const item of NAV_ITEMS) expect(container.querySelector(`#${item.id}`)).not.toBeNull();
  });

  it("links to the main Lumora repository", () => {
    render(<App />);
    const links = screen.getAllByRole("link", { name: /github/i });
    expect(links.some((a) => a.getAttribute("href") === "https://github.com/Divyanshi12coder/lumora-adaptive-learning")).toBe(true);
  });

  it("never shows a live-demo button without a configured URL", () => {
    render(<App />);
    expect(screen.queryByRole("link", { name: /live demo/i })).toBeNull();
  });

  it("updates the engine output when a preset changes", async () => {
    render(<App />);
    const presets = screen.getByRole("group", { name: /learner presets/i });
    await userEvent.click(within(presets).getByRole("button", { name: "Struggling" }));
    expect(screen.getAllByText("High support").length).toBeGreaterThan(0);
    await userEvent.click(within(presets).getByRole("button", { name: "Mastered" }));
    expect(screen.getAllByText("Stretch").length).toBeGreaterThan(0);
  });

  it("carries the creator stamp", () => {
    render(<App />);
    expect(screen.getAllByText(/built & created by divyanshi/i).length).toBeGreaterThan(0);
  });
});
