import type { FormField, FormSchema } from "@/domain/form-schema";
import {
  generateLiquidGlassSvg,
  getLiquidGlassFilterId,
  getLiquidGlassPreset,
  isLiquidGlassEnabled,
} from "@/domain/form-schema/liquid-glass";

import { escapeHtml, escapeHtmlAttr } from "@/features/code/generators/escape";
import { getFieldDomId, getOptionDomId } from "@/features/code/generators/field-id";
import {
  getFormHtmlClassNames,
  type FormHtmlClassNames,
} from "@/features/code/generators/html-classes";

function indent(level: number, line: string): string {
  return `${"  ".repeat(level)}${line}`;
}

function renderLabel(
  field: FormField,
  forId: string | null,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  const labelText = escapeHtml(field.label || "Untitled field");
  const required = field.required
    ? ` <span class="${classNames.required}" aria-hidden="true">*</span><span class="formly-sr-only"> (required)</span>`
    : "";

  if (forId) {
    return [
      indent(
        level,
        `<label class="${classNames.label}" for="${escapeHtmlAttr(forId)}">${labelText}${required}</label>`,
      ),
    ];
  }

  return [indent(level, `<div class="${classNames.label}">${labelText}${required}</div>`)];
}

function renderDescription(
  field: FormField,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  if (!field.description.trim()) {
    return [];
  }

  return [
    indent(
      level,
      `<p class="${classNames.descriptionText}" id="${escapeHtmlAttr(getFieldDomId(field))}-description">${escapeHtml(field.description)}</p>`,
    ),
  ];
}

function renderError(field: FormField, level: number, classNames: FormHtmlClassNames): string[] {
  return [
    indent(
      level,
      `<p class="${classNames.error}" data-error-for="${escapeHtmlAttr(field.name)}" id="${escapeHtmlAttr(getFieldDomId(field))}-error" hidden></p>`,
    ),
  ];
}

function describedBy(field: FormField): string {
  const ids: string[] = [];
  if (field.description.trim()) {
    ids.push(`${getFieldDomId(field)}-description`);
  }
  ids.push(`${getFieldDomId(field)}-error`);
  return ids.join(" ");
}

function validationAttrs(field: FormField): string[] {
  const attrs: string[] = [];

  if (field.required) {
    attrs.push("required");
  }

  if (field.validation.minLength !== undefined) {
    attrs.push(`minlength="${field.validation.minLength}"`);
  }

  if (field.validation.maxLength !== undefined) {
    attrs.push(`maxlength="${field.validation.maxLength}"`);
  }

  if (field.validation.min !== undefined) {
    attrs.push(`min="${field.validation.min}"`);
  }

  if (field.validation.max !== undefined) {
    attrs.push(`max="${field.validation.max}"`);
  }

  if (field.validation.step !== undefined) {
    attrs.push(`step="${field.validation.step}"`);
  }

  if (field.validation.pattern) {
    attrs.push(`pattern="${escapeHtmlAttr(field.validation.pattern)}"`);
  }

  return attrs;
}

function renderTextLikeField(
  field: FormField,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  const id = getFieldDomId(field);
  const lines = [
    indent(
      level,
      `<div class="${classNames.field}" data-field-name="${escapeHtmlAttr(field.name)}" data-field-type="${field.type}">`,
    ),
    ...renderLabel(field, id, level + 1, classNames),
    ...renderDescription(field, level + 1, classNames),
  ];

  if (field.type === "textarea") {
    const attrs = [
      `id="${escapeHtmlAttr(id)}"`,
      `name="${escapeHtmlAttr(field.name)}"`,
      `class="${classNames.control}"`,
      `aria-describedby="${escapeHtmlAttr(describedBy(field))}"`,
      ...validationAttrs(field),
    ];
    if (field.placeholder) {
      attrs.push(`placeholder="${escapeHtmlAttr(field.placeholder)}"`);
    }
    lines.push(indent(level + 1, `<textarea ${attrs.join(" ")}></textarea>`));
  } else {
    const attrs = [
      `id="${escapeHtmlAttr(id)}"`,
      `name="${escapeHtmlAttr(field.name)}"`,
      `type="${field.type}"`,
      `class="${classNames.control}"`,
      `aria-describedby="${escapeHtmlAttr(describedBy(field))}"`,
      ...validationAttrs(field),
    ];
    if (field.placeholder) {
      attrs.push(`placeholder="${escapeHtmlAttr(field.placeholder)}"`);
    }
    lines.push(indent(level + 1, `<input ${attrs.join(" ")} />`));
  }

  lines.push(...renderError(field, level + 1, classNames));
  lines.push(indent(level, "</div>"));
  return lines;
}

function renderSelectField(
  field: Extract<FormField, { type: "select" }>,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  const id = getFieldDomId(field);
  const lines = [
    indent(
      level,
      `<div class="${classNames.field}" data-field-name="${escapeHtmlAttr(field.name)}" data-field-type="select">`,
    ),
    ...renderLabel(field, id, level + 1, classNames),
    ...renderDescription(field, level + 1, classNames),
  ];

  const attrs = [
    `id="${escapeHtmlAttr(id)}"`,
    `name="${escapeHtmlAttr(field.name)}"`,
    `class="${classNames.control}"`,
    `aria-describedby="${escapeHtmlAttr(describedBy(field))}"`,
    ...validationAttrs(field),
  ];

  lines.push(indent(level + 1, `<select ${attrs.join(" ")}>`));
  lines.push(
    indent(
      level + 2,
      `<option value="">${escapeHtml(field.placeholder || "Select an option")}</option>`,
    ),
  );

  for (const option of field.options) {
    lines.push(
      indent(
        level + 2,
        `<option value="${escapeHtmlAttr(option.value)}">${escapeHtml(option.label)}</option>`,
      ),
    );
  }

  lines.push(indent(level + 1, "</select>"));
  lines.push(...renderError(field, level + 1, classNames));
  lines.push(indent(level, "</div>"));
  return lines;
}

function renderRadioField(
  field: Extract<FormField, { type: "radio" }>,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  const lines = [
    indent(
      level,
      `<fieldset class="${classNames.fieldset}" data-field-name="${escapeHtmlAttr(field.name)}" data-field-type="radio">`,
    ),
    indent(
      level + 1,
      `<legend class="${classNames.label}">${escapeHtml(field.label || "Untitled field")}${field.required ? ` <span class="${classNames.required}" aria-hidden="true">*</span>` : ""}</legend>`,
    ),
    ...renderDescription(field, level + 1, classNames),
    indent(level + 1, `<div class="${classNames.options}" role="presentation">`),
  ];

  for (const option of field.options) {
    const optionId = getOptionDomId(field, option.id);
    lines.push(
      indent(level + 2, `<label class="${classNames.option}" for="${escapeHtmlAttr(optionId)}">`),
    );
    lines.push(
      indent(
        level + 3,
        `<input id="${escapeHtmlAttr(optionId)}" type="radio" name="${escapeHtmlAttr(field.name)}" value="${escapeHtmlAttr(option.value)}"${field.required ? " required" : ""} />`,
      ),
    );
    lines.push(indent(level + 3, `<span>${escapeHtml(option.label)}</span>`));
    lines.push(indent(level + 2, "</label>"));
  }

  lines.push(indent(level + 1, "</div>"));
  lines.push(...renderError(field, level + 1, classNames));
  lines.push(indent(level, "</fieldset>"));
  return lines;
}

function renderCheckboxField(
  field: Extract<FormField, { type: "checkbox" }>,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  if (field.options.length === 0) {
    const id = getFieldDomId(field);
    return [
      indent(
        level,
        `<div class="${classNames.field}" data-field-name="${escapeHtmlAttr(field.name)}" data-field-type="checkbox">`,
      ),
      indent(level + 1, `<label class="${classNames.option}" for="${escapeHtmlAttr(id)}">`),
      indent(
        level + 2,
        `<input id="${escapeHtmlAttr(id)}" type="checkbox" name="${escapeHtmlAttr(field.name)}" value="true"${field.required ? " required" : ""} aria-describedby="${escapeHtmlAttr(describedBy(field))}" />`,
      ),
      indent(
        level + 2,
        `<span>${escapeHtml(field.label || "Untitled field")}${field.required ? ` <span class="${classNames.required}" aria-hidden="true">*</span>` : ""}</span>`,
      ),
      indent(level + 1, "</label>"),
      ...renderDescription(field, level + 1, classNames),
      ...renderError(field, level + 1, classNames),
      indent(level, "</div>"),
    ];
  }

  const lines = [
    indent(
      level,
      `<fieldset class="${classNames.fieldset}" data-field-name="${escapeHtmlAttr(field.name)}" data-field-type="checkbox-group">`,
    ),
    indent(
      level + 1,
      `<legend class="${classNames.label}">${escapeHtml(field.label || "Untitled field")}${field.required ? ` <span class="${classNames.required}" aria-hidden="true">*</span>` : ""}</legend>`,
    ),
    ...renderDescription(field, level + 1, classNames),
    indent(level + 1, `<div class="${classNames.options}" role="presentation">`),
  ];

  for (const option of field.options) {
    const optionId = getOptionDomId(field, option.id);
    lines.push(
      indent(level + 2, `<label class="${classNames.option}" for="${escapeHtmlAttr(optionId)}">`),
    );
    lines.push(
      indent(
        level + 3,
        `<input id="${escapeHtmlAttr(optionId)}" type="checkbox" name="${escapeHtmlAttr(field.name)}" value="${escapeHtmlAttr(option.value)}" />`,
      ),
    );
    lines.push(indent(level + 3, `<span>${escapeHtml(option.label)}</span>`));
    lines.push(indent(level + 2, "</label>"));
  }

  lines.push(indent(level + 1, "</div>"));
  lines.push(...renderError(field, level + 1, classNames));
  lines.push(indent(level, "</fieldset>"));
  return lines;
}

function renderSubmitField(
  field: Extract<FormField, { type: "submit" }>,
  level: number,
  classNames: FormHtmlClassNames,
): string[] {
  const label = escapeHtml(field.label || "Submit");
  return [
    indent(level, `<div class="${classNames.actions}">`),
    indent(level + 1, `<button type="submit" class="${classNames.submit}">${label}</button>`),
    indent(level, "</div>"),
  ];
}

function renderField(field: FormField, level: number, classNames: FormHtmlClassNames): string[] {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "textarea":
      return renderTextLikeField(field, level, classNames);
    case "select":
      return renderSelectField(field, level, classNames);
    case "radio":
      return renderRadioField(field, level, classNames);
    case "checkbox":
      return renderCheckboxField(field, level, classNames);
    case "submit":
      return renderSubmitField(field, level, classNames);
  }
}

export function generateFormHtml(schema: FormSchema): string {
  const classNames = getFormHtmlClassNames(schema);
  const action = schema.submission.action.trim();
  const method = schema.submission.method;
  const title = escapeHtml(schema.name || "Untitled form");

  const lines: string[] = [
    `<!-- Generated by Formly -->`,
    `<form class="${classNames.form}" method="${method}"${action ? ` action="${escapeHtmlAttr(action)}"` : ""} novalidate data-formly-form>`,
  ];

  if (isLiquidGlassEnabled(schema.appearance)) {
    const preset = getLiquidGlassPreset(schema.appearance.liquidGlass);
    if (preset) {
      lines.push(indent(1, generateLiquidGlassSvg(getLiquidGlassFilterId(schema.id), preset)));
    }
  }

  lines.push(indent(1, `<div class="${classNames.header}">`));
  lines.push(indent(2, `<h2 class="${classNames.title}">${title}</h2>`));

  if (schema.description.trim()) {
    lines.push(
      indent(2, `<p class="${classNames.description}">${escapeHtml(schema.description)}</p>`),
    );
  }

  lines.push(indent(1, `</div>`));
  lines.push(indent(1, `<div class="${classNames.fields}">`));

  for (const field of schema.fields) {
    lines.push(...renderField(field, 2, classNames));
  }

  lines.push(indent(1, `</div>`));
  lines.push(
    indent(1, `<div class="${classNames.success}" data-formly-success hidden role="status"></div>`),
  );
  lines.push(
    indent(
      1,
      `<div class="${classNames.formError}" data-formly-form-error hidden role="alert"></div>`,
    ),
  );
  lines.push(`</form>`);

  return `${lines.join("\n")}\n`;
}
