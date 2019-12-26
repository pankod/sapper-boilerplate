import { PlanetaryService } from "./index";   

describe("Planetary Service", () => {
    describe("GetApod", () => {
        it("should succeed", async () => {
            const result = await PlanetaryService.GetApod();
            expect(result.copyright).toEqual("Pankod");
        });
    });
});
