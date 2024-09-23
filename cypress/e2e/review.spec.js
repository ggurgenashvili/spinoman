describe('review page', () => {
    it('review', () => {
        cy.visitSpinoman()
        cy.get('p').contains('Reviews').click()
        cy.get('button').contains(' Top Games ').click()
        cy.get('a').contains(' SHOW ALL ').click()
        cy.get('button').eq(2).click()
        cy.get('button').contains('WRITE A REVIEW').click()

        cy.wait(4000)
        cy.get('[placeholder="Write your opinion"]').type('MY OPINION')
        cy.get('.score').eq(4).click()
        cy.get('button').contains('SUBMIT').click()

    });
})