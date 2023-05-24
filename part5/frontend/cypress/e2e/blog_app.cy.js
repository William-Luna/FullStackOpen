describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Please log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User has logged in successfully')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong Credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})