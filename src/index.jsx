import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../src/state/reducers/rootReducer";
import axios from "axios";

const store = createStore(rootReducer);

axios.defaults.baseURL = "https://reactive-herald-api.herokuapp.com/api/v1/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
