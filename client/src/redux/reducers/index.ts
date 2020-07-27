// import { combineReducers } from "redux";
const { combineReducers } = require("redux");
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
  router: routerReducer,
});

export default rootReducer;
