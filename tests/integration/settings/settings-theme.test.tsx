import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import "@/i18n";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import SettingsRoute from "@/routes/settings";

describe("Settings theme controls", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.theme = "";
  });

  it("switches theme and persists the preference", async () => {
    const user = userEvent.setup();
    render(<SettingsRoute />);

    await user.click(screen.getByRole("button", { name: "ライト" }));

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.dataset.theme).toBe("light");

    await user.click(screen.getByRole("button", { name: "ダーク" }));

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
