import { actions } from './actions';

export const initialState = {
    selectedSeason: undefined
};

export function reducer(state, action) {
    switch (action.type) {
        case actions.types.selectSeason:
            return { ...state, selectedSeason: season };
        default:
            return state;
    }
}
