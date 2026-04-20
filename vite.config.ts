import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["app/**"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: false,
    },
  },
  test: {
    passWithNoTests: true,
  },
});
