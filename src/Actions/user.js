import { DEL_USER, SET_USER } from "./actionTypes";

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function delUser() {
  return {
    type: DEL_USER,
  };
}
