import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class SeasonSelector extends React.Component {

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
        const choices = this.getSeasonChoices();
        console.log(typeof choices);
        const options = choices.map(({ display, value }) => {
            return <option value={value} key={value}>{display}</option>;
        });

        return <FormGroup controlId="selectSeason">
                   <ControlLabel>Select season</ControlLabel>
                   <FormControl componentClass="select" placeholder="select">
                       {options}
                   </FormControl>
               </FormGroup>;
    }

}
