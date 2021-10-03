import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import errorReducer from './error/error.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer
});

export default rootReducer;