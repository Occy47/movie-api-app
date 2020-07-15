import * as React from "react";
import "../details.scss";

const MY_API_KEY = process.env.REACT_APP_API_KEY;

class StarRating extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      starsId: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
      ],
    };
  }

  // Makes event listeners for each star element
  componentDidMount() {
    const { starsId } = this.state;
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.addEventListener("mouseover", (e) => this.handleGetStarRating(e));
    });
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.addEventListener("mouseout", () => this.handleRemoveStarRating());
    });
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.addEventListener("click", (e) => this.handleRateMovie(e));
    });
  }

  // Recieves string parametar and returns number equivalent
  handleGetNumberFromString(string: string) {
    var starNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var stringIndex = this.state.starsId.indexOf(string);
    var numberIndex = starNumbers[stringIndex];

    return numberIndex;
  }

  // Creates array of star elements beggining with 1st star and ending with hovered star, then changes css class to checked for each element
  handleGetStarRating(e: any) {
    var endStar = e.target.id;
    var checkedStars = this.state.starsId.slice(
      0,
      this.handleGetNumberFromString(endStar)
    );

    checkedStars.forEach((star: string) => {
      var cls = document.getElementById(star)?.className;
      if (cls?.includes("star-rating-unchecked")) {
        document
          .getElementById(star)
          ?.classList.remove("star-rating-unchecked");
        document.getElementById(star)?.classList.add("star-rating-checked");
      } else {
        console.log("do nothing");
      }
    });
  }

  // On mouse out changes css class back to unchecked for all star elements
  handleRemoveStarRating() {
    const { starsId } = this.state;
    starsId.forEach((star: string) => {
      var cls = document.getElementById(star)?.className;
      if (cls?.includes("star-rating-checked")) {
        document.getElementById(star)?.classList.remove("star-rating-checked");
        document.getElementById(star)?.classList.add("star-rating-unchecked");
      } else {
        console.log("do nothing");
      }
    });
  }

  // Rates selected movie with score from 1 to 10
  handleRateMovie(e: any) {
    var endStar = this.handleGetNumberFromString(e.target.id);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ value: endStar }),
    };
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.movie_id}/rating?api_key=${MY_API_KEY}&guest_session_id=171fee45c74697a659c768a47d93e493`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => console.log(response));
    console.log(this.props.movie_id);
  }

  // Removes all event listeners
  componentWillUnmount() {
    const { starsId } = this.state;
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.removeEventListener("mouseover", (e) => this.handleGetStarRating(e));
    });
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.removeEventListener("mouseout", () => this.handleRemoveStarRating());
    });
    starsId.forEach((id: string) => {
      document
        .getElementById(id)
        ?.removeEventListener("click", (e) => this.handleRateMovie(e));
    });
  }

  render() {
    return (
      <div className="star-rating-container">
        <span className="star-rating-unchecked" id="one">
          ☆
        </span>
        <span className="star-rating-unchecked" id="two">
          ☆
        </span>
        <span className="star-rating-unchecked" id="three">
          ☆
        </span>
        <span className="star-rating-unchecked" id="four">
          ☆
        </span>
        <span className="star-rating-unchecked" id="five">
          ☆
        </span>
        <span className="star-rating-unchecked" id="six">
          ☆
        </span>
        <span className="star-rating-unchecked" id="seven">
          ☆
        </span>
        <span className="star-rating-unchecked" id="eight">
          ☆
        </span>
        <span className="star-rating-unchecked" id="nine">
          ☆
        </span>
        <span className="star-rating-unchecked" id="ten">
          ☆
        </span>
      </div>
    );
  }
}

export default StarRating;
