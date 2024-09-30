describe('Spinoman', () => {
    for (let i = 0; i < 20; i++) {
        it('authenticates with a cookie and accesses the dashboard', () => {
            // Set up your authentication cookie
            cy.setCookie('dev-auth', 'Zjc5ZWFiYzI2OGExNDljYmE1NmY1NGJhOWM1YThlNGE5M2U2ZjYzYjVhNzU0Nzk2ODUyMGM4N2FjM2U5ZTk2ZA==');  // Replace with your actual cookie name and value
            cy.setCookie('dev-bo-gw', '1e75776b393e4821a4ba5713594f3fae78affad99f4a47998bd101fe209bc61e');  // Replace with your actual cookie name and value

            // Visit the dashboard page
            cy.visit('https://dev-bo.spinoman.com/apps/bo/dashboard');


            const randomNumber = Math.floor(Math.random() * 10000);
            const randomText = `blogexample${randomNumber}`;
            const randomTextEng = `blog in english${randomNumber}`
            const randomTextRus = `блოგпо русски${randomNumber}`
            const randomTextGeo = `ბლოგი ქართულაააად${randomNumber}`


            cy.get('.v-list-item-title').contains('რესურსები').click()
            cy.get('a').contains('ტექს-რესურსები').should('be.visible').click()
            cy.get('.v-btn__content').contains(' ახალი ჩანაწერის დამატება').click()

            cy.get('[placeholder="კოდი"]').type(randomText)
            // cy.get('[placeholder="კოდი"]').should('have.value', randomText);

            cy.get('[placeholder="Content for en"]').type(randomTextEng)

            cy.get('[placeholder="Content for ru"]').type(randomTextRus)

            cy.get('[placeholder="Content for ka"]').type(randomTextGeo)

            cy.get('button').contains('ახალი ჩანაწერის დამატება').click()


        });
    }
});
