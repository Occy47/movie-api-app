import * as React from "react";
import "../home.scss";

class MovieRouletteModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      genre: "",
    };
    this.handleGenreInputChange = this.handleGenreInputChange.bind(this);
  }

  handleGenreInputChange(e: any) {
    this.setState({ genre: e.target.value });
  }

  render() {
    const showModal = this.props.show ? "display-block" : "display-none";
    return (
      <div className={`modal ${showModal}`}>
        <div className="modal-content">
          <span className="close" onClick={this.props.handleClose}>
            &times;
          </span>
          <div className="modal-title">Movie Roulette</div>
          <div>Select genre:</div>
          <div className="modal-btns-container">
            <div className="modal-btn">
              <input
                type="radio"
                id="action"
                name="genre"
                value="28"
                onChange={this.handleGenreInputChange}
              />
              <label>Action</label>
            </div>
            <div className="modal-btn">
              <input
                type="radio"
                id="documentary"
                name="genre"
                value="99"
                onChange={this.handleGenreInputChange}
              />
              <label>Documentary</label>
            </div>
            <div className="modal-btn">
              <input
                type="radio"
                id="drama"
                name="genre"
                value="18"
                onChange={this.handleGenreInputChange}
              />
              <label>Drama</label>
            </div>
            <div className="modal-btn">
              <input
                type="radio"
                id="romance"
                name="genre"
                value="10749"
                onChange={this.handleGenreInputChange}
              />
              <label>Romance</label>
            </div>
            <div className="modal-btn">
              <input
                type="radio"
                id="sci-fi"
                name="genre"
                value="878"
                onChange={this.handleGenreInputChange}
              />
              <label>Sci-fi</label>
            </div>
          </div>
          <RollButton
            onClick={() => this.props.rollButtonClick(this.state.genre)}
          />
        </div>
      </div>
    );
  }
}

const RollButton: React.FunctionComponent<any> = ({ onClick }) => (
  <button className="roll-btn" onClick={onClick}>
    Roll
  </button>
);

export default MovieRouletteModal;
