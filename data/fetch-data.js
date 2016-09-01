import request from "superagent";
import Promise from "bluebird";
import * as _parse from "csv-parse";
import fs from "fs";

// TODO: Work out how to make csv-parse work with promisifyAll
const parse = Promise.promisify(_parse.default);
Promise.promisifyAll(fs);

function fetchLeagueResults(season) {
    return new Promise((resolve, reject) => {
        const url = `http://www.football-data.co.uk/mmz4281/${season}/E0.csv`;

        request
            .get(url)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    cleanResults(res.text)
                        .then(resolve)
                        .catch(reject);
                }
            });
    });
}

function cleanResults(rawResults) {
    return new Promise((resolve, reject) => {
        parse(rawResults)
            .then((rows) => {
                const matches = rows.slice(1).map((row) => {
                    return {
                        homeTeam: row[2],
                        awayTeam: row[3],
                        homeGoals: row[4],
                        awayGoals: row[5]
                    };
                })

                resolve(matches);
            })
            .catch(reject);
    });
}

const seasons = ["0809", "0910", "1011", "1112", "1213", "1314", "1415", "1516"];

for (const season of seasons) {
    fetchLeagueResults(season)
        .then((data) => {
            fs.writeFileAsync(`data/pl_results_${season}.json`, JSON.stringify(data))
                .then(() => {
                    console.log(`Fetched results for ${season} season`);
                })
                .catch((err) => {
                    throw err;
                });
        })
        .catch((err) => {
            console.error(`Failed to fetch results for season ${season}: ${err}`);
        })
}
