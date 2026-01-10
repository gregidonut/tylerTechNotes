declare namespace Cypress {
  interface Chainable {
    signInAsUser(user: 0 | 1): Chainable;
    createTicket(title: string): Chainable;
    assertOrgSwitcherButtonMatchOrgInPath(): Chainable;
  }

  interface TestUser {
    user_id: string;
    password: string;
  }
  interface Env {
    test_users: TestUser[];
  }
}
