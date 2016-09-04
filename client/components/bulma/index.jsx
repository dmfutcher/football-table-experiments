import React from "react";

export class Box extends React.Component {

    render() {
        return <div className="box">{this.props.children}</div>;
    }

}

export class Container extends React.Component {

    render() {
        return <div id={this.props.id} className="container">{this.props.children}</div>;
    }

}
