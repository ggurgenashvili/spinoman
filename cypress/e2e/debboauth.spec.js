import {sentence, article, paragraph, lorem} from "txtgen";

describe('Create blog on dev-bo.spinoman', () => {

    it('authenticates with a cookie, translates text, and accesses the dashboard', () => {
        cy.setCookie('dev-auth', 'ZWYyZTQzNTIyMjIzNGZmYWEyMDk5MGY4MWRkMmRiNzljYzFiOGE4NmJkYjY0ZDAxOGE1NDBmMWFmNjI3ZTM1Nw==');  // Replace with your actual cookie name and value
        cy.setCookie('dev-bo-gw', '4147e31bf07c4c50a1930a345a1324466e96a207255042f19eeef87ef15e66ce');  // Replace with your actual cookie name and value
        cy.visit('https://dev-bo.spinoman.com/apps/bo/dashboard');
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(Math.random() * 10000);

            const title = createTextResource('title', lorem(10, 20), randomNumber);
            const content = createTextResource('content', paragraph(2), randomNumber);
            const short_descr = createTextResource('short_descr', sentence(), randomNumber);
            const media = 'giosblog';
            cy.wait(20000)
            console.log(title)
            createBlog(title, media, content, short_descr, "", [1], 'PUBLISHED').then((response) => {
                // Assertions after creating the blog
                expect(response.status).to.eq(201); // Check for successful creation
                // expect(response.body).to.have.property('title', title); // Ensure the response has the correct title
            });
        }
    });
});

function createTextResource(type, text, rand_num) {
    // Generate random text
    const randomText = `blog_example_${rand_num}_${type}`;
    const randomTextEng = `${text}`;

    // Translate the English text into Russian and Georgian
    cy.task('translateMultiple', {
        listOfWordsToTranslate: [randomTextEng],
        fromLanguage: 'en',
        toLanguage: 'ru'
    }).then((translatedToRus) => {
        cy.task('translateMultiple', {
            listOfWordsToTranslate: [randomTextEng],
            fromLanguage: 'en',
            toLanguage: 'ka'
        }).then((translatedToGeo) => {
            const randomTextRus = translatedToRus[0]; // Translated to Russian
            const randomTextGeo = translatedToGeo[0]; // Translated to Georgian


            cy.get('.v-list-item-title').contains('რესურსები').click();
            cy.get('a').contains('ტექს-რესურსები').should('be.visible').click();
            cy.get('.v-btn__content').contains(' ახალი ჩანაწერის დამატება').click();

            cy.get('[placeholder="კოდი"]').type(randomText);
            cy.get('[placeholder="Content for en"]').type(randomTextEng);
            cy.get('[placeholder="Content for ru"]').type(randomTextRus.translation);
            cy.get('[placeholder="Content for ka"]').type(randomTextGeo.translation);

            cy.get('button').contains('ახალი ჩანაწერის დამატება').click();
        });
    });
    return randomText;
}

function createBlog(title, media, content, short_descr, publicationDate, categoryIds = [], visibility = "NOT_PUBLISHED") {
    return cy.request({
        method: 'POST',
        url: 'https://dev-bo.spinoman.com/back-office/content/api/bo/blogs',
        body: {
            title,
            media,
            shortDescription: short_descr,
            content,
            categoryIds,
            visibility
        },
        failOnStatusCode: false // Allows you to handle 400 errors without failing the test
    })
}