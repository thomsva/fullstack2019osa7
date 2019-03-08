describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Iines Hiiri',
      username: 'iines',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
      .type('iines')
    cy.get('#password')
      .type('secret')
    cy.contains('kirjaudu')
      .click()
    cy.contains('Iines Hiiri logged in')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Log in')
        .click()
      cy.get('#username')
        .type('iines')
      cy.get('#password')
        .type('secret')
      cy.contains('kirjaudu')
        .click()
    })

    it('user can add new blog', function () {
      cy.contains('new blog')
        .click()
      cy.get('#author')
        .type('Roope Ankka')
      cy.get('#title')
        .type('Money Money Money')
      cy.get('#url')
        .type('rich.com')
      cy.contains('save')
        .click()
      cy.contains('Money Money Money')
    })
  })
})



