import * as React from "react";
import "../home.scss";

class Loading extends React.Component<any, any> {
  render() {
    return (
      <div className="">
        <div className="card">
          <div className="img-container">
            <div className="loader"></div>
          </div>
          <div className="card-text">
            <div>Title:</div>
            <div>Language:</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
