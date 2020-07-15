import * as React from "react";
import "../home.scss";

export interface RoundButtonProps {
  icon: string;
  name: string;
}

class RoundButton extends React.Component<any, RoundButtonProps> {
  render() {
    return (
      <div style={this.props.style}>
        <button className="btn-load" onClick={this.props.onClick}>
          <img src={this.props.icon} alt={this.props.name} />
        </button>
      </div>
    );
  }
}

export default RoundButton;
