import { describe, expect, it } from "vitest";

import { createEmptyForm } from "@/domain/form-schema";
import { mockSubmitForm } from "@/features/preview/utils/mock-submit";

describe("mockSubmitForm", () => {
  it("returns a success result without contacting external endpoints", async () => {
    const schema = createEmptyForm();
    schema.submission = {
      action: "https://example.com/submit",
      method: "POST",
    };

    const result = await mockSubmitForm(schema, { name: "Ada" }, { delayMs: 0 });

    expect(result).toEqual({
      status: "success",
      method: "POST",
      action: "https://example.com/submit",
      values: { name: "Ada" },
    });
  });

  it("returns an error result when simulation is enabled", async () => {
    const schema = createEmptyForm();

    const result = await mockSubmitForm(schema, {}, { simulateError: true, delayMs: 0 });

    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.messageKey).toBe("preview.submission.forcedError");
    }
  });
});
