describe("Home", () => {
    it("finds page components", () => {
        cy.visit("http://localhost:3000");
        cy.get("[data-cy=HelloWorld]");
        cy.get("[data-cy=PankodLogo]");
        cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type" , "apod");
    });

    it("makes a search for given keyword", () => {
        cy.get("[data-cy=SearchInput]").type("iapetus");
        cy.get("[data-cy=SearchButton]").click();
        cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type", "search");
    });
    
    it("shows astrononmy picture of the day", () => {
        cy.get("[data-cy=ApodButton]").click();
        cy.get("[data-cy=PlanetaryImage]").should("have.attr", "data-type" , "apod");
        cy.get("[data-cy=SearchInput]").should("have.value", "");
    });
});
