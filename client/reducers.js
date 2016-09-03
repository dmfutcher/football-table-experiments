import { handleActions } from "redux-actions";

import { actions } from "./actions";

export const initialState = {
    selectedSeason: undefined,
    seasonResults: undefined
};

export const reducer = handleActions({
    [actions.actions.selectSeason]: (state, action) => {
        return { ...state, selectedSeason: action.payload };
    },
    [actions.actions.fetchResultsSuccess]: (state, action) => {
        return { ...state, seasonResults: action.payload };
    }
});
