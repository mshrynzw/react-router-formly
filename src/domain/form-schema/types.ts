export const FORM_SCHEMA_VERSION = 1 as const;

export const FIELD_TYPES = [
  "text",
  "email",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "submit",
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

export const HTTP_METHODS = ["GET", "POST"] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  step?: number;
}

interface BaseField {
  id: string;
  name: string;
  label: string;
  description: string;
  placeholder: string;
  required: boolean;
  validation: FieldValidation;
}

export interface TextField extends BaseField {
  type: "text";
}

export interface EmailField extends BaseField {
  type: "email";
}

export interface NumberField extends BaseField {
  type: "number";
}

export interface TextareaField extends BaseField {
  type: "textarea";
}

export interface SelectField extends BaseField {
  type: "select";
  options: FieldOption[];
}

export interface RadioField extends BaseField {
  type: "radio";
  options: FieldOption[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options: FieldOption[];
}

export interface SubmitField extends BaseField {
  type: "submit";
}

export type FormField =
  | TextField
  | EmailField
  | NumberField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | SubmitField;

export interface FormSubmission {
  action: string;
  method: HttpMethod;
}

export interface FormSchema {
  version: typeof FORM_SCHEMA_VERSION;
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  submission: FormSubmission;
}

export function hasOptions(
  field: FormField,
): field is SelectField | RadioField | CheckboxField {
  return field.type === "select" || field.type === "radio" || field.type === "checkbox";
}
