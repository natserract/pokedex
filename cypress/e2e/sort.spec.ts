import { beforeEach, cy, describe, expect, it } from "local-cypress";

describe("sort", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open and close the sort dropdown correctly", () => {
    cy.getByTestId("sort-action-button").should("exist");
    cy.getByTestId("sort-action-button").click();
    cy.getByTestId("sort-action-content").should("exist");

    cy.getByTestId("sort-action-content").within(() => {
      cy.getByTestId("sort-action-item").should("contain", "Sort by name");
      cy.getByTestId("sort-action-item")
        .should("contain", "Sort by name")
        .click();
      cy.url().should("include", `?sortByName=desc`);
    });

    cy.getByTestId("sort-action-content").should("not.exist");
  });

  it("should sort the list correctly based on the selected option", () => {
    // Select descending option
    cy.getByTestId("sort-action-button").click();
    cy.getByTestId("sort-action-item")
      .should("contain", "Sort by name")
      .click();
    cy.url().should("include", `?sortByName=desc`);

    const actualDescList: string[] = [];
    cy.getByTestId("pokemons-card").each(($card) => {
      cy.wrap($card).within(() => {
        cy.wrap($card)
          .find("h3")
          .invoke("text")
          .then((text) => {
            actualDescList.push(text.trim());
          });
      });
    });
    cy.wait(200);

    // Select ascending option
    cy.getByTestId("sort-action-button").click();
    cy.getByTestId("sort-action-item")
      .should("contain", "Sort by name")
      .click();
    cy.url().should("include", `?sortByName=asc`);

    const actualAscList: string[] = [];
    cy.getByTestId("pokemons-card").each(($card) => {
      cy.wrap($card).within(() => {
        cy.wrap($card)
          .find("h3")
          .invoke("text")
          .then((text) => {
            actualAscList.push(text.trim());
          });
      });
    });
    cy.wait(200);

    cy.fixture("pokemonSortList.json").then((pokemonSortListFixture) => {
      const expectedDescList = pokemonSortListFixture.desc;
      const expectedAscList = pokemonSortListFixture.asc;

      expect(actualDescList).to.deep.equal(expectedDescList);
      expect(actualAscList).to.deep.equal(expectedAscList);
    });
  });
});
