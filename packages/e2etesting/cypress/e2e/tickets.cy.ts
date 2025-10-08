describe("tickets list page", () => {
  after(() => {
    cy.task("queryDatabase", { queryName: "truncateTickets", args: null }).then(
      (tickets: Array<any>) => {
        expect(tickets.length).to.equal(0);
      },
    );
  });
  beforeEach(() => {
    cy.signInAsUser();
    cy.viewport("iphone-6");
    cy.task("queryDatabase", { queryName: "truncateTickets", args: null }).then(
      (tickets: Array<any>) => {
        expect(tickets.length).to.equal(0);
      },
    );
  });

  it("empty tickets page is a p", () => {
    cy.visit("/tickets");
    cy.get("[data-cy='ticketList-section'] > p").contains("no tickets yet..");
  });
  it("create ticket and org slug is retained through different pages", () => {
    cy.visit("/tickets/new");
    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("initialTenant");
    });
    cy.get("[data-cy='formSection-section'] > form").as("form");
    cy.get("@form")
      .find("[data-cy='textTitleField-div'] input")
      .as("ticketInput")
      .should("be.focused")
      .should("not.be.disabled")
      .type("ulol");

    cy.wait(600); // wait for async validation
    cy.get("@form")
      .find("button[type='submit']")
      .should("not.be.disabled")
      .as("btn");
    cy.get("@btn").click();

    cy.location("pathname").should("include", "/tickets/details");

    cy.visit("/tickets");

    cy.get("[data-cy='ticketList-section'] > ul").should("have.length", 1);
    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("currentTenant");
    });
    cy.get("@initialTenant").then((initialTenant) => {
      cy.get("@currentTenant").then((currentTenant) => {
        expect(initialTenant).to.eq(currentTenant);
      });
    });
  });
});
