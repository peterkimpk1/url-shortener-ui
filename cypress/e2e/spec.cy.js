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
    cy.get('button').should('exist')
    cy.get('form').should('exist')
    cy.get('section .url').should('have.length',2)
  })
  it('When a user fills out the form, the information is reflected in the input field values', () => {
    cy.wait('@getURLs')
    cy.get('[placeholder="Title..."]').type('exist')
    cy.get('[placeholder="Title..."]').should('have.value','exist')
    cy.get('[placeholder="URL to Shorten..."]').type('http://www.google.com')
    cy.get('[placeholder="URL to Shorten..."]').should('have.value','http://www.google.com')
  })
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.wait('@getURLs')
    cy.get('[placeholder="Title..."]').type('exist')
    cy.get('[placeholder="URL to Shorten..."]').type('http://www.google.com')
    cy.fixture('postURL').then((json) => {
      cy.intercept('http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        fixture:'postURL.json'
      })
    })
    cy.get('button').click()
    cy.get('section .url').last().should('exist')
  })
})

