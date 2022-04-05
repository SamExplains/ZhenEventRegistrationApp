import {
  FETCH_EVENTS,
  FIND_EVENT_DETAILS,
  FETCH_EVENT_DETAILS,
  SET_SEARCH_RESULTS,
} from "./actionTypes";

//Add user's information from payload
export const fetchEvents = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_EVENTS,
      payload: payload,
    });
  };
};

export const findEventDetails = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FIND_EVENT_DETAILS,
      payload: payload,
    });
  };
};

export const fetchEventDetails = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_EVENT_DETAILS,
      payload: payload,
    });
  };
};

export const setSearchResults = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: payload,
    });
  };
};
