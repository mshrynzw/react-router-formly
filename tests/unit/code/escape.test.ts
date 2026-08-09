import { describe, expect, it } from "vitest";

import { escapeHtml, escapeHtmlAttr, toJsLiteral } from "@/features/code/generators/escape";

describe("code escape helpers", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it("escapes attribute values", () => {
    expect(escapeHtmlAttr(`a"b'c`)).toBe("a&quot;b&#39;c");
  });

  it("serializes values as safe JavaScript literals", () => {
    expect(toJsLiteral(`</script>`)).toBe('"</script>"');
    expect(toJsLiteral({ name: "Ada", required: true })).toBe('{"name":"Ada","required":true}');
  });
});
