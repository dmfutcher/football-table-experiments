import React from "react";
import { connect } from "react-redux";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import { actions } from "../actions";

class SeasonSelector extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
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

            console.log(JSON.stringify({display,value}))
            choices.push({ display, value });
        }

        return choices;
    }

    render() {
        console.log('Selected season:' + this.props.selected);

        const choices = this.getSeasonChoices();
        const options = choices.map(({ display, value }) => {
            return <option value={value} key={value}>{display}</option>;
        });

        return <FormGroup controlId="selectSeason">
                   <ControlLabel>Select season</ControlLabel>
                   <FormControl componentClass="select"
                                placeholder="select"
                                ref={(ref) => this.input = ref.getDOMNode()}
                                onChange={this.onChange}>
                       {options}
                   </FormControl>
               </FormGroup>;
    }

    onChange() {
        //console.log(this.input.getDOMNode().value);
        debugger;
    }

}

function mapStateToProps(state) {
    return {
        selected: state.selectedSeason
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectSeason: (season) => dispatch(actions.selectSeason(season))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
