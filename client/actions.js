import { createAction } from "redux-actions";

class Actions {

     constructor() {
         this.actions = {
             selectSeason: createAction("SELECT_SEASON", season => season)
         };
     }

     selectSeason(season) {
         return (dispatch) => dispatch(this.actions.selectSeason(season));
     }

}

export const actions = new Actions();
