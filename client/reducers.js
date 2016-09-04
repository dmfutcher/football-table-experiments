import { handleActions } from "redux-actions";

import { actions } from "./actions";
import { calculateLeagueTable } from './league-table';

const defaultAllocation = {
    basic: {
        win: 3,
        draw: 1,
        lose: 0
    }
}

export const initialState = {
    selectedSeason: undefined,
    seasonResults: undefined,
    table: undefined,
    pointsAllocations: defaultAllocation
};

export const reducer = handleActions({
    [actions.actions.selectSeason]: (state, action) => {
        return { ...state, selectedSeason: action.payload };
    },
    [actions.actions.fetchResultsSuccess]: (state, action) => {
        const table = calculateLeagueTable(action.payload, state.pointsAllocations);
        const originalTable = calculateLeagueTable(action.payload, defaultAllocation);

        return { ...state, seasonResults: action.payload, table, originalTable };
    },
    [actions.actions.basicAllocationChange]: (state, action) => {
        const allocs = state.pointsAllocations;
        allocs.basic[action.payload.param] = action.payload.points;

        const table = calculateLeagueTable(state.seasonResults, allocs);
        return { ...state, pointsAllocations: allocs, table };
    }
});
