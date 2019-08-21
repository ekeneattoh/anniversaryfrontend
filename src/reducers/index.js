import { combineReducers } from "redux";
import { reduceAnniversary } from "./AnniversaryReducer"

export default combineReducers({
    anniversary: reduceAnniversary
  });
  