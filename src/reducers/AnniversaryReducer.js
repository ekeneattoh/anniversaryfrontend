import {
  SAVE_ANNIVERSARY,
  SAVE_ANNIVERSARY_ERR,
  CLEARANNIVERSARYMSG,
  GET_ANNIVERSARY_DATA,
  GET_ANNIVERSARY_DATA_ERR
} from "../actions/anniversaryactions"

const anniversary_state = {

  save_anniversary_api_msg: null,
  save_anniversary_api_err: null,
  get_anniversary_api_msg: null,
  get_anniversary_api_err: null
}

export const reduceAnniversary = (state = anniversary_state, action) => {
  switch (action.type) {
    case SAVE_ANNIVERSARY:
      let msg = "Your Anniversary has been saved";
      state.save_anniversary_api_err = null;
      return { ...state, save_anniversary_api_msg: msg };
    case SAVE_ANNIVERSARY_ERR:
      let error = action.payload.response.data.result;
      return { ...state, save_anniversary_api_err: error };
    case CLEARANNIVERSARYMSG:
      state.save_anniversary_api_msg = null;
      state.save_anniversary_api_err = null;
      state.get_anniversary_api_msg = null;
      state.get_anniversary_api_err = null;
      return { ...state };
    case GET_ANNIVERSARY_DATA:
      let anniversary_data = action.payload.data.result
      return {...state, get_anniversary_api_msg: anniversary_data};
    case GET_ANNIVERSARY_DATA_ERR:
      let get_anniversary_error = "Bad request or data not found"
      return {...state, get_anniversary_api_err: get_anniversary_error};
    default:
      return state;
  }
}