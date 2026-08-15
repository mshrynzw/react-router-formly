import { render, screen, waitFor, within } from "@testing-library/react";
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
    await waitFor(() => {
      expect(window.localStorage.getItem(FORM_STORAGE_KEY)).toContain("お名前");
    });
  });

  it("requires confirmation before resetting the form", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("button", { name: /テキスト.*1行テキスト入力/ }));
    await user.click(screen.getByRole("button", { name: "新規フォーム" }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "キャンセル" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(screen.getByText("フィールド 1 件")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "新規フォーム" }));
    await user.click(screen.getByRole("button", { name: "新規フォームを作成" }));

    await waitFor(() => {
      expect(screen.getByText("フィールド 0 件")).toBeInTheDocument();
    });
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

  it("places canvas left of builder preview in the wide desktop grid", () => {
    render(<BuilderWorkspace />);

    const canvas = screen.getByRole("heading", { name: "キャンバス" }).closest("section");
    const preview = screen.getByRole("heading", { name: "ビルダープレビュー" }).closest("section");
    const settings = screen.getByRole("heading", { name: "設定" }).closest("section");

    expect(canvas).not.toBeNull();
    expect(preview).not.toBeNull();
    expect(settings).not.toBeNull();
    expect(canvas?.parentElement).toBe(preview?.parentElement);
    expect(canvas?.parentElement).toBe(settings?.parentElement);

    const grid = canvas?.parentElement;
    expect(grid?.className).toContain("xl:grid-cols-[240px_minmax(0,1fr)_minmax(0,1fr)_320px]");
    expect(canvas?.className).toContain("col-start-2");
    expect(preview?.className).toContain("xl:col-start-3");
    expect(settings?.className).toContain("xl:col-start-4");
  });

  it("updates appearance from the design panel", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("tab", { name: "デザイン" }));

    const accent = screen.getByRole("textbox", { name: "アクセント" });
    await user.clear(accent);
    await user.type(accent, "#112233");

    await waitFor(() => {
      expect(window.localStorage.getItem(FORM_STORAGE_KEY)).toContain("#112233");
    });
  });

  it("stores an independent liquid glass preset and backdrop choice from the preview dialog", async () => {
    const user = userEvent.setup();
    render(<BuilderWorkspace />);

    await user.click(screen.getByRole("tab", { name: "デザイン" }));
    expect(screen.queryByRole("button", { name: "Ocean Wave" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "背景" }));
    expect(screen.getByRole("dialog", { name: "背景" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Ocean Wave" }));
    await user.click(screen.getByRole("button", { name: "背景 06" }));

    await waitFor(() => {
      const stored = window.localStorage.getItem(FORM_STORAGE_KEY);
      expect(stored).toContain("ocean");
      expect(stored).toContain("\"backdropId\":\"06\"");
    });

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "背景" })).not.toBeInTheDocument();
  });
});
