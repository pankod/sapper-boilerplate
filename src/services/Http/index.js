//#region Global Imports
import { stringify } from "query-string";

require('es6-promise').polyfill();
require('isomorphic-fetch');
//#endregion Global Imports

export const Http = {
    Request: async (methodType, url, params, payload) => {
        const BaseUrl = `${process.env.API_URL}`;
        const API_KEY = process.env.API_KEY;
        const paramsWithKey = {...params, api_key: API_KEY};
        const query = API_KEY ? `?${stringify(paramsWithKey)}` : params ? `?${stringify(paramsWithKey)}` : "";

        return new Promise((resolve, reject) => {
             fetch(`${BaseUrl}${url}${query}`, {
                    body: JSON.stringify(payload),
                    cache: 'no-cache',
                    headers: {
                        'content-type': 'application/json',
                    },
                    method: `${methodType}`,
                })
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    } else {
                        return reject(response);
                    }
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
};
