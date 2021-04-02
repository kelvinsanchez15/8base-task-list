describe("Homepage", function () {
  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  it("Has text to log in", function () {
    cy.contains("Hello guest!");
    cy.contains(
      "This is a private Task List Web Application, Sign in now to start using it."
    );
  });
});
