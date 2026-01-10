describe("tickets list page", () => {
  beforeEach(() => {
    cy.signInAsUser(0);
    cy.viewport("iphone-6");
  });

  it("check if org matches clerk org-switcher button", () => {
    cy.visit("/tickets");
    cy.assertOrgSwitcherButtonMatchOrgInPath();
    for (let i = 0; i < 3; i++) {
      cy.visit("/org/activenode/tickets");
      cy.assertOrgSwitcherButtonMatchOrgInPath();
      cy.visit("/org/personal/tickets");
      cy.assertOrgSwitcherButtonMatchOrgInPath();
    }
  });
});
