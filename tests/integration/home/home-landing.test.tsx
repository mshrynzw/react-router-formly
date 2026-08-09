import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import "@/i18n";
import { HomeLanding } from "@/features/home/components/home-landing";

function renderLanding() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <HomeLanding />,
      },
      { path: "/builder", element: <div>Builder</div> },
      { path: "/templates", element: <div>Templates</div> },
      { path: "/preview", element: <div>Preview</div> },
      { path: "/code", element: <div>Code</div> },
      { path: "/settings", element: <div>Settings</div> },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("HomeLanding", () => {
  it("renders portfolio sections and primary CTAs", () => {
    renderLanding();

    expect(screen.getByRole("heading", { level: 1, name: "Formly" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "できること" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "使い方" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "デモを体験する" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "技術スタック" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "ビルダーを開く" })).toHaveAttribute("href", "/builder");
    expect(screen.getByRole("link", { name: "デモを見る" })).toHaveAttribute("href", "/templates");
  });
});
