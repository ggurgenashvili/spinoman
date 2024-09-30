describe('blog page', () => {
    it('see blog. write comment and like blog', () => {
        cy.visitSpinoman()
        cy.get('p').contains('Blog').click()
        cy.wait(4000)
        cy.get('.blog').find('button').contains('MORE DETAILS ').click()


        //write a comment on a blog
        cy.get('[placeholder="Write your opinion"]').type('good game{enter}')

        //like blog
        cy.get('.container__like').find('img').eq(0).click()
    })
})