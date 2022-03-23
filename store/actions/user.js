import { SET_USER, UPDATE_USER_INFO } from "./actionTypes";

//Add user's information from payload
export const setUser = (payload) => {
  return (dispatch) => {
    console.log("DISPATCHED! ", payload);
    dispatch({
      type: SET_USER,
      payload: payload,
    });
  };
};
