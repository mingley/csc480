describe('unknown', () => {
  beforeEach(() => cy.visit('/'));

  it('random test', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');
  });
});
