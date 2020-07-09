import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

import HomePage from "./home";
import DetailsPage from "./details";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/details/:id" component={DetailsPage} />
    </Router>
  );
}

export default App;
