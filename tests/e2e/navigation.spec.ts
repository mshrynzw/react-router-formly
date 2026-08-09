import { expect, test } from "@playwright/test";

test("mvp routes are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Formly" })).toBeVisible();

  await page.getByRole("link", { name: "ビルダー", exact: true }).click();
  await expect(page).toHaveURL(/\/builder$/);
  await expect(page.getByRole("heading", { level: 1, name: "フォームビルダー" })).toBeVisible();

  await page.getByRole("link", { name: "プレビュー", exact: true }).click();
  await expect(page).toHaveURL(/\/preview$/);
  await expect(page.getByRole("heading", { level: 1, name: "プレビュー" })).toBeVisible();

  await page.getByRole("link", { name: "コード", exact: true }).click();
  await expect(page).toHaveURL(/\/code$/);
  await expect(page.getByRole("heading", { level: 1, name: "生成コード" })).toBeVisible();

  await page.getByRole("link", { name: "テンプレート", exact: true }).click();
  await expect(page).toHaveURL(/\/templates$/);
  await expect(page.getByRole("heading", { level: 1, name: "テンプレート" })).toBeVisible();

  await page.getByRole("link", { name: "設定", exact: true }).click();
  await expect(page).toHaveURL(/\/settings$/);
});

