import * as React from "react";
import CardBadge from "./CardBadge";
import "../home.scss";

class MovieCard extends React.Component<any, any> {
  render() {
    return (
      <div className="">
        <div className="card">
          <div className="img-container">
            <img src={this.props.movieSrc} alt="myimage" />
            <CardBadge rating={this.props.movieRating} />
          </div>
          <div className="card-text">
            <p>{this.props.title}</p>
            <p>{this.props.rating}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
