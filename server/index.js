import express from "express";

class FootballDataServer {

    constructor() {
        this.app = express();

        this.app.use("/", express.static("./static"));
    }

    serve() {
        this.app.listen(8080, () => {
            console.log("Listening on port 8080");
        });
    }

}

const server = new FootballDataServer();
server.serve();
