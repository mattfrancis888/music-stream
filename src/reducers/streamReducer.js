import _ from "lodash";
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from "../actions/types";
export default (state = {}, action) => {
    //Update local state after data retrieval from axios via action creators
    switch (action.type) {
        //wrapped with { }
        //ti reuturn a new object;because reducer won't update unless it's a new object
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        //mapKeys returns a object, we want to get the key value pairs out of it
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        //payload is the ID itself
        //omit automatically creates a new object
        default:
            return state;
    }
};
