import {createStore} from "redux"
import reducers from "./reducers/index"

/*
export const store = createStore(
    reducers,
    {}
)
*/

const store = createStore(reducers);
export default store;