import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import "@/i18n";
import {
  FORM_STORAGE_KEY,
  createEmptyForm,
  createField,
  serializeFormSchema,
} from "@/domain/form-schema";
import { BuilderWorkspace } from "@/features/builder/components/builder-workspace";

describe("Builder import/export", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("imports a schema file after confirmation and persists it", async () => {
    const user = userEvent.setup();
    const imported = createEmptyForm("Imported Form");
    const text = createField("text");
    text.label = "Full Name";
    imported.fields = [text, ...imported.fields];
    imported.submission = {
      action: "https://example.com/forms",
      method: "GET",
    };

    const file = new File([serializeFormSchema(imported)], "imported.formly.json", {
      type: "application/json",
    });

    render(<BuilderWorkspace />);

    const input = document.querySelector('input[type="file"]');
    expect(input).not.toBeNull();

    await user.upload(input as HTMLInputElement, file);
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "インポートする" }));

    expect((await screen.findAllByText("Imported Form")).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Full Name").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("フォームをインポートしました。")).toBeInTheDocument();
    expect(screen.getByText("フィールド 1 件")).toBeInTheDocument();

    await waitFor(() => {
      const stored = window.localStorage.getItem(FORM_STORAGE_KEY);
      expect(stored).toContain("Imported Form");
      expect(stored).toContain("https://example.com/forms");
      expect(stored).toContain('"method":"GET"');
    });
  });

  it("rejects an invalid schema file without replacing the form", async () => {
    const user = userEvent.setup();
    const file = new File(["{not-valid"], "broken.json", {
      type: "application/json",
    });

    render(<BuilderWorkspace />);

    const input = document.querySelector('input[type="file"]');
    expect(input).not.toBeNull();

    await user.upload(input as HTMLInputElement, file);

    expect(await screen.findByText("JSON を解析できませんでした。")).toBeInTheDocument();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
