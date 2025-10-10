/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
//
import { addClerkCommands } from "@clerk/testing/cypress";
addClerkCommands({ Cypress, cy });

import { setupClerkTestingToken } from "@clerk/testing/cypress";
Cypress.Commands.add("signInAsUser", function (user: 0 | 1) {
  setupClerkTestingToken();
  cy.visit("/sign-in");

  cy.clerkSignIn({
    strategy: "password",
    identifier: Cypress.env("test_users")[user].user_id,
    password: Cypress.env("test_users")[user].password,
  });
  cy.window().then((window) => {
    window.Clerk.session.getToken().then((token) => {
      cy.wrap(token).as("clerkToken");
    });
  });
});

Cypress.Commands.add("createTicket", function (title: string) {
  cy.visit("/tickets");
  cy.get("[data-cy='createTicket-btn-container'] > button").click();
  cy.get("[data-cy='formSection-section'] > form").as("form");
  cy.get("@form")
    .find("[data-cy='textTitleField-div'] input")
    .as("ticketInput")
    .should("be.focused")
    .should("not.be.disabled")
    .type(title);

  cy.wait(600); // wait for async validation
  cy.get("@form")
    .find("button[type='submit']")
    .should("not.be.disabled")
    .as("btn");
  cy.get("@btn").click();

  cy.location("pathname").should("include", "/tickets/details");

  cy.visit("/tickets");

  cy.get("[data-cy='ticketList-section'] > ul").should("have.length", 1);
});

export {};
