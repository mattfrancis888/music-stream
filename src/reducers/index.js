import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import streamReducer from "./streamReducer";
import animateHeaderReducer from "./animateHeaderReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer,
    headerAnimation: animateHeaderReducer,
});
