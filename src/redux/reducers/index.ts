import {combineReducers} from 'redux';

import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  itemReducer: itemReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
