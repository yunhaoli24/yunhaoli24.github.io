import extractorMdc from '@unocss/extractor-mdc'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWind4({
      reset: false,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  extractors: [
    extractorMdc(),
  ],
})
