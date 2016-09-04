import { handleActions } from "redux-actions";

import { actions } from "./actions";
import { calculateLeagueTable } from './league-table';

export const initialState = {
    selectedSeason: undefined,
    seasonResults: undefined,
    table: undefined
};

export const reducer = handleActions({
    [actions.actions.selectSeason]: (state, action) => {
        return { ...state, selectedSeason: action.payload };
    },
    [actions.actions.fetchResultsSuccess]: (state, action) => {
        const table = calculateLeagueTable(action.payload);
        return { ...state, seasonResults: action.payload, table };
    }
});
