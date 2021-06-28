//const { bindActionCreators } = require("redux");
import {Action} from "../action_types"

const initialState = {
    isShowingForm: true
};

const reducer = (state = initialState, action) => {

    switch(action.type){

        case Action.IS_FILLING_FORM:
            
            return {...state, isShowingForm: true};

        case Action.IS_SUBMITTED:
            return {...state, isShowingForm: false};

        default:
            return state;

    }
}

export default reducer;