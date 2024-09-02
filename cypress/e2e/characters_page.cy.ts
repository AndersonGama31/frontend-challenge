describe('Characters Page Tests', () => {
    const slug = '1009220'

    beforeEach(() => {
      cy.visit(`/character/${slug}`);
    });
  
    it('should display loader while fetching characters', () => {
      cy.get('[data-cy=loading-indicator]').should('be.visible');
      cy.get('[data-cy=loading-indicator]').should('not.exist');
    });

    it('should display at least one comics card', () => {
      cy.get('[data-cy=comics-card]').should('have.length.at.least', 1);
    })
  });