import { z } from "zod";

import { FIELD_TYPES, FORM_SCHEMA_VERSION, HTTP_METHODS } from "@/domain/form-schema/types";

/** Maximum number of fields accepted in a Form Schema (including submit). */
export const MAX_FORM_FIELDS = 100;

const fieldOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  value: z.string(),
});

const fieldValidationSchema = z.object({
  minLength: z.number().int().nonnegative().optional(),
  maxLength: z.number().int().nonnegative().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().optional(),
  step: z.number().positive().optional(),
});

const baseFieldSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  label: z.string(),
  description: z.string(),
  placeholder: z.string(),
  required: z.boolean(),
  validation: fieldValidationSchema,
});

const textFieldSchema = baseFieldSchema.extend({
  type: z.literal("text"),
});

const emailFieldSchema = baseFieldSchema.extend({
  type: z.literal("email"),
});

const numberFieldSchema = baseFieldSchema.extend({
  type: z.literal("number"),
});

const textareaFieldSchema = baseFieldSchema.extend({
  type: z.literal("textarea"),
});

const selectFieldSchema = baseFieldSchema.extend({
  type: z.literal("select"),
  options: z.array(fieldOptionSchema),
});

const radioFieldSchema = baseFieldSchema.extend({
  type: z.literal("radio"),
  options: z.array(fieldOptionSchema),
});

const checkboxFieldSchema = baseFieldSchema.extend({
  type: z.literal("checkbox"),
  options: z.array(fieldOptionSchema),
});

const submitFieldSchema = baseFieldSchema.extend({
  type: z.literal("submit"),
});

export const formFieldSchema = z.discriminatedUnion("type", [
  textFieldSchema,
  emailFieldSchema,
  numberFieldSchema,
  textareaFieldSchema,
  selectFieldSchema,
  radioFieldSchema,
  checkboxFieldSchema,
  submitFieldSchema,
]);

export const formSubmissionSchema = z.object({
  action: z.string(),
  method: z.enum(HTTP_METHODS),
});

export const formSchemaSchema = z.object({
  version: z.literal(FORM_SCHEMA_VERSION),
  id: z.string().min(1),
  name: z.string().max(200),
  description: z.string().max(2000),
  fields: z.array(formFieldSchema).max(MAX_FORM_FIELDS),
  submission: formSubmissionSchema,
});

export function parseFormSchema(data: unknown) {
  return formSchemaSchema.safeParse(data);
}

export function assertFieldType(value: string): value is (typeof FIELD_TYPES)[number] {
  return (FIELD_TYPES as readonly string[]).includes(value);
}
