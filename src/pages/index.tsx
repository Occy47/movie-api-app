import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.scss";

import HomePage from "./home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
    </Router>
  );
}

export default App;
