describe('home spec', () => {
  it('home wb dev esta online', () => {
    cy.visit('localhost:3000')

    cy.get('h1').should('have.text', 'Semeando esperança, colhendo sorrisos')
  })
})