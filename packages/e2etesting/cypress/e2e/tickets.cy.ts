describe("tickets list page", () => {
  after(() => {
    cy.task("queryDatabase", { queryName: "truncateTickets", args: null }).then(
      (tickets: Array<any>) => {
        expect(tickets.length).to.equal(0);
      },
    );
  });
  beforeEach(() => {
    cy.signInAsUser(0);
    cy.viewport("iphone-6");
    cy.task("queryDatabase", { queryName: "truncateTickets", args: null }).then(
      (tickets: Array<any>) => {
        expect(tickets.length).to.equal(0);
      },
    );
  });

  it("create ticket", () => {
    cy.createTicket("betlog");
  });

  it("tenant stays the same when switching views and tickets are tenant based", () => {
    cy.clerkSignOut();
    cy.wait(500);
    cy.signInAsUser(0);
    cy.visit("/org/personal/tickets");
    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("initialTenant");
    });
    cy.get("[data-cy='ticketList-section'] > p").contains("no tickets yet..");

    cy.createTicket("user 0 ticket");

    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("currentTenant");
    });
    cy.get("@initialTenant").then((initialTenant) => {
      cy.get("@currentTenant").then((currentTenant) => {
        expect(initialTenant).to.eq(currentTenant);
      });
    });

    cy.visit("/org/activenode/tickets");
    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("initialTenant");
    });
    cy.get("[data-cy='ticketList-section'] > p").contains("no tickets yet..");

    cy.createTicket("user 0 ticket");

    cy.location("pathname").then((path) => {
      return cy.wrap(path.split("/")[2]).as("currentTenant");
    });
    cy.get("@initialTenant").then((initialTenant) => {
      cy.get("@currentTenant").then((currentTenant) => {
        expect(initialTenant).to.eq(currentTenant);
      });
    });

    cy.visit("/org/personal/tickets");
    cy.get("[data-cy='ticketList-section'] > ul").should("have.length", 1);
  });
  it("users can't find each other's tickets personal", () => {
    cy.createTicket("user 0's personal ticket");

    cy.clerkSignOut();
    cy.wait(500);
    cy.signInAsUser(1);
    cy.visit("/org/personal/tickets");

    cy.get("[data-cy='ticketList-section'] > p").contains("no tickets yet..");
  });

  it("users from the same tenant can find each others tickets", () => {
    cy.visit("/org/activenode/tickets");
    cy.createTicket("user 0's activenode ticket");

    cy.clerkSignOut();

    cy.wait(500);
    cy.signInAsUser(1);

    cy.visit("/org/activenode/tickets");
    cy.get("[data-cy='ticketList-section'] > ul").should("have.length", 1);

    cy.clerkSignOut();
    cy.wait(500);
  });
});
