// import { getGreeting } from '../support/app.po';

describe('flight-app', () => {
  /*beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to flight-app!');
  });*/

  it('should load page below 2 second', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start-loading');
      },
      onLoad: (win) => {
        win.performance.mark('end-loading');
      }
    })
      .its('performance')
      .then((p) => {
        p.measure('pageLoad', 'start-loading', 'end-loading');
        const measure = p.getEntriesByName('pageLoad')[0];
        expect(measure.duration).to.be.most(2000);
      });
  });
});
