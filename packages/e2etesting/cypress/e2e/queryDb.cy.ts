describe("tickets list page", () => {
  it("gets all tickets", () => {
    cy.task("queryDatabase", { queryName: "getTickets", args: null }).then(
      (tickets: Array<any>) => {
        cy.log(JSON.stringify(tickets));
        expect(tickets.length).to.be.greaterThan(0);
      },
    );
  });
});
