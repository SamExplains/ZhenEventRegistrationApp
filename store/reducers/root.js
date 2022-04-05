import {
  UPDATE_TAB,
  FETCH_USERS,
  UPDATE_USER,
  UPDATE_SHOW_USER,
  UPDATE_USER_INFO,
  UPDATE_SHOW_USER_INFO,
  UPDATE_SHOW_EVENT_INFO,
  RENDERED_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT_TIME,
  SET_USER,
  SET_AUTENTICATED,
  UPDATE_AUTENTICATED,
  FETCH_EVENTS,
  FIND_EVENT_DETAILS,
  FETCH_EVENT_DETAILS,
  SET_SEARCH_RESULTS,
} from "../actions/actionTypes";

const initialState = {
  // currentUser: null,
  currentUser: { name: "username" },
  // set after login
  authenticated: false,
  // holds events on events screen
  allEvents: [],
  allEventsView: true,
  // Sets to event details when a event card is clicked
  activeEvent: {},
  // holds search results
  searchResults: [],
  // Not in use
  currentUserAttending: false,
  showUser: null,
  allUsers: [],
  currentUserInfo: [],
  showUserInfo: [],
  showEventInfo: [],
  showEventId: null,
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
        // resets to null after logout
        currentUser: { name: "username" },
      };
      break;
    case FETCH_EVENTS:
      // Update events with new batch of events
      return {
        ...state,
        allEvents: [...state.allEvents, ...action.payload],
      };
      break;
    case FIND_EVENT_DETAILS:
      const event = state.allEvents.filter((el) => {
        return el.id === action.payload;
      });
      // console.log("Store: FIND_EVENT_DETAILS: ", event[0]);
      return {
        ...state,
        activeEvent: event[0],
      };
      break;
    case SET_SEARCH_RESULTS:
      console.log("Store: SET_SEARCH_RESULTS");
      return {
        ...state,
        searchResults: [...action.payload],
      };
      break;
    default:
      return state;
  }
};

export default reducer;
