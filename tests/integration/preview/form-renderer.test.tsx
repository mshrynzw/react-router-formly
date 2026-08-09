import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import "@/i18n";
import { createEmptyForm, createField } from "@/domain/form-schema";
import { FormRenderer } from "@/features/preview/components/form-renderer";

describe("FormRenderer", () => {
  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Contact");
    const text = createField("text");
    text.label = "お名前";
    text.required = true;
    schema.fields = [text, ...schema.fields];

    render(<FormRenderer schema={schema} />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByRole("alert")).toHaveTextContent("この項目は必須です。");
  });

  it("shows mock submission success without network requests", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Contact");
    const text = createField("text");
    text.label = "お名前";
    text.required = true;
    schema.fields = [text, ...schema.fields];
    schema.submission = {
      action: "https://example.com/submit",
      method: "POST",
    };

    render(<FormRenderer schema={schema} />);

    await user.type(screen.getByLabelText("お名前"), "山田");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("status")).toHaveTextContent("モック送信に成功しました");
    expect(screen.getByText("https://example.com/submit")).toBeInTheDocument();
  });

  it("shows mock submission error when simulation is enabled", async () => {
    const user = userEvent.setup();
    const schema = createEmptyForm("Contact");
    const text = createField("text");
    text.label = "お名前";
    text.required = false;
    schema.fields = [text, ...schema.fields];

    render(<FormRenderer schema={schema} simulateError />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("モック送信に失敗しました");
  });

  it("renders an empty state when only the submit field exists", () => {
    const schema = createEmptyForm();

    render(<FormRenderer schema={schema} />);

    expect(screen.getByText("プレビューするフィールドがありません")).toBeInTheDocument();
  });
});
