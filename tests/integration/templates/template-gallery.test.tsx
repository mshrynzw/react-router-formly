import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";

import "@/i18n";
import { FORM_STORAGE_KEY } from "@/domain/form-schema";
import { TemplateGallery } from "@/features/templates/components/template-gallery";

function renderGallery(initialEntries = ["/templates"]) {
  const router = createMemoryRouter(
    [
      {
        path: "/templates",
        element: <TemplateGallery />,
      },
      {
        path: "/builder",
        element: <div>Builder Route</div>,
      },
    ],
    { initialEntries },
  );

  return {
    router,
    ...render(<RouterProvider router={router} />),
  };
}

describe("TemplateGallery", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("lists templates and applies one after confirmation", async () => {
    const user = userEvent.setup();
    const { router } = renderGallery();

    expect(screen.getByRole("heading", { level: 1, name: "テンプレート" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "お問い合わせ" })).toBeInTheDocument();

    const contactCard = screen.getByRole("heading", { name: "お問い合わせ" }).closest("article");
    expect(contactCard).not.toBeNull();

    await user.click(
      screen.getAllByRole("button", { name: "このテンプレートを使う" }).find((button) =>
        contactCard?.contains(button),
      )!,
    );

    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "適用する" }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/builder");
    });

    const stored = window.localStorage.getItem(FORM_STORAGE_KEY);
    expect(stored).toContain("お問い合わせ");
    expect(stored).toContain('"type":"email"');
  });

  it("cancels apply without writing storage", async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getAllByRole("button", { name: "このテンプレートを使う" })[0]!);
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "キャンセル" }));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(FORM_STORAGE_KEY)).toBeNull();
  });

  it("opens a template preview dialog", async () => {
    const user = userEvent.setup();
    renderGallery();

    const contactCard = screen.getByRole("heading", { name: "お問い合わせ" }).closest("article");
    expect(contactCard).not.toBeNull();

    await user.click(
      screen.getAllByRole("button", { name: "プレビュー" }).find((button) =>
        contactCard?.contains(button),
      )!,
    );

    const dialog = await screen.findByRole("dialog", { name: "お問い合わせ" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleDescription(
      "名前・メール・メッセージの定番フォームです。",
    );
  });
});


