describe("tickets list page", () => {
  beforeEach(() => {
    cy.signInAsUser();

    cy.viewport("iphone-6");
  });
  it("tickets list", () => {
    cy.visit("/tickets");
    cy.get("[data-cy='ticketList-section'] > ul");
  });
});
