import EventsReducer from './EventsReducer';

import { combineReducers } from 'redux';

const reducers = combineReducers({
  Events: EventsReducer,
});

export default reducers;
