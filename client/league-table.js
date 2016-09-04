const emptyTeamResults = {
    name: undefined,
    points: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0
};

function isValidMatch(match) {
    return (match.homeTeam && match.awayTeam && match.homeGoals != undefined && match.awayGoals != undefined)
}

function scoreMatch(match, homeTeam, awayTeam, allocs) {
    const ptsWin = allocs.basic.win;
    const ptsDraw = allocs.basic.draw;
    const ptsLose = allocs.basic.lose;

    if (homeTeam === undefined) {
        homeTeam = { ...emptyTeamResults, name: match.homeTeam };
    }

    if (awayTeam === undefined) {
        awayTeam = { ...emptyTeamResults, name: match.awayTeam };
    }

    if (match.homeGoals > match.awayGoals) {
        homeTeam.points += ptsWin;
        awayTeam.points += ptsLose;
        homeTeam.wins += ptsDraw;
        awayTeam.losses += ptsDraw;
    } else if (match.homeGoals === match.awayGoals) {
        homeTeam.points += ptsDraw;
        awayTeam.points += ptsDraw;
        homeTeam.draws += ptsDraw;
        awayTeam.draws += ptsDraw;
    } else {
        awayTeam.points += ptsWin;
        awayTeam.wins += ptsDraw;
        homeTeam.points += ptsLose;
        homeTeam.losses += ptsDraw;
    }

    homeTeam.goalsFor += match.homeGoals;
    homeTeam.goalsAgainst += match.awayGoals;
    awayTeam.goalsFor += match.awayGoals;
    awayTeam.goalsAgainst += match.homeGoals;

    return { homeTeam, awayTeam };
}

function sortTable(table, sortKey="points") {
    table.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
            return 1;
        } else if (a[sortKey] > b[sortKey]) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function calculateLeagueTable(results, allocations) {
    const teams = {};

    for (const match of results) {
        if (!isValidMatch(match)) {
            continue;
        }

        const { homeTeam, awayTeam } = scoreMatch(match, teams[match.homeTeam], teams[match.awayTeam], allocations);
        teams[match.homeTeam] = homeTeam;
        teams[match.awayTeam] = awayTeam;
    }

    let table = [];
    for (const team of Object.keys(teams)) {
        teams[team].goalDifference = teams[team].goalsFor - teams[team].goalsAgainst;
        table.push(teams[team]);
    }

    sortTable(table);
    return table;
}
