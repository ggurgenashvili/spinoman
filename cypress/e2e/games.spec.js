describe('game page', () => {
    it('search in games', () => {
        cy.visitSpinoman()
        cy.get('p').contains('Games').click()
        cy.wait(4000)
        cy.get('[placeholder="Search..."]').type('todo')
        cy.wait(4000)
        cy.get('.modal').find('a').eq(1).click()

        //i have problem with iframe or there is iframe bug on Spinoman

    })


    it('see all and show more buttons', () => {
        cy.visitSpinoman()
        cy.get('p').contains('Games').click()
        cy.get('.navigation__content').contains('Crash Games').click()
        cy.get('button').contains('SHOW MORE').click()

        //long version
        // cy.get('.games-list').find('a').contains('SEE ALL').click()

        //es easy aris
        cy.get('.games-list__see-all').click()
        // cy.get('.search__title').contains(' All ').click()
        cy.get('.search').eq(1).find('span').contains('All').click()



    })

    it.only('search after browser resize and delete text in search', () => {
        cy.visitSpinoman()
        cy.get('p').contains('Games').click()
        cy.get('[placeholder="Search..."]').type('todo')
        cy.get('[alt="close"]').click()

    })
    it('game on mobile', () => {
        cy.viewport(412, 915)
        cy.visitSpinoman()
        cy.get('.header__burger-menu-toggle').click()
        cy.get('.burger-menu__list', { timeout: 10000 }) // Increase timeout
            .should('be.visible')
            .find('p').contains('Live Games').click()
    })

})