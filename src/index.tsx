import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./store";

const Top = lazy(() => import("./pages/Top"));
const Night = lazy(() => import("./pages/Night"));
const Noon = lazy(() => import("./pages/Noon"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Result = lazy(() => import("./pages/Result"));
const Setting = lazy(() => import("./pages/Setting"));

import * as serviceWorker from "./serviceWorker";

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact={true} path="/" component={Top} />
            <Route path="/night" component={Night} />
            <Route path="/noon" component={Noon} />
            <Route path="/result" component={Result} />
            <Route path="/setting" component={Setting} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
