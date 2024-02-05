describe('App Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    // cy.contains('IonTitle', 'Payslips')
  })

  it('renders the selected components on screen', ()=> {
    cy.visit('/')
    cy.get('[data-testid="cypress-home-header"]').should('exist');
    cy.get('[data-testid="cypress-virtual-list"]').should('exist');
    cy.get('[data-testid="cypress-row-item"]').should('exist');
  })

  it('click on row item', ()=> {
    cy.visit('/')
    cy.get('[data-testid="cypress-row-item"]').first()
    .click()
  })

})