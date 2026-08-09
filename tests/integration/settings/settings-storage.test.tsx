import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import "@/i18n";
import { createEmptyForm, FORM_STORAGE_KEY, saveFormToStorage } from "@/domain/form-schema";
import SettingsRoute from "@/routes/settings";

describe("Settings storage controls", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("clears saved form data after confirmation", async () => {
    const user = userEvent.setup();
    saveFormToStorage(createEmptyForm("Stored"));

    render(<SettingsRoute />);

    expect(screen.getByText("保存済みのフォームがあります。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "保存データを削除" }));
    await user.click(screen.getByRole("button", { name: "削除する" }));

    expect(screen.getByRole("status")).toHaveTextContent("保存データを削除しました。");
    expect(window.localStorage.getItem(FORM_STORAGE_KEY)).toBeNull();
    expect(screen.getByText("保存済みのフォームはありません。")).toBeInTheDocument();
  });
});
