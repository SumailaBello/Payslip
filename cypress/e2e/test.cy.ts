describe('App Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    // cy.contains('IonTitle', 'Payslips')
  })

  it('renders the selected components on home screen', ()=> {
    cy.visit('/')
    cy.get('[data-testid="cypress-home-header"]').should('exist');
    cy.get('[data-testid="cypress-virtual-list"]').should('exist');
    cy.get('[data-testid="cypress-row-item"]').should('exist');
  })

  it('visit to details page without clicking on item, app should route back to /home route', ()=> {
    cy.visit('/details').wait(100)
    .url().should('contain', '/home')
  })

  it('click on row item to view payslip details and clicks download button', ()=> {
    cy.visit('/')
    cy.get('[data-testid="cypress-row-item"]').first()
    .click().then(()=> {
      cy.get('[data-testid="cypress-details"]')
      .get('[data-testid="cypress-ref-item"]').should('contain', 'Reference')
      .get('[data-testid="cypress-name-item"]').should('contain', 'Name')
      .get('[data-testid="cypress-amount-item"]').should('contain', 'Amount')
      .get('[data-testid="cypress-deductions-item"]').should('contain', 'Deductions')
      .get('[data-testid="cypress-from-item"]').should('contain', 'From')
      .get('[data-testid="cypress-to-item"]').should('contain', 'To')
    }).wait(2000)
    .get('[data-testid="cypress-download-btn"]').click();
  })

})