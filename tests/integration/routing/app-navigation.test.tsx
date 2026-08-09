import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";

import "@/i18n";
import { AppShell } from "@/components/layout/app-shell";
import BuilderRoute from "@/routes/builder";
import HomeRoute from "@/routes/home";
import SettingsRoute from "@/routes/settings";

function renderApp(initialEntry = "/") {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <AppShell />,
        children: [
          { index: true, element: <HomeRoute /> },
          { path: "builder", element: <BuilderRoute /> },
          { path: "settings", element: <SettingsRoute /> },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  return render(<RouterProvider router={router} />);
}

describe("app navigation", () => {
  it("renders the home page and navigates to the builder", async () => {
    const user = userEvent.setup();
    renderApp("/");

    expect(screen.getByRole("heading", { level: 1, name: "Formly" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "ビルダーを開く" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "フォームビルダー" }),
    ).toBeInTheDocument();
  });

  it("renders the settings language controls", () => {
    renderApp("/settings");

    expect(screen.getByRole("heading", { level: 1, name: "設定" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "日本語" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
  });
});
