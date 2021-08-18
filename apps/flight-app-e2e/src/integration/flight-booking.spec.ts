describe('flight-app/flight-booking', () => {
  it('should do a sanity check', () => {
    cy.visit('/');
  });

  it('should do an implicit subject assertion', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Welcome ');
  });

  it('should do an explicit subject assertion', () => {
    cy.visit('/flight-booking/flight-search');
    cy.get('form input[name="from"]').clear().type('Graz');
    cy.get('form input[name="to"]').clear().type('Hamburg');
    cy.get('form .btn').should(($button) => {
      expect($button).to.not.have.attr('disabled', 'disabled');
    });
  });

  it('should do a form submit and count length of flight cards', () => {
    cy.visit('/flight-booking/flight-search');

    cy.get('form input[name="from"]').clear().type('Hamburg');
    cy.get('form input[name="to"]').clear().type('Graz');
    cy.get('form .btn').click();
    cy.get('flight-card').should('have.length', 2);
  });
});
