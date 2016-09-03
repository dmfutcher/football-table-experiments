import { createAction } from "redux-actions";

class Actions {

     constructor() {
         this.types = {
             selectSeason: "SELECT_SEASON"
         };
     }

     selectSeason(season) {
         return createAction(this.types.selectSeason, season);
     }

}

export const actions = new Actions();
