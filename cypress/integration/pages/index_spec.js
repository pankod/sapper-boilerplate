describe("Home", () => {
    it("finds page components", () => {
        cy.visit("http://localhost:3000");
        cy.get("[data-cy=HelloWorld]");
        cy.get("[data-cy=PankodLogo]");
        cy.get("[data-cy=ApodImage]");
    });
});
