const { defineConfig } = require('cypress')
const translator = require("open-google-translator");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    // Configure your E2E tests here
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // Register the 'translateMultiple' task
      on('task', {
        translateMultiple({ listOfWordsToTranslate, fromLanguage, toLanguage }) {
          return translator
              .TranslateLanguageData({
                listOfWordsToTranslate,
                fromLanguage,
                toLanguage,
              })
              .then((data) => {
                return data;  // Return the translated data
              })
              .catch((err) => {
                throw new Error(err);
              });
        }
      });

      return config;
    }
  },
})