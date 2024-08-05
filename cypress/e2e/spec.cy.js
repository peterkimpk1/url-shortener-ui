describe('empty spec', () => {
  beforeEach(() => {
    cy.fixture('example').then((json) => {
      cy.intercept('http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        fixture: 'example.json'
      })
    }).as('getURLs')
    cy.visit('http://localhost:3000')
  })
  it('When a user visits the page, they can view the page title, form and the existing shortened URLs', () => {
    cy.get('h1').should('contain.text', 'URL Shortener')
    cy.get('[placeholder="Title..."]').should('exist')
    cy.get('[placeholder="URL to Shorten..."]').should('exist')
    cy.get('form > button').should('exist')
    cy.get('form').should('exist')
    cy.get('section .url').should('have.length',2)
  })
  it('When a user fills out the form, the information is reflected in the input field values', () => {

    cy.get('[placeholder="Title..."]').type('exist')
    cy.get('[placeholder="Title..."]').should('have.value','exist')
    cy.get('[placeholder="URL to Shorten..."]').type('http://www.google.com')
    cy.get('[placeholder="URL to Shorten..."]').should('have.value','http://www.google.com')
  })
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {

    cy.get('[placeholder="Title..."]').type('exist')
    cy.get('[placeholder="URL to Shorten..."]').type('http://www.google.com')
    cy.fixture('postURL').then((json) => {
      cy.intercept('http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        fixture:'postURL.json'
      })
    })
    cy.get('form > button').click()
    cy.get('section .url').last().should('exist')
  })
  it('should display a fill out all fields message if title or url is empty. Also should not make a POST request on error', () => {

    cy.get('[placeholder="Title..."]').type('test')
    cy.get('form > button').click()
    cy.get('.form-error').should('contain.text','Please fill out all input fields')
    cy.get('section .url').should('have.length',2)
  })
  it('should display a failed to fetch error message if network is unavailable', () => {
    cy.fixture('example').then((json) => {
      cy.intercept('http://localhost:3001/api/v1/urls', {
        statusCode: 404,
        fixture: 'example.json'
      })
    })
    cy.get('h2').should('contain.text','could not fetch')
  })
  it('should be able to submit after an error message and unshow the error message', () => {
    cy.wait('@getURLs')
    cy.get('[placeholder="Title..."]').type('title')
    cy.get('form > button').click()
    cy.get('.form-error').should('contain.text','Please fill out all input fields')
    cy.get('[placeholder="URL to Shorten..."]').type('http://www.google.com')
    cy.fixture('postURL').then((json) => {
      cy.intercept('http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        fixture:'postURL.json'
      })
    })
    cy.get('form > button').click()
    cy.get('.form-error').should('not.exist')
  })
  it('should be able to delete a url', () => {
    cy.intercept('http://localhost:3001/api/v1/urls/2', {
      method: 'DELETE',
      fixture:'deleteURL'
    })
    cy.get('.url-wrapper > :nth-child(2) > button').click()
    cy.get('section .url').should('have.length',1)
  })
})

