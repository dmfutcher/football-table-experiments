import React from "react";
import { connect } from "react-redux";
import { Table, Column, Cell } from 'fixed-data-table';

import "fixed-data-table/dist/fixed-data-table.css";

const DataCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
        {data[rowIndex][col]}
    </Cell>
);

const PlacementCell = ({rowIndex}) => (
    <Cell>
        {rowIndex + 1}
    </Cell>
);

class LeagueTable extends React.Component {

    render() {
        const table = this.props.leagueTable;
        if (table === undefined) {
            return <span id="league-table-placeholder"></span>;
        }

        return <Table rowHeight={40}
                      rowsCount={table.length}
                      width={835}
                      maxHeight={1000}
                      headerHeight={50}>
                  <Column header={<Cell>#</Cell>}
                          cell={<PlacementCell />}
                          width={35} />
                   <Column header={<Cell>Team</Cell>}
                           cell={<DataCell data={table} col={"name"} />}
                           width={275} />
                   <Column header={<Cell>W</Cell>}
                           cell={<DataCell data={table} col={"wins"} />}
                           width={75} />
                   <Column header={<Cell>D</Cell>}
                           cell={<DataCell data={table} col={"draws"} />}
                           width={75} />
                   <Column header={<Cell>L</Cell>}
                           cell={<DataCell data={table} col={"losses"} />}
                           width={75} />
                   <Column header={<Cell>GF</Cell>}
                           cell={<DataCell data={table} col={"goalsFor"} />}
                           width={75} />
                   <Column header={<Cell>GA</Cell>}
                           cell={<DataCell data={table} col={"goalsAgainst"} />}
                           width={75} />
                   <Column header={<Cell>GD</Cell>}
                           cell={<DataCell data={table} col={"goalDifference"} />}
                           width={75} />
                   <Column header={<Cell>Pts</Cell>}
                           cell={<DataCell data={table} col={"points"} />}
                           width={75} />
               </Table>;
    }

}

function mapStateToProps(state) {
    return {
        leagueTable: state.table
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
