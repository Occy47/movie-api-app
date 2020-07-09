import * as React from "react";
import CardBadge from "./CardBadge";
import "../home.scss";

class MovieCard extends React.Component<any, any> {
  render() {
    return (
      <div className="">
        <div className="card">
          <div className="img-container">
            <CardBadge rating={this.props.movieRating} />
            <img
              style={{
                position: "relative",
                top: -21,
                height: 280,
                width: 200,
              }}
              src={this.props.movieSrc}
              alt="myimage"
            />
          </div>
          <div className="card-text">
            <div>{this.props.title}</div>
            <div>{this.props.language}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
