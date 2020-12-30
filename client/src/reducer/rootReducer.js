import { combineReducers} from 'redux'

import authReducer from './authReducer'

const rootReducer = combinerReducers({
    user: authReducer
})

export default rootReducer;