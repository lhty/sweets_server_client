// import { combineReducers } from "redux";
const { combineReducers } = require("redux");
import { routerReducer } from "react-router-redux";
import viewReducer from "./viewReducer";

const rootReducer = combineReducers({
  router: routerReducer,
  view: viewReducer,
});

export default rootReducer;
