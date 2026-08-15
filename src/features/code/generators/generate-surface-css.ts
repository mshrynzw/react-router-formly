import {
  getBackdropCssImage,
  getBackdropExportPath,
  getGlassBackdropBlur,
  getGlassInsetShadow,
  getLiquidGlassFilterId,
  getLiquidGlassPreset,
  isLiquidGlassEnabled,
} from "@/domain/form-schema/liquid-glass";
import type { FormSchema } from "@/domain/form-schema/types";

export function generateSurfaceCss(
  schema: FormSchema,
  kind: "app" | "export" = "export",
): string {
  const appearance = schema.appearance;
  const glassOn = isLiquidGlassEnabled(appearance);
  const backdropOn = appearance.backdropVisible;
  const preset = getLiquidGlassPreset(appearance.liquidGlass);

  if (!glassOn && !backdropOn) {
    return "";
  }

  const blocks: string[] = [];

  if (backdropOn) {
    blocks.push(`/* Copy ${getBackdropExportPath(appearance.backdropId)} next to this stylesheet when hosting outside Formly. */
.formly-page--backdrop {
  min-height: 100vh;
  background-image: ${getBackdropCssImage(appearance.backdropId, kind)};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}`);
  }

  if (glassOn && preset) {
    const filterId = getLiquidGlassFilterId(schema.id);
    const inset = getGlassInsetShadow(preset);
    const frost = getGlassBackdropBlur(preset);

    blocks.push(`.formly-form--glass {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  box-shadow: var(--formly-shadow), 0px 0px 21px -8px rgba(255, 255, 255, 0.3);
}

.formly-glass-svg {
  position: absolute;
  width: 0;
  height: 0;
}

.formly-form--glass::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: transparent;
  box-shadow: ${inset};
  pointer-events: none;
}

.formly-form--glass::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  backdrop-filter: ${frost};
  -webkit-backdrop-filter: ${frost};
  filter: url(#${filterId});
  -webkit-filter: url(#${filterId});
  isolation: isolate;
  pointer-events: none;
}

.formly-form--glass > .formly-form-header,
.formly-form--glass > .formly-fields,
.formly-form--glass > .formly-success,
.formly-form--glass > .formly-form-error {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .formly-form--glass::after {
    filter: none;
    -webkit-filter: none;
  }
}`);
  }

  return blocks.length > 0 ? `\n${blocks.join("\n\n")}\n` : "";
}
