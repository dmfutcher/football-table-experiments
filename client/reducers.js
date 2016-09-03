import { handleActions } from "redux-actions";

import { actions } from "./actions";

export const initialState = {
    selectedSeason: undefined
};

export const reducer = handleActions({
    [actions.actions.selectSeason]: (state, action) => {
        return { ...state, selectedSeason: action.payload };
    }
});
