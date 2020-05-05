import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";
const StreamDelete = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id);
    }, []);
    //empty useEffect acts like a ComponentDidMount()
    //Reminder that <Route> in App.js passes a bunch of props to the componenet
    //id would be the paramter name of the url, we are trying to get the value of it

    const renderActions = () => {
        const id = props.match.params.id;
        return (
            <React.Fragment>
                <button
                    onClick={() => props.deleteStream(id)}
                    className="blueButton"
                >
                    Delete
                </button>
                <Link to="/">
                    <button className="greyButton">Cancel</button>
                </Link>
            </React.Fragment>
        );
        //on OnClick,there's a param in deleteStream, so wrap with anonymous func
    };

    const renderContent = () => {
        if (!props.stream) {
            //stream can still be loading after props.fetchStream calls it to
            //fill the state
            return "Are you sure you want to delete this stream?";
        }
        //But once the state has loaded and the component is re-rendered:
        return `Are you sure you want delete the stream with title: ${props.stream.title}`;
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => history.push("/")}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    //mapStateToProps also has ownprops param
    return { stream: state.streams[ownProps.match.params.id] };
    //params represent the params of the URL
    //gets the stream that has matching id, this can be done due to how we structured the state with lodash's mapKeys; eg; x:{}'!
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
