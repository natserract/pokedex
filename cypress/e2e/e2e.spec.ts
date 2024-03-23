import { cy, describe, it } from "local-cypress";

describe("page load", () => {
  it("should display message", () => {
    cy.visit("/");
    cy.getByTestId("title").should("contain", "Get Started");
  });
});
