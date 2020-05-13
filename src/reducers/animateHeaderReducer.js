import { ANIMATE_HEADER } from "../actions/types";
export default (state = false, action) => {
    switch (action.type) {
        case ANIMATE_HEADER:
            return { ...state, animateHeader: action.payload };
        default:
            return state;
    }
};
