import React from "react";

import SeasonSelector from "./SeasonSelector";
import LeagueTable from "./LeagueTable";

export default class LeagueTableApp extends React.Component {

    render() {
        return (<div>
                    <div id="controls">
                        <SeasonSelector />
                    </div>

                    <div id="league-table-container">
                        <LeagueTable />
                    </div>

                </div>);
    }

}
