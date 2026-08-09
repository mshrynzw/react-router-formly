import type { FormField } from "@/domain/form-schema";

export function getFieldDomId(field: FormField): string {
  return `field_${field.id}`;
}

export function getOptionDomId(field: FormField, optionId: string): string {
  return `${getFieldDomId(field)}_${optionId}`;
}
