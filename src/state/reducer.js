import { combineReducers } from 'redux';
import { reducer as apiReducer } from './api/reducer';
import { reducer as errorReducer } from './error/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as applicationReducer } from './application/reducer';


export const reducer = combineReducers({
	api: apiReducer,
	user: userReducer,
	error: errorReducer,
	application: applicationReducer,
});
