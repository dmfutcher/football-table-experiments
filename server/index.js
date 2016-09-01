import express from 'express';

class FootballDataServer {

    constructor() {
        this.app = express();
    }

    serve() {
        console.log('Serving!');
    }

}

const server = new FootballDataServer();
server.serve();
