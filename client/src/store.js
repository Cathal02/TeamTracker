import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer/authReducer';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
	rootReducer,
	{ user: null, isUserLoggedIn: false },
	composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;
