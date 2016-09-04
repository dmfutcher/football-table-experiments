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

export function calculateLeagueTable(results) {
    const teams = {};

    for (const match of results) {
        let homeTeam = teams[match.homeTeam];
        let awayTeam = teams[match.awayTeam];

        if (homeTeam === undefined) {
            homeTeam = { ...emptyTeamResults, name: match.homeTeam };
        }

        if (awayTeam === undefined) {
            awayTeam = { ...emptyTeamResults, name: match.awayTeam };
        }

        if (match.homeGoals > match.awayGoals) {
            homeTeam.points += 3;
            homeTeam.wins += 1;
            awayTeam.losses += 1;
        } else if (match.homeGoals === match.awayGoals) {
            homeTeam.points += 1;
            awayTeam.points += 1;
            homeTeam.draws += 1;
            awayTeam.draws += 1;
        } else {
            awayTeam.points += 3;
            awayTeam.wins += 1;
            homeTeam.losses += 1;
        }

        homeTeam.goalsFor += match.homeGoals;
        homeTeam.goalsAgainst += match.awayGoals;
        awayTeam.goalsFor += match.awayGoals;
        awayTeam.goalsAgainst += match.homeGoals;

        teams[match.homeTeam] = homeTeam;
        teams[match.awayTeam] = awayTeam;
    }

    let table = [];
    for (const team of Object.keys(teams)) {
        table.push(teams[team]);
    }

    return table;
}
