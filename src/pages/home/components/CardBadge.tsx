import * as React from "react";
import "../home.scss";

export interface CardBadgeProps {
  rating: number;
}

class CardBadge extends React.Component<any, CardBadgeProps> {
  render() {
    return <span className="card-badge">{this.props.rating}</span>;
  }
}

export default CardBadge;
