import { FETCH_EVENTS } from "./actionTypes";

//Add user's information from payload
export const fetchEvents = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_EVENTS,
      payload: payload,
    });
  };
};
