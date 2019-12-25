import proxy from "http-proxy-middleware";

const devProxy = proxy({
    target: "https://api.nasa.gov",
    pathRewrite: { "^/api": "" },
    changeOrigin: true,
    logLevel: 'debug'
});

export default devProxy;
