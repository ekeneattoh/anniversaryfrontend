import {
  SAVE_ANNIVERSARY,
  SAVE_ANNIVERSARY_ERR,
  CLEARANNIVERSARYMSG
} from "../actions/anniversaryactions"

const anniversary_state = {

  save_anniversary_api_msg: null,
  save_anniversary_api_err: null
}

export const reduceAnniversary = (state = anniversary_state, action) => {
  switch (action.type) {
    case SAVE_ANNIVERSARY:
      let msg = "Your Anniversary has been saved";
      state.save_anniversary_api_err = null;
      return { ...state, save_anniversary_api_msg: msg };
    case SAVE_ANNIVERSARY_ERR:
      let error = action.payload.response.data.error_message;
      return { ...state, save_anniversary_api_err: error };
    case CLEARANNIVERSARYMSG:
      state.save_anniversary_api_msg = null;
      state.save_anniversary_api_err = null;
      return { ...state };
    default:
      return state;
  }
}