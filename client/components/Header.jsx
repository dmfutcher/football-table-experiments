import React from "react";

export default class Header extends React.Component {

    render() {
        return (
            <nav className="nav">
              <div className="nav-left">
                <a className="nav-item is-brand is-3" href="#">
                  <h4 class="title is-4">Premier League Table Experiments</h4>
                </a>
              </div>

              <div className="nav-center">
                <a className="nav-item" href="https://github.com/bobbo/football-table-experiments">
                  <span className="icon">
                    <i className="fa fa-github"></i>
                  </span>
                </a>
                <a className="nav-item" href="https://twitter.com/davidmfutcher">
                  <span className="icon">
                    <i className="fa fa-twitter"></i>
                  </span>
                </a>
              </div>

              <div className="nav-right">
                <a className="nav-item" href="#">
                  Help
                </a>
              </div>

            </nav>
        );

    }
}
