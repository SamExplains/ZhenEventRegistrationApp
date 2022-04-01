import {
  SET_USER,
  UPDATE_USER_INFO,
  SET_AUTENTICATED,
  UPDATE_AUTENTICATED,
} from "./actionTypes";

//Add user's information from payload
export const setUser = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: payload,
    });
  };
};

export const setAuthenticated = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_AUTENTICATED,
      payload: payload,
    });
  };
};

export const updateAuthenticated = (payload) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AUTENTICATED,
      payload: payload,
    });
  };
};
