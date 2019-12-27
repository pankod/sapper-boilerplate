module.exports = {
    getEnvVars: () => {
        const dotenv = require("dotenv");
        dotenv.config();
    
        const envVars = ["API_URL", "API_KEY"];
    
        return envVars.reduce((pre, curr) => { 
            return {
                ...pre,
                [`process.env.${curr}`]: JSON.stringify(process.env[curr])
            };
        }, {});
    }
}
