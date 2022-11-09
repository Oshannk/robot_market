import {combineReducers} from 'redux';

import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  robots: itemReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
