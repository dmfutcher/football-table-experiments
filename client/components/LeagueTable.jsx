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

function teamPosition(name, table) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].name === name) {
            return i;
        }
    }

    return -1;
}

const DeltaCell = ({rowIndex, data, orig, ...props}) => {
    const origPos = teamPosition(data[rowIndex].name, orig);
    const newPos = teamPosition(data[rowIndex].name, data);

    let indicator = "";
    if (origPos > newPos) {
        indicator = "++";
    } else if (origPos < newPos) {
        indicator = "--";
    }

    return <Cell {...props}>
               {indicator}
           </Cell>;
};

class LeagueTable extends React.Component {

    render() {
        const table = this.props.leagueTable;
        if (table === undefined) {
            return <span id="league-table-placeholder"></span>;
        }

        return <Table rowHeight={30}
                      rowsCount={table.length}
                      width={870}
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
                   <Column cell={<DeltaCell data={table} orig={this.props.originalTable} />}
                           width={35} />
               </Table>;
    }

}

function mapStateToProps(state) {
    return {
        leagueTable: state.table,
        originalTable: state.originalTable
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);
