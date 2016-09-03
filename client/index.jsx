import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import LeagueTableApp from "./components/LeagueTableApp";
import { reducer, initialState } from "./reducers";

const store = createStore(reducer, initialState);

ReactDOM.render(<Provider store={store}>
                    <LeagueTableApp />
                </Provider>,
                document.getElementById("app-container"));
