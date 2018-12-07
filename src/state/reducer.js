import { combineReducers } from 'redux';
import { reducer as apiReducer } from './api/reducer';


export const reducer = combineReducers({
	api: apiReducer,
});
