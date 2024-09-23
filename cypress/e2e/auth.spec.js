describe('spinoman', () => {
  it('auth with credentials', () => {
      cy.visitSpinoman()
      cy.get('button').contains('LOG IN').click()



  })
})