import { cy, describe, beforeEach, it } from "local-cypress";

describe("search", () => {
  const searchQuery = "bulbasaur";

  beforeEach(() => {
    cy.visit("/search");
  });

  it("should enter a search query into the input field", () => {
    cy.getByTestId("search-form").within(() => {
      cy.getByTestId("search-input").type(searchQuery);
      cy.getByTestId("search-input").should("have.value", searchQuery);
    });
  });

  it("should submit the search form with the entered query", () => {
    cy.getByTestId("search-form").within(() => {
      cy.getByTestId("search-input").type(searchQuery);

      cy.getByTestId("search-submit").click();
      cy.getByTestId("search-submit").should("contain", "Searching...");
    });

    cy.wait(200);
    cy.url().should("include", `?query=${searchQuery}`);
    cy.getByTestId("search-submit").should("contain", "Search");
  });
});
