import { cy, describe, expect, it } from "local-cypress";

describe("pagination", () => {
  it("should display pagination controls", () => {
    cy.visit("/");

    cy.getByTestId("pagination-button").should("contain", "Next");
    cy.getByTestId("pagination-button")
      .should("contain", "Next")
      .click({ multiple: true });
    cy.wait(1000);
    cy.getByTestId("pagination-button").should("contain", "Previous");
  });

  it("should navigate to the next page", () => {
    cy.visit("/");

    cy.getByTestId("pagination-button")
      .should("contain", "Next")
      .click({ multiple: true });
    cy.wait(1000);

    // Check the pagination url
    cy.url().then((currentUrl) => {
      const url = new URL(currentUrl);
      const offset = parseInt(url.searchParams.get("offset")!);
      const limit = parseInt(url.searchParams.get("limit")!);

      expect(limit).to.be.a("number");
      expect(offset).to.be.a("number");
      expect(offset).to.equal(20);
    });
  });

  it("should navigate to the previous page", () => {
    cy.visit("/?offset=40&limit=20");

    cy.getByTestId("pagination-button")
      .should("contain", "Previous")
      .click({ multiple: true });
    cy.wait(1000);

    // Check the pagination url
    cy.url().then((currentUrl) => {
      const url = new URL(currentUrl);
      const offset = parseInt(url.searchParams.get("offset")!);
      const limit = parseInt(url.searchParams.get("limit")!);

      expect(limit).to.be.a("number");
      expect(offset).to.be.a("number");
      expect(offset).to.equal(20);
    });
  });
});
