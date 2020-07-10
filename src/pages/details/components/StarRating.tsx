import * as React from "react";
import "../details.scss";

class StarRating extends React.Component<any, any> {
  render() {
    return (
      <div className="star-rating-unchecked">
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
      </div>
    );
  }
}

export default StarRating;
