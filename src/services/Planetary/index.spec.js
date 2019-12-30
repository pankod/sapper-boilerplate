import { PlanetaryService } from "./index";   
import "./Planetary.mocks";

describe("Planetary Service", () => {
    describe("GetApod", () => {
        it("should succeed", async () => {
            const result = await PlanetaryService.GetApod();
            expect(result.copyright).toEqual("Stanislav Volskiy");
        });
    });

    describe("Search", () => {
        it("should succeed", async () => {
            const result = await PlanetaryService.Search("iapetus");
            expect(result.collection.items.length).toBeGreaterThan(0);
        });
    });
});
