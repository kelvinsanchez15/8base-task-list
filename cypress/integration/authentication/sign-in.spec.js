/// <reference types="cypress" />
describe("Sign in", () => {
  it("opens the site", () => {
    cy.visit("localhost:3000/");
  });
  it("opens sign in form", () => {
    cy.get(".MuiContainer-root > div > .MuiButtonBase-root")
      .contains("Sign in")
      .click();
  });
  it("fill and submit sign in form", () => {
    cy.get(
      ":nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > :nth-child(3) > #signInFormUsername"
    )
      .type("kelvinsanchez15@gmail.com")
      .should("have.value", "kelvinsanchez15@gmail.com");
    cy.get(
      ":nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > :nth-child(5) > #signInFormPassword"
    )
      .type("Casa1234.")
      .should("have.value", "Casa1234.");
    cy.get(
      ":nth-child(2) > :nth-child(1) > :nth-child(1) > .cognito-asf > .btn"
    ).click();
  });
});
