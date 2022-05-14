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
  SET_SEARCH_RESULT_EVENT_DETAILS,
  UPDATE_EVENT_CHECKLIST,
  UPDATE_EVENT_SEARCH_CHECKLIST,
  SET_PROFILE_TAB_EVENTS,
  SET_PROFILE_TAB_EVENT_DETAILS,
  UPDATE_PROFILE_EVENT_DETAILS,
  FETCH_TAB_EVENTS,
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
  // hold search result event object details ONLY when the EventCard component is clicked through Search compoent
  searchResultDetails: {},
  // holds tab events results
  tabEvents: [],
  // hold selected event details from the item selected from either tab
  tabEventDetails: {},
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
      return {
        ...state,
        activeEvent: event[0],
      };
      break;
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [...action.payload],
      };
      break;
    case SET_SEARCH_RESULT_EVENT_DETAILS:
      return {
        ...state,
        searchResultDetails: action.payload,
      };
      break;
    case UPDATE_EVENT_CHECKLIST:
      const eventIndex = state.allEvents.findIndex((el) => {
        return el.id === action.payload.id;
      });
      // Event details update
      state.allEvents[eventIndex] = action.payload;
      return {
        ...state,
        allEvents: [...state.allEvents],
      };
      break;
    case UPDATE_EVENT_SEARCH_CHECKLIST:
      // Searched event details update
      const searchEventIndex = state.searchResults.findIndex((el) => {
        return el.id === action.payload.id;
      });
      // Event details update
      state.searchResults[searchEventIndex] = action.payload;
      return {
        ...state,
        searchResults: [...state.searchResults],
      };
      break;
    case SET_PROFILE_TAB_EVENTS:
      return {
        ...state,
        tabEvents: [...action.payload],
      };
      break;
    //
    case SET_PROFILE_TAB_EVENT_DETAILS:
      const tabEvent = state.tabEvents.filter((el) => {
        return el.id === action.payload;
      });
      return {
        ...state,
        tabEventDetails: tabEvent[0],
      };
      break;
    case UPDATE_PROFILE_EVENT_DETAILS:
      // find index
      const editEventIndex = state.tabEvents.findIndex((el) => {
        return el.id === action.payload.id;
      });
      // Event details update
      state.tabEvents[editEventIndex] = action.payload;
      return {
        ...state,
        tabEvents: [...state.tabEvents],
      };
      break;
    case FETCH_TAB_EVENTS:
      // FETCH TAB EVENTS
      return {
        ...state,
        tabEvents: [...state.tabEvents],
      };
    default:
      return state;
  }
};

export default reducer;
