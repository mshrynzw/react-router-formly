import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";

import "@/i18n";
import { createEmptyForm, createField, saveFormToStorage } from "@/domain/form-schema";
import { PreviewWorkspace } from "@/features/preview/components/preview-workspace";

function renderPreview() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <PreviewWorkspace />,
      },
      {
        path: "/builder",
        element: <div>Builder Route</div>,
      },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("PreviewWorkspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("loads the saved Form Schema and supports viewport switching", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Saved Form");
    const email = createField("email");
    email.label = "メール";
    email.required = false;
    schema.fields = [email, ...schema.fields];
    saveFormToStorage(schema);

    renderPreview();

    expect(screen.getByRole("heading", { level: 1, name: "プレビュー" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Saved Form" })).toBeInTheDocument();
    expect(screen.getByLabelText("メール")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "モバイル" }));
    expect(screen.getByRole("button", { name: "モバイル" })).toHaveAttribute("aria-pressed", "true");
  });

  it("links back to the builder", () => {
    renderPreview();

    expect(screen.getByRole("link", { name: "ビルダーを開く" })).toHaveAttribute("href", "/builder");
  });
});
