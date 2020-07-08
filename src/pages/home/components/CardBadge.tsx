import * as React from "react";
import "../home.scss";

class CardBadge extends React.Component<any, any> {
  render() {
    return <span className="card-badge">{this.props.rating}</span>;
  }
}

export default CardBadge;
