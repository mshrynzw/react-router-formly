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

  it("applies appearance tokens to the preview surface", () => {
    const schema = createEmptyForm("Themed");
    const text = createField("text");
    text.label = "お名前";
    schema.fields = [text, ...schema.fields];
    schema.appearance.colors.pageBackground = { hex: "#abcdef", opacity: 100 };
    schema.appearance.colors.accent = { hex: "#112233", opacity: 100 };

    const { container } = render(<FormRenderer schema={schema} />);
    const surface = container.querySelector('[style*="--formly-page-bg"]');

    expect(surface).not.toBeNull();
    expect(surface).toHaveStyle({ "--formly-page-bg": "#abcdef", "--formly-accent": "#112233" });
  });

  it("renders a displacement filter when liquid glass is enabled", () => {
    const schema = createEmptyForm("Glass");
    const text = createField("text");
    text.label = "お名前";
    schema.fields = [text, ...schema.fields];
    schema.appearance.liquidGlass = "aurora";

    const { container } = render(<FormRenderer schema={schema} />);

    expect(container.querySelector("feDisplacementMap")).not.toBeNull();
    expect(container.querySelector("feDisplacementMap")).toHaveAttribute("in2", "blurred");
    expect(container.querySelector('[style*="backdrop-filter"]')).not.toBeNull();
  });
});
