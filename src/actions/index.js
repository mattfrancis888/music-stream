// import streams from "../apis/streams";
// above is for local json database

import streams from "./axiosConfig";
// axios used for online json database

import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    ANIMATE_HEADER,
} from "./types";

import history from "../history";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const createStream = (formValues) => async (dispatch, getState) => {
    //Note:Uses redux thunk to allow async and await funcitonality

    const { userId } = getState().auth;
    //getState() gets all our states
    //Get userID object from auth state (defined state in reducers/index.js).

    //Add userid object to formValues object
    const response = await streams.post("/streams", { ...formValues, userId });
    dispatch({
        type: CREATE_STREAM,
        payload: response.data,
    });
    //Axios returns a json object that you need to access via .data to get the data
    //post to streams array in db.json. Changing "/sterams" to other names will result in data
    //not updating to streams array

    history.push("/"); //Go to / after creating a stream
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get("/streams");
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data.streams,
    });
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data,
    });
};

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    //put updates all the object properties! It can delete some porperties if some properties are missing
    //use patch if you only want to update specific properties. In this case, patch is used because formValues only has
    //title and description; in the object. By using patch, we don't remove the userID and id properties
    dispatch({
        type: EDIT_STREAM,
        payload: response.data,
    });
    history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id,
    });
    //  history.push("/");
    //StreamList's url, "/" re-renders without history.push();
    //also history.push() won't "reset" react's hook values
};

export const animateHeader = (shouldAnimate) => {
    return {
        type: ANIMATE_HEADER,
        payload: shouldAnimate,
    };
};
