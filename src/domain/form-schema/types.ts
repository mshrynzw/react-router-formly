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

export const CSS_FLAVORS = ["css", "tailwind"] as const;

export type CssFlavor = (typeof CSS_FLAVORS)[number];

export const FONT_FAMILIES = ["system", "sans", "serif", "mono", "rounded"] as const;

export type FontFamilyId = (typeof FONT_FAMILIES)[number];

export const SHADOW_LEVELS = ["none", "sm", "md"] as const;

export type ShadowLevel = (typeof SHADOW_LEVELS)[number];

export const LIQUID_GLASS_IDS = [
  "off",
  "crystal",
  "amber",
  "ice",
  "mercury",
  "ocean",
  "mist",
  "molten",
  "silk",
  "plasma",
  "frost",
  "aurora",
  "nebula",
] as const;

export type LiquidGlassId = (typeof LIQUID_GLASS_IDS)[number];

export const LIQUID_GLASS_PRESET_IDS = LIQUID_GLASS_IDS.filter(
  (id): id is Exclude<LiquidGlassId, "off"> => id !== "off",
);

export const BACKDROP_IDS = ["01", "02", "03", "04", "05", "06"] as const;

export type BackdropId = (typeof BACKDROP_IDS)[number];

export const APPEARANCE_COLOR_KEYS = [
  "pageBackground",
  "formBackground",
  "inputBackground",
  "text",
  "muted",
  "border",
  "accent",
  "accentHover",
  "submitText",
  "danger",
  "success",
] as const;

export type AppearanceColorKey = (typeof APPEARANCE_COLOR_KEYS)[number];

export type AppearanceColors = Record<AppearanceColorKey, string>;

export interface FormAppearance {
  cssFlavor: CssFlavor;
  colors: AppearanceColors;
  radius: {
    form: number;
    control: number;
  };
  typography: {
    fontFamily: FontFamilyId;
    bodySize: number;
    titleSize: number;
  };
  spacing: {
    padding: number;
    fieldGap: number;
    maxWidth: number;
  };
  shadow: ShadowLevel;
  liquidGlass: LiquidGlassId;
  backdropVisible: boolean;
  backdropId: BackdropId;
}

export interface FormSchema {
  version: typeof FORM_SCHEMA_VERSION;
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  submission: FormSubmission;
  appearance: FormAppearance;
}

export function hasOptions(field: FormField): field is SelectField | RadioField | CheckboxField {
  return field.type === "select" || field.type === "radio" || field.type === "checkbox";
}
