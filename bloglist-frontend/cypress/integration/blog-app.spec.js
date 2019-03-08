describe('Blog ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('BLOGS')
  })

  it('login form can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.contains('Log in')
      .click()
    cy.get('#username')
      .type('aku')
    cy.get('#password')
      .type('123')
    cy.contains('kirjaudu')
      .click()
    cy.contains('Aku Hiiri logged in')
  })

})



