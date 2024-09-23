const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    // Configure your E2E tests here
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
  },
})