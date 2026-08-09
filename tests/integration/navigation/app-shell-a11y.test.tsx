import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import "@/i18n";
import { AppShell } from "@/components/layout/app-shell";
import HomeRoute from "@/routes/home";

function renderShell() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <AppShell />,
        children: [{ index: true, element: <HomeRoute /> }],
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("AppShell accessibility", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("provides a skip link to main content", () => {
    renderShell();

    const skip = screen.getByRole("link", { name: "メインコンテンツへスキップ" });
    expect(skip).toHaveAttribute("href", "#main-content");
    expect(document.getElementById("main-content")).not.toBeNull();
  });

  it("opens the mobile navigation sheet", async () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    const user = userEvent.setup();
    renderShell();

    await user.click(screen.getByRole("button", { name: "メニューを開く" }));

    expect(screen.getByRole("dialog", { name: "メニュー" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ビルダー" })).toBeInTheDocument();
  });
});
