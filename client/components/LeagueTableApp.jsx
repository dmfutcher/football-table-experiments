import React from "react";
import SeasonSelector from './SeasonSelector';

export default class LeagueTableApp extends React.Component {

    render() {
        return (<div>
                    <div id="controls">
                        <SeasonSelector />
                    </div>


                </div>);
    }

}
