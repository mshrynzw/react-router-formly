import {
  getGlassBackdropBlur,
  getGlassInsetShadow,
  getLiquidGlassPreset,
  sanitizeFilterId,
  type FormAppearance,
} from "@/domain/form-schema";

interface PreviewGlassLayersProps {
  appearance: FormAppearance;
  filterId: string;
}

export function PreviewGlassLayers({ appearance, filterId }: PreviewGlassLayersProps) {
  const preset = getLiquidGlassPreset(appearance.liquidGlass);
  if (!preset) {
    return null;
  }

  const id = sanitizeFilterId(filterId);
  const frequency = `${preset.baseFrequency} ${preset.baseFrequency}`;
  const frost = getGlassBackdropBlur(preset);

  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      >
        <defs>
          <filter
            id={id}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={frequency}
              numOctaves={preset.octaves}
              seed={preset.seed}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={preset.noiseBlur} result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale={preset.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: "inherit",
          boxShadow: getGlassInsetShadow(preset),
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 motion-reduce:[filter:none] motion-reduce:[-webkit-filter:none]"
        style={{
          borderRadius: "inherit",
          isolation: "isolate",
          backdropFilter: frost,
          WebkitBackdropFilter: frost,
          filter: `url(#${id})`,
        }}
      />
    </>
  );
}
