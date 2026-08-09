import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    const maybeHidden: string | false = false;
    expect(cn("px-2", "px-4", maybeHidden, "text-sm")).toBe("px-4 text-sm");
  });
});
