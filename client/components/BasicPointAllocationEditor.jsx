import React from "react";
import { connect } from "react-redux";

import BasicAllocator from "./BasicAllocator";

class BasicPointAllocationEditor extends React.Component {

    render() {
        return <div id="basic-point-allocation-editor">
                   <p className="title is-5">Points for result:</p>
                   <div id="basic-allocators">
                       <BasicAllocator display="Win" paramName="win" />
                       <BasicAllocator display="Draw" paramName="draw" />
                       <BasicAllocator display="Lose" paramName="lose" />
                   </div>
               </div>;
    }

}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicPointAllocationEditor);
