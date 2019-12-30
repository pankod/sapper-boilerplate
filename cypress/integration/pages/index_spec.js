describe("Home", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    describe("Initial State", () => {
        it("finds page components", () => {
            cy.get("[data-cy=HelloWorld]");
            cy.get("[data-cy=PankodLogo]");
            cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type" , "apod");
        });
    });

    describe("Search Button", () => {
        describe("with results", () => {
            it("shows a random result", () => {
                cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type", "apod");
                cy.get("[data-cy=SearchInput]").type("iapetus");
                cy.get("[data-cy=SearchButton]").click();
                cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type", "search");
            });
        });

        describe("no results found", () => {
            it("shows status message", () => {
                cy.get("[data-cy=SearchInput]").type("pankod");
                cy.get("[data-cy=SearchButton]").click();
                cy.get("[data-cy=StatusMessage]").contains("No results found");
            });
        });
    });

    describe("Photo of the Day Button", () => {
        it("changes image type to apod", () => {     
            cy.get("[data-cy=SearchInput]").type("iapetus");
            cy.get("[data-cy=SearchButton]").click();
            cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type", "search");
            
            cy.get("[data-cy=ApodButton]").click();
            cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type" , "apod");
            cy.get("[data-cy=SearchInput]").should("have.value", "");
        });
    });
});
