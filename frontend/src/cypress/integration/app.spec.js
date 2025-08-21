describe('Bayhan App', () => {
  it('Loads homepage', () => {
    cy.visit('/');
    cy.contains('Welcome to Bayhan');
  });
});