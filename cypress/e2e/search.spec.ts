import { cy, describe, it } from "local-cypress";

describe("search", () => {
  const searchQuery = "bulbasaur";

  it("should enter a search query into the input field", () => {
    cy.visit("/search");

    cy.getByTestId("search-form").within(() => {
      cy.getByTestId("search-input").type(searchQuery);
      cy.getByTestId("search-input").should("have.value", searchQuery);
    });
  });

  it("should submit the search form with the entered query", () => {
    cy.visit("/search");

    cy.getByTestId("search-form").within(() => {
      cy.getByTestId("search-input").type(searchQuery);

      cy.getByTestId("search-submit").click();
      cy.getByTestId("search-submit").should("contain", "Searching...");
    });

    cy.wait(200);
    cy.url().should("include", "?query=bulbasaur");
    cy.getByTestId("search-submit").should("contain", "Search");
  });
});
