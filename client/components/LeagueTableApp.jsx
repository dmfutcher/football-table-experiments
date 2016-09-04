import React from "react";

import SeasonSelector from "./SeasonSelector";
import BasicPointAllocationEditor from "./BasicPointAllocationEditor";
import LeagueTable from "./LeagueTable";
import Header from "./Header";

import { Container, Box } from "./bulma";

export default class LeagueTableApp extends React.Component {

    render() {
        return (<div><Header />
                <Container id="primary-container">

                    <div className="box tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="tile is-child"><SeasonSelector /></div>
                            <div className="tile is-child"><BasicPointAllocationEditor /></div>
                        </div>
                    </div>

                    <Box id="league-table-container">
                        <LeagueTable />
                    </Box>

                </Container></div>);
    }

}
