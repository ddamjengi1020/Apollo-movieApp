import React from "react";
import { GlobalStyle } from "./GlobalStyles";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={Detail} />
      </Router>
    </>
  );
}

export default App;
