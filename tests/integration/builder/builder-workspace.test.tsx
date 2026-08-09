import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import "@/i18n";
import { FORM_STORAGE_KEY } from "@/domain/form-schema";
import { BuilderWorkspace } from "@/features/builder/components/builder-workspace";

describe("BuilderWorkspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds a text field and allows editing its label", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("button", { name: /テキスト.*1行テキスト入力/ }));

    expect(screen.getByText("フィールド 1 件")).toBeInTheDocument();

    const labelInput = screen.getByLabelText("ラベル");
    await user.clear(labelInput);
    await user.type(labelInput, "お名前");

    expect(screen.getAllByText("お名前").length).toBeGreaterThanOrEqual(1);
    expect(window.localStorage.getItem(FORM_STORAGE_KEY)).toContain("お名前");
  });

  it("configures submission settings", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("tab", { name: "送信" }));

    const actionInput = screen.getByLabelText("Action URL");
    await user.clear(actionInput);
    await user.type(actionInput, "https://example.com/submit");

    const methodSelect = screen.getByLabelText("HTTP Method");
    await user.selectOptions(methodSelect, "GET");

    expect(actionInput).toHaveValue("https://example.com/submit");
    expect(methodSelect).toHaveValue("GET");
  });

  it("duplicates and deletes a field", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("button", { name: /メール.*メールアドレス入力/ }));

    const canvas = screen.getByRole("heading", { name: "キャンバス" }).closest("section");
    expect(canvas).not.toBeNull();

    const canvasSection = canvas as HTMLElement;
    await user.click(within(canvasSection).getByRole("button", { name: "複製" }));
    expect(screen.getByText("フィールド 2 件")).toBeInTheDocument();

    const deleteButtons = within(canvasSection).getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]!);

    expect(screen.getByText("フィールド 1 件")).toBeInTheDocument();
  });
});

