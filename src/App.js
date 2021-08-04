import React from "react";
import Landing from "./Landing";
import Details from "./Details";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <Route path="/" exact component={Landing} />

        <Switch>
          <Route path="/:id" children={<Details />} />
        </Switch>
      </main>
    </Router>
  );
}
