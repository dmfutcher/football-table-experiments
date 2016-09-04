import { handleActions } from "redux-actions";

import { actions } from "./actions";
import { calculateLeagueTable } from './league-table';

export const initialState = {
    selectedSeason: undefined,
    seasonResults: undefined,
    table: undefined,
    pointsAllocations: {
        basic: {
            win: 3,
            draw: 1,
            lose: 0
        }
    }
};

export const reducer = handleActions({
    [actions.actions.selectSeason]: (state, action) => {
        return { ...state, selectedSeason: action.payload };
    },
    [actions.actions.fetchResultsSuccess]: (state, action) => {
        const table = calculateLeagueTable(action.payload);
        return { ...state, seasonResults: action.payload, table };
    },
    [actions.actions.basicAllocationChange]: (state, action) => {
        const allocs = state.pointsAllocations;
        allocs.basic[action.payload.param] = action.payload.points;
        return { ...state, pointsAllocations: allocs };
    }
});
