import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWind4({
      preflights: {
        reset: false,
      },
    }),
    presetTypography(),
  ],
})
