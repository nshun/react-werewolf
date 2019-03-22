import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import App from "./pages/App";
import Night from "./pages/Night";
import Noon from "./pages/Noon";
import NotFound from "./pages/NotFound";
import Setting from "./pages/Setting";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <Route exact={true} path="/" component={App} />
          <Route path="/night" component={Night} />
          <Route path="/noon" component={Noon} />
          <Route path="/setting" component={Setting} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
