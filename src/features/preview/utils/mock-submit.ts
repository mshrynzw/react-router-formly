import type { FormSchema } from "@/domain/form-schema";

import type { FormValues } from "@/features/preview/utils/form-values";

export type MockSubmitResult =
  | {
      status: "success";
      method: FormSchema["submission"]["method"];
      action: string;
      values: FormValues;
    }
  | {
      status: "error";
      method: FormSchema["submission"]["method"];
      action: string;
      messageKey: "preview.submission.forcedError" | "preview.submission.genericError";
    };

export interface MockSubmitOptions {
  simulateError?: boolean;
  delayMs?: number;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Preview-only submission.
 * Never sends data to an external endpoint.
 */
export async function mockSubmitForm(
  schema: FormSchema,
  values: FormValues,
  options: MockSubmitOptions = {},
): Promise<MockSubmitResult> {
  const delayMs = options.delayMs ?? 250;
  await wait(delayMs);

  const action = schema.submission.action.trim();
  const method = schema.submission.method;

  if (options.simulateError) {
    return {
      status: "error",
      method,
      action,
      messageKey: "preview.submission.forcedError",
    };
  }

  return {
    status: "success",
    method,
    action,
    values,
  };
}
