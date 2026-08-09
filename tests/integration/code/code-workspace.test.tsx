import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import "@/i18n";
import { createEmptyForm, createField, saveFormToStorage } from "@/domain/form-schema";
import { CodeWorkspace } from "@/features/code/components/code-workspace";
import { copyToClipboard } from "@/features/code/utils/copy-to-clipboard";

vi.mock("@/features/code/utils/copy-to-clipboard", () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

function renderCode() {
  const router = createMemoryRouter(
    [
      { path: "/", element: <CodeWorkspace /> },
      { path: "/builder", element: <div>Builder</div> },
      { path: "/preview", element: <div>Preview</div> },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

describe("CodeWorkspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(copyToClipboard).mockClear();
    vi.mocked(copyToClipboard).mockResolvedValue(true);
  });

  it("shows generated HTML from the saved Form Schema", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Contact Form");
    const email = createField("email");
    email.label = "メール";
    schema.fields = [email, ...schema.fields];
    saveFormToStorage(schema);

    renderCode();

    expect(screen.getByRole("heading", { level: 1, name: "生成コード" })).toBeInTheDocument();
    expect(screen.getByText(/Contact Form/)).toBeInTheDocument();
    expect(screen.getByText(/メール/)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "CSS" }));
    expect(screen.getByLabelText("CSS コード")).toHaveTextContent(".formly-form {");

    await user.click(screen.getByRole("tab", { name: "JavaScript" }));
    expect(screen.getByLabelText("JavaScript コード")).toHaveTextContent("function validateForm");
  });

  it("copies the active code to the clipboard", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Copy Form");
    const text = createField("text");
    schema.fields = [text, ...schema.fields];
    saveFormToStorage(schema);

    renderCode();

    await user.click(screen.getByRole("button", { name: "コピー" }));

    expect(copyToClipboard).toHaveBeenCalledWith(expect.stringContaining("data-formly-form"));
    expect(await screen.findByRole("status")).toHaveTextContent("クリップボードにコピーしました。");
  });
});
