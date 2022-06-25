import { SET_USER } from "../Actions/actionTypes";

export default function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
