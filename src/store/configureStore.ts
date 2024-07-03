// src/store/configureStore.ts

import { combineReducers, createStore } from 'redux';
import characterReducer from './characterReducer';

const rootReducer = combineReducers({
  characters: characterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
