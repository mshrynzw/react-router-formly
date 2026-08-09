import { expect, test } from "@playwright/test";

function mainNav(page: import("@playwright/test").Page) {
  return page.getByRole("navigation", { name: "メインナビゲーション" });
}

test("landing leads through builder, preview validation, and code", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Formly" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "できること" })).toBeVisible();

  await page.getByRole("link", { name: "ビルダーを開く" }).first().click();
  await expect(page).toHaveURL(/\/builder$/);

  await page
    .getByRole("region", { name: "フィールド" })
    .getByRole("button", { name: "テキスト 1行テキスト入力" })
    .click();
  await expect(page.getByText("フィールド 1 件")).toBeVisible();
  await page.waitForFunction(() => {
    const raw = window.localStorage.getItem("formly.activeForm");
    return typeof raw === "string" && raw.includes('"type":"text"');
  });

  await mainNav(page).getByRole("link", { name: "プレビュー", exact: true }).click();
  await expect(page).toHaveURL(/\/preview$/);

  const submit = page.locator('form button[type="submit"]');
  await expect(page.locator("form input").first()).toBeVisible();
  await expect(submit).toHaveText("Submit");
  await submit.click();
  await expect(page.getByText("この項目は必須です。")).toBeVisible();

  await mainNav(page).getByRole("link", { name: "コード", exact: true }).click();
  await expect(page).toHaveURL(/\/code$/);
  await expect(page.getByRole("heading", { level: 1, name: "生成コード" })).toBeVisible();
  await expect(page.locator("pre, code").first()).toContainText("data-formly-form");
});

test("template apply replaces the form and opens builder", async ({ page }) => {
  await page.goto("/templates");
  await expect(page.getByRole("heading", { level: 1, name: "テンプレート" })).toBeVisible();

  const contactCard = page.locator("article").filter({
    has: page.getByRole("heading", { name: "お問い合わせ", exact: true }),
  });
  await contactCard.getByRole("button", { name: "このテンプレートを使う" }).click();
  await page.getByRole("button", { name: "適用する" }).click();

  await expect(page).toHaveURL(/\/builder$/);
  await expect(page.getByText("お問い合わせ", { exact: true }).first()).toBeVisible();
});

