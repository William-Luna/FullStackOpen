describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Test User',
      username: 'test',
      password: 'password'
    }

    const user2 = {
      name: 'Guest User',
      username: 'guestuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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
        .and('contain', 'Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'password' })
      cy.createBlog({ title: 'Init Title', author: 'Init Author', url: 'Init Url' })
    })

    it('A blog can be created', function () {
      cy.get('.showButton').click()
      cy.get('.form-title').type('test title')
      cy.get('.form-author').type('test author')
      cy.get('.form-url').type('test url')
      cy.get('.form-submitButton').click()

      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('contain', 'Blog "test title" has been added')
      cy.contains('test title by test author ').parent().find('.viewbutton').click()
      cy.get('.blogexpanded:last').contains('Submitted by Test User')
    })

    it('A blog can be liked', function () {
      cy.get('.viewbutton').click()
      cy.get('.likebutton').click()
      cy.get('.likes').contains('1')
      cy.get('.likebutton').click()
      cy.get('.likes').contains('2')
    })

    it('A blog can be deleted', function () {
      cy.get('.viewbutton').click().parent().get('.deletebutton').click()
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('contain', 'Blog "Init Title" has been deleted')
      cy.get('.blog').should('not.exist')
    })

    it('A blog cannot be deleted by a different user from who created it', function () {
      cy.get('.viewbutton').click().parent().get('.deletebutton').should('be.visible')
      cy.get('.logoutbutton').click()
      cy.login({ username: 'guestuser', password: 'password' })
      cy.get('.viewbutton').click().parent().get('.deletebutton').should('not.be.visible')
    })
  })
})