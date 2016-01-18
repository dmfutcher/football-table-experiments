import csv
from functools import cmp_to_key

DATA_FILE = "bpl_15_16_results.csv"


class MatchResult:
    WIN = 0
    LOSE = 1
    DRAW = 2
    WIN_AWAY = 3


class Team:

    def __init__(self, name):
        self.name = name
        self.points = 0
        self.goals_for = 0
        self.goals_against = 0

    def add_result(self, result, goals_for, goals_against):
        if result == MatchResult.WIN:
            self.points += 3
        elif result == MatchResult.WIN_AWAY:
            self.points += 4
        elif result == MatchResult.DRAW:
            self.points += 1

        self.goals_for += goals_for
        self.goals_against += goals_against

    def __str__(self):
        return self.name.ljust(14) + "\t" + str(self.points)

    def get_goal_difference(self):
        return self.goals_for - self.goals_against

    def compare(self, other):
        if other.points == self.points:
            gd = self.get_goal_difference()
            other_gd = self.get_goal_difference()

            if gd > other_gd:
                return 1
            elif other_gd > gd:
                return -1
            else:
                return 0
        elif other.points > self.points:
            return -1
        else:
            return 1


class LeagueTable:

    def __init__(self):
        self.teams = {}

    def _get_team(self, team_name):
        team = None

        if team_name not in self.teams:
            team = Team(team_name)
            self.teams[team_name] = team
        else:
            team = self.teams[team_name]

        return team

    def add_result(self, team_home_name, team_away_name, goals_home, goals_away):
        team_home = self._get_team(team_home_name)
        team_away = self._get_team(team_away_name)

        if goals_home > goals_away:
            team_home.add_result(MatchResult.WIN, goals_home, goals_away)
            team_away.add_result(MatchResult.LOSE, goals_away, goals_home)
        elif goals_away > goals_home:
            team_home.add_result(MatchResult.LOSE, goals_home, goals_away)
            team_away.add_result(MatchResult.WIN_AWAY, goals_away, goals_home)
        else:
            team_home.add_result(MatchResult.DRAW, goals_home, goals_away)
            team_away.add_result(MatchResult.DRAW, goals_away, goals_home)

    def __str__(self):
        ordering = []

        for team in self.teams:
            ordering += [self.teams[team]]

        ordering = sorted(ordering, key=cmp_to_key(lambda a,b: a.compare(b)), reverse=True)
        buf = ""
        for team in ordering:
            buf += str(team) + "\n"

        return buf

if __name__ == "__main__":
    table = LeagueTable()

    with open(DATA_FILE, "r") as data_file:
        reader = csv.reader(data_file, delimiter=",")

        for row in reader:
            table.add_result(row[0], row[1], int(row[2]), int(row[3]))

    print(table)
