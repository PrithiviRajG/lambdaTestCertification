describe('Test Scenario 1', () => {
  it('passes', () => {
    cy.visit('https://www.lambdatest.com/selenium-playground/');
    cy.contains('Progress Bars & Sliders');
  })
})