// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'
// https://eslint.nuxt.com/packages/module
export default withNuxt(
  antfu({
    unocss: true,
  }),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
