// cypress/integration/home_page.spec.js

describe('HomePage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

   it('should display loader while fetching characters', () => {
    cy.get('[data-cy="page-loader"]').should('be.visible');
    cy.get(('[data-cy="page-loader"]'), { timeout: 30000 }).should('not.exist');
  }); 

  it('should display at least one hero card', () => {
    cy.intercept('GET', '**/characters*').as('getCharacters')
    cy.wait('@getCharacters')
    cy.get('[data-cy=hero-card]').should('have.length.at.least', 1);
  })

  it('should load more characters when scrolling down', () => {
    cy.intercept('GET', '**/characters*').as('getCharacters')
    cy.wait('@getCharacters')
    cy.get('[data-cy=hero-card]').should('have.length.at.least', 1);
    cy.scrollTo('bottom');
    cy.get('[data-cy="page-loader"]').should('be.visible');
    cy.get('[data-cy="page-loader"]', { timeout: 30000 }).should('not.exist');
    cy.get('[data-cy=hero-card]').should('have.length.gt', 1);
  });

  it('should filter by favorites when clicking on "Somente favoritos"', () => {
    cy.intercept('GET', '**/characters*').as('getCharacters')
    cy.wait('@getCharacters')
    cy.get('[data-cy="favorite-button"]').first().click();
    cy.contains('Somente favoritos').click();
    cy.get('[data-cy=favorites-filter]').should('have.class', 'fill-current');
    cy.get('[data-cy=hero-card-favorites]').should('be.visible');
  });

  it('should search for a character by name', () => {
    cy.intercept('GET', '**/characters*').as('getCharacters')
    cy.wait('@getCharacters')
    cy.get('[data-cy=search-input]').type('Spider-Man');
    cy.intercept('GET', '**/characters*').as('getCharacters')
    cy.wait('@getCharacters')
    cy.get('[data-cy=hero-card-name]').contains('Spider-Man').should('exist');
  }); 
});