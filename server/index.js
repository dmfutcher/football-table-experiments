import express from "express";
import Promise from "bluebird";
import fs from "fs";
Promise.promisifyAll(fs);

class FootballDataServer {

    constructor() {
        this.app = express();

        this.app.use("/", express.static("./static"));
        this.app.get("/results/:season", this.handleResultsRequest);
    }

    handleResultsRequest(req, res) {
        const season = req.params.season;
    
        fs.readFileAsync(`./data/pl_results_${season}.json`)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.json({ error: err });
            })
    }

    serve() {
        this.app.listen(8080, () => {
            console.log("Listening on port 8080");
        });
    }

}

const server = new FootballDataServer();
server.serve();
