import {combineReducers} from "redux";
import contactFormReducer from "./contactFormReducer"
//import reducer from "./isShowingFromReducer";

const reducers = combineReducers({
    contactForm: contactFormReducer
});

export default reducers;