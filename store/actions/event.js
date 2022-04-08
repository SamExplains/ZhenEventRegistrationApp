import {
  FETCH_EVENTS,
  FIND_EVENT_DETAILS,
  FETCH_EVENT_DETAILS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_RESULT_EVENT_DETAILS,
  UPDATE_EVENT_CHECKLIST,
  UPDATE_EVENT_SEARCH_CHECKLIST,
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

export const setSearchResultEventDetails = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH_RESULT_EVENT_DETAILS,
      payload: payload,
    });
  };
};

export const updateEventChecklist = (payload) => {
  return (dispatch) =>
    dispatch({
      type: UPDATE_EVENT_CHECKLIST,
      payload: payload,
    });
};

export const updateEventSearchChecklist = (payload) => {
  return (dispatch) =>
    dispatch({
      type: UPDATE_EVENT_SEARCH_CHECKLIST,
      payload: payload,
    });
};
