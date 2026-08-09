import type { FieldType, FieldValidation, HttpMethod } from "@/domain/form-schema";

export const TEMPLATE_CATEGORIES = ["general", "business", "feedback"] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

export interface TemplateOptionSpec {
  label: string;
  value: string;
}

export interface TemplateFieldSpec {
  type: FieldType;
  label: string;
  name?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  validation?: FieldValidation;
  options?: TemplateOptionSpec[];
}

export interface FormTemplateDefinition {
  id: string;
  category: TemplateCategory;
  nameKey: string;
  descriptionKey: string;
  defaultFormName: string;
  defaultFormDescription: string;
  fields: TemplateFieldSpec[];
  submission: {
    action: string;
    method: HttpMethod;
  };
}
