import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import proxy from "./proxy";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
    .use('/api', proxy.api)
    .use("/images-api", proxy.images)
    .use(compression({ threshold: 0 }), sirv("static", { dev }), sapper.middleware())
    .listen(PORT, err => {
        if (err) console.log("error", err);
    });
