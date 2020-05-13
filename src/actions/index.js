// import streams from "../apis/streams";
// above is for local json database

import streams from "../axiosConfig";
// axios config used for online json database

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

//Note: not refactored to work in JSON-server online because
///I don't want users manipulating the database
export const createStream = (formValues) => async (dispatch, getState) => {
    //Must use redux thunk because action creators must return a plain object.
    //And we are tyring to return const result = await axios.get(...) -> (eg; return {payload: result})
    //https://www.udemy.com/course/react-redux/learn/lecture/12586860#announcements
    // return async (dispatch) => {
    //     //dispatch and getState is automatically passed in by redux-thunk; dispatch acts like "return"
    // };
    const { userId } = getState().auth;
    //getState() gets all our states
    //Get userID object from auth state (defined state in reducers/index.js).

    //const response = await streams.post("/streams", formValues });
    //formValues is an object

    const response = await streams.post("/streams", { ...formValues, userId });
    //Add userid object to formValues object
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
    // const response = await streams.get("/streams");
    // dispatch({
    //     type: FETCH_STREAMS,
    //     payload: response.data,
    // });
    // above is local json-server database req

    //below is online json server database req
    const response = await streams.get("/");

    dispatch({
        type: FETCH_STREAMS,
        payload: response.data.streams,
    });
};

export const fetchStream = (id) => async (dispatch) => {
    // const response = await streams.get(`/streams/${id}`);
    // dispatch({
    //     type: FETCH_STREAM,
    //     payload: response.data,
    // });
    // above is local json-server database req

    // below is online json server database req
    const response = await streams.get("/");
    dispatch({
        type: FETCH_STREAM,
        payload: response.data.streams.filter(
            (stream) => stream.id === parseInt(id)
        )[0],
    });
};

//Note: not refactored to work in JSON-server online because
///I don't want users manipulating the database
export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`streams/${id}`, formValues);
    //put updates all the object properties! It can delete some porperties if some properties are missing
    //use patch if you only want to update specific properties. In this case, patch is used because formValues only has
    //title and description; in the object. By using patch, we don't remove the userID and id properties
    dispatch({
        type: EDIT_STREAM,
        payload: response.data,
    });
    history.push("/");
};

//Note: not refactored to work in JSON-server online because
///I don't want users manipulating the database
export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`streams/${id}`);
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
