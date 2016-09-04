import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import LeagueTableApp from "./components/LeagueTableApp";
import { reducer, initialState } from "./reducers";

import "./styles/index.scss";

const store = createStore(reducer, initialState,
    compose(applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render(<Provider store={store}>
                    <LeagueTableApp />
                </Provider>,
                document.getElementById("app-container"));
