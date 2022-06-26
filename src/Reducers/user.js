import { DEL_USER, SET_USER } from "../Actions/actionTypes";

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;

    case DEL_USER:
      return {};
    default:
      return state;
  }
}
