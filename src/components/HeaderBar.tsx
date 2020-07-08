import * as React from "react";
import "./HeaderBar.scss";

class HeaderBar extends React.Component<any, any> {
  render() {
    return (
      <div className="header-bar">
        <div className="header-title">{this.props.title}</div>
      </div>
    );
  }
}

export default HeaderBar;
