import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
const StreamEdit = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id);
        //Fetch the current stream first.
        //If we dont and user enters /streams/edit, the state would be empty!
    }, []);
    console.log(props);
    //Because we use <route> there are several props that are automatically passed into the componenet
    if (!props.stream) {
        return <div>Loading... </div>;
        //When we first load the component state would be undefined, but then componenet will re-render again after the data for state is retrieved
    }
    return <div>{props.stream.title}</div>;
};

const mapStateToProps = (state, ownProps) => {
    //mapstateToProps aslso has a default param, ownProps
    //gets the props of the component
    return { stream: state.streams[ownProps.match.params.id] };
    //params represent the params of the URL
    //gets the stream that has matching id, this can be done due to how we structured the state with lodash's mapKeys; eg; x:{}'!
};
export default connect(mapStateToProps, { fetchStream })(StreamEdit);
