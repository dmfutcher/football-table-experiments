import React from "react";
import { connect } from "react-redux";

import { actions } from "../actions";

class BasicAllocator extends React.Component {

    constructor(props) {
        super(props);

        this.input = undefined;
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const id = `basic-allocator-${this.props.paramName}`;
        return <div className="basic-allocator" id={id}>
                   <span>{this.props.display}</span>
                   <input type="number"
                          min="0"
                          value={this.props.value}
                          ref={(ref) => this.input = ref}
                          onChange={this.onChange} />
               </div>;
    }

    onChange() {
        if (this.input !== undefined) {
            this.props.changeAllocation(parseInt(this.input.value));
        }
    }

}

function mapStateToProps(state, ownProps) {
    return {
        value: state.pointsAllocations.basic[ownProps.paramName]
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeAllocation: (points) => dispatch(actions.basicPointAllocationChange(ownProps.paramName, points))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicAllocator);
