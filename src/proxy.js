import proxy from "http-proxy-middleware";

const proxies = {
    api: proxy({
        target: "https://api.nasa.gov",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        logLevel: 'debug'
    }),
    images: proxy({
        target: "https://images-api.nasa.gov",
        pathRewrite: { "^/images-api": "" },
        changeOrigin: true,
        logLevel: 'debug'
    }),
};

export default proxies;
