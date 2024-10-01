const translator = require("open-google-translator");

module.exports = (on, config) => {
    on('task', {
        translateMultiple({ listOfWordsToTranslate, fromLanguage, toLanguage }) {
            return translator
                .TranslateLanguageData({
                    listOfWordsToTranslate,
                    fromLanguage,
                    toLanguage,
                })
                .then((data) => {
                    return data;  // Return translated data back to Cypress
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
    });
};
