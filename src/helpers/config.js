module.exports = {
    getEnvVars: () => {
        const dotenv = require("dotenv");
        const env = dotenv.config();
        const keys = Object.keys(env.parsed);

        return keys.reduce((pre, curr) => { 
            return  {
            ...pre,
                [`process.env.${curr}`]: JSON.stringify(process.env[curr])
            };
        }, {});
    }
}
