import React from "react";
import { connect } from "react-redux";

import { actions } from "../actions";

class SeasonSelector extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.selectionChanged = this.selectionChanged.bind(this);
    }

    componentDidMount() {
        this.selectionChanged("1516");
    }

    paddedYear(year) {
        if (year < 10) {
            return `0${year}`;
        } else {
            return `${year}`;
        }
    }

    getSeasonChoices() {
        let choices = [];

        for (let finishYear = 9; finishYear <= 16; finishYear++) {
            const startYear = finishYear - 1;
            const startStr = this.paddedYear(startYear);
            const finishStr = this.paddedYear(finishYear);

            const display = `${startStr}/${finishStr}`;
            const value = `${startStr}${finishStr}`

            choices.push({ display, value });
        }

        return choices;
    }

    render() {
        const choices = this.getSeasonChoices();
        const options = choices.map(({ display, value }) => {
            return <option value={value} key={value}>{display}</option>;
        });

        return <select onChange={this.onChange}
                       value={this.props.selected || "1516"}
                       ref={(ref) => this.input = ref}>{options}</select>;
    }

    onChange() {
        this.selectionChanged(this.input.value);
    }

    selectionChanged(season) {
        this.props.selectSeason(season);
        this.props.fetchResults(season);
    }

}

function mapStateToProps(state) {
    return {
        selected: state.selectedSeason
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectSeason: (season) => dispatch(actions.selectSeason(season)),
        fetchResults: (season) => dispatch(actions.fetchResults(season))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
