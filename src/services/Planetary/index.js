import { Http } from "@Services";

export const PlanetaryService = {
    GetApod: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = Http.Request(
                    "GET",
                    "/api/planetary/apod",
                    { api_key: true },
                    undefined
                );
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }
};
