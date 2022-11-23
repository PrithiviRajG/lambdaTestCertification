function movePiece ( selector, x, y) {
  cy.get(`${selector}`)
  .trigger('mousedown', { which: 1 }, { force: true })
  .trigger('mousemove', x, y,{ force: true })
  .trigger('mouseup', { force: true })
}


describe("Test Scenario 1", () => {
  beforeEach(() => {
    cy.visit("https://www.lambdatest.com/selenium-playground/");
    cy.get("section.my-50")
      .contains("Progress Bars & Sliders")
      .parent()
      .contains("Drag & Drop Sliders")
      .click();
  });

  it("should go to drag and drop slider page", () => {
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        "https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo"
      );
    });
  });

  it.only("change slider value from 15 to 95 with mouse click", function() {
    cy.get('.container').eq(4).scrollIntoView();
    //cy.get('.sp__range-success > .sp__range').trigger('mousedown', {scrollBehavior: false});
    //cy.get('.sp__range-success > .sp__range').trigger('mouseup', 15, 40, {scrollBehavior: false});
    movePiece('.sp__range-success > .sp__range', 150, 5);

  });
});

describe("Test Scenario 2", () => {
  beforeEach(() => {
    cy.visit("https://www.lambdatest.com/selenium-playground/");
    cy.viewport('samsung-note9');
  });

  it('select input form submit',()=>{
    cy.get("section.my-50")
      .contains("Input Forms")
      .parent()
      .contains("Input Form Submit")
      .click();
      cy.location().should((loc) => {
        expect(loc.href).to.eq(
          "https://www.lambdatest.com/selenium-playground/input-form-demo"
        );
      });
  })

  

  it('fill form and submit', ()=>{
    cy.get("section.my-50")
      .contains("Input Forms")
      .parent()
      .contains("Input Form Submit")
      .click();
      cy.location().should((loc) => {
        expect(loc.href).to.eq(
          "https://www.lambdatest.com/selenium-playground/input-form-demo"
        );
      });

      cy.xpath('//*[@id="seleniumform"]').within(()=>{
        cy.get('input').eq(0).type('prithivi');
        cy.get('input').eq(1).type('prithiviraj1991@gmail.com');
        cy.get('input').eq(2).type('shamily');
        cy.get('input').eq(3).type('cisco');
        cy.get('input').eq(4).type('http://prithivi.com');
        cy.get('select').select('India')
        cy.get('input').eq(5).type('madurai');
        cy.get('input').eq(6).type('4/380f1 paarijatham street');
        cy.get('input').eq(7).type('bama nagar');
        cy.get('input').eq(8).type('Tamilnadu');
        cy.get('input').eq(9).type('625017');
      });
      cy.xpath('//*[@id="seleniumform"]').submit();
      cy.contains('Thanks for contacting us, we will get back to you shortly.')
  });

  

  it('clear all session', ()=>{
    Cypress.session.clearAllSavedSessions()
  })
});

describe("lighthouse and accessibilty check", ()=>{
  it("should pass the audits", function () {
     // Do not fail the test when there are accessibility failures
    cy.visit("https://www.lambdatest.com/selenium-playground/");
    cy.viewport('samsung-note9');
    cy.get("section.my-50")
      .contains("Input Forms")
      .parent()
      .contains("Input Form Submit")
      .click();
      cy.location().should((loc) => {
        expect(loc.href).to.eq(
          "https://www.lambdatest.com/selenium-playground/input-form-demo"
        );
      });
    cy.injectAxe();
    cy.checkA11y('#seleniumform', null, null, true);
  });

  it("should verify the lighthouse performance scores for permission page", function () {
    cy.visit("https://www.lambdatest.com/selenium-playground/");
    cy.viewport('samsung-note9');
    cy.get("section.my-50")
      .contains("Input Forms")
      .parent()
      .contains("Input Form Submit")
      .click();
      cy.location().should((loc) => {
        expect(loc.href).to.eq(
          "https://www.lambdatest.com/selenium-playground/input-form-demo"
        );
      });
    cy.lighthouse({
      performance: 50
    });
  });
})
