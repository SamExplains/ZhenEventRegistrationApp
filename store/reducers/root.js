import {
  UPDATE_TAB,
  FETCH_USERS,
  UPDATE_USER,
  UPDATE_SHOW_USER,
  UPDATE_USER_INFO,
  UPDATE_SHOW_USER_INFO,
  UPDATE_SHOW_EVENT_INFO,
  RENDERED_EVENTS,
  FETCH_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT_TIME,
  SET_USER,
  SET_AUTENTICATED,
  UPDATE_AUTENTICATED,
} from "../actions/actionTypes";

const initialState = {
  // currentUser: null,
  currentUser: { name: "username" },
  authenticated: false,
  currentUserAttending: false,
  showUser: null,
  allUsers: [],
  currentUserInfo: [],
  showUserInfo: [],
  showEventInfo: [],
  showEventId: null,
  allEvents: [],
  allEventsView: true,
  selectedEventTime: 0,
  tab: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
      break;
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
      break;
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
      break;
    case SET_AUTENTICATED:
      return {
        ...state,
        authenticated: action.payload,
      };
      break;
    case UPDATE_AUTENTICATED:
      return {
        ...state,
        authenticated: action.payload,
        currentUser: { name: "username" },
      };
      break;
    default:
      return state;
  }
};

export default reducer;
