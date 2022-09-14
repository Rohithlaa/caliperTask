import { ActionTypes } from '../Constants/ActionTypes';

const intialState = [];

const EventsReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENT:
      state = [...state, action.payload];
      return state;
    case ActionTypes.EDIT_EVENT:
      const updated = state.map((Event) =>
        Event.data.id === action.payload.data.id ? action.payload : Event
      );
      state = updated;
      return state;
    case ActionTypes.DELETE_EVENT:
      const filterEvent = state.filter(
        (item) => item.data.id !== action.payload.id
      );
      state = filterEvent;
      return state;
    default:
      return state;
  }
};

export default EventsReducer;
