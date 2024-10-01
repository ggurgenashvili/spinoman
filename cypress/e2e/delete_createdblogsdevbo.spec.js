describe('Create blog on dev-bo.spinoman', () => {

    it('authenticates with a cookie, translates text, and accesses the dashboard', () => {

        for (let i = 0; i < 20; i++) {

            cy.setCookie('dev-auth', 'NDg3ZDY2NzEwMmIxNDlkODgyN2NmNWE2MTdmOGEwNTE4ZWZiYjhlNWE5M2Y0ZmM1OWE4ZGM2OWJmMjFkM2YyZA==');  // Replace with your actual cookie name and value
            cy.setCookie('dev-bo-gw', '322a14d9dc434ef7917803a94b96fa78e0b33a71cf8241848985dd0a86c26f82');  // Replace with your actual cookie name and value

            cy.visit('https://dev-bo.spinoman.com/apps/bo/dashboard')

            cy.get('.v-list-item-title').contains('რესურსები').click();
            cy.get('a').contains('ტექს-რესურსები').should('be.visible').click();
            cy.get('div').contains('წაშლა').click()
            cy.get('button').contains('კი').should('be.visible').click()

        }
    })
})