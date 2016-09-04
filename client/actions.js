import { createAction } from "redux-actions";
import request from "superagent";

class Actions {

     constructor() {
         this.actions = {
             selectSeason: createAction("SELECT_SEASON", season => season),
             fetchResultsSuccess: createAction("FETCH_RESULTS_SUCCESS", results => results),
             fetchResultsFailed: createAction("FETCH_RESULTS_FAILED", error => error),
             basicAllocationChange: createAction("BASIC_ALLOCATION_CHANGE", (param, points) => ({param, points}))
         };
     }

     selectSeason(season) {
         return (dispatch) => {
             dispatch(this.actions.selectSeason(season));
         };
     }

     fetchResults(season) {
         return (dispatch) => {
             const url = `//localhost:8080/results/${season}`;
             request
                .get(url)
                .end((err, res) => {
                    if (err) {
                        dispatch(this.actions.fetchResultsFailed(err));
                    } else if (!res.body) {
                        dispatch(this.actions.fetchResultsFailed(new Error("Invalid response")));
                    } else if (res.body.error) {
                        dispatch(this.actions.fetchResultsFailed(new Error(res.body.error)));
                    } else {
                        dispatch(this.actions.fetchResultsSuccess(res.body));
                    }
                });
         };
     }

     basicPointAllocationChange(paramName, value) {
         return (dispatch) => {
             dispatch(this.actions.basicAllocationChange(paramName, value));
         };
     }

}

export const actions = new Actions();
