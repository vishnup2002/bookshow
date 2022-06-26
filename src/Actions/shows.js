import { ADD_MOVIES } from "./actionTypes";

export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}
