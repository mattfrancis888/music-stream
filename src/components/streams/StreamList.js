import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStreams, animateHeader, deleteStream } from "../../actions";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { MDBREAKPOINT } from "../../constants";
import hero from "../../videos/hero.mp4";
import mobilehero from "../../videos/mobilehero.mp4";
import Loading from "../Loading";
import Modal from "../Modal";

const StreamList = (props) => {
    useEffect(() => {
        props.animateHeader(true); //changes the
        //animateHeaderReducer state, so Header componenet re-renders
        props.fetchStreams();
    }, []);

    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const renderDeleteModal = (stream) => {
        //Re-remders component to show modal
        setShowDeleteModal(stream);
    };

    const renderAdmin = (stream) => {
        //Show edit and delete button in the stream list if a stream belongs to them
        //Will disappear when user signs out
        if (stream.userId === props.currentUserId) {
            return (
                <React.Fragment>
                    <button className="blackButton">
                        <Link to={`/streams/edit/${stream.id}`}>
                            <h5> Edit </h5>
                        </Link>
                    </button>

                    <button
                        onClick={() => {
                            renderDeleteModal(stream);
                        }}
                        className="blackButton"
                    >
                        <h5> Delete</h5>
                    </button>
                </React.Fragment>
            );
        }
    };

    const renderList = () => {
        return props.streams.map((stream) => {
            return (
                <div className="streamListContainer" key={stream.id}>
                    <iframe
                        className="streamListVideo"
                        title={stream.streamLink}
                        src={stream.streamLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="streamInfoWrap">
                        <Link to={`streams/${stream.id}`}>
                            <h1 className="streamListTitle">{stream.title}</h1>
                        </Link>
                        <div className="streamButtonsContainer">
                            <button className="whiteButton">
                                <Link to={`streams/${stream.id}`}>
                                    <h5> Info </h5>
                                </Link>
                            </button>

                            {renderAdmin(stream)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderContent = () => {
        if (props.streams.length === 0) {
            //If streams is being fetched
            //Need a div above loadingWrap because loadingWrap uses inline-flex
            return (
                <div style={{ margin: "auto" }}>
                    <Loading />
                </div>
            );
        } else {
            return <div className="streamsContainer">{renderList()}</div>;
        }
    };

    //Modal
    const renderModalActions = () => {
        if (showDeleteModal) {
            return (
                <React.Fragment>
                    <button
                        onClick={() => props.deleteStream(showDeleteModal.id)}
                        className="blackButton"
                    >
                        <h5>Delete</h5>
                    </button>
                    <Link to="/">
                        <button className="whiteButton">
                            <h5>Cancel</h5>
                        </button>
                    </Link>
                </React.Fragment>
            );
            //on OnClick,there's a param in deleteStream, so wrap with anonymous func
        }
    };
    const renderModalContent = () => {
        if (showDeleteModal) {
            return `Are you sure you want delete the stream with title: ${showDeleteModal.title} ?`;
        }
    };

    const renderModal = () => {
        if (!showDeleteModal) return null;
        else {
            return (
                <Modal
                    title="Delete Stream"
                    content={renderModalContent()}
                    actions={renderModalActions()}
                    onDismiss={() => setShowDeleteModal(null)}
                />
            );
        }
    };

    return (
        <React.Fragment>
            <div className="heroContainer">
                <h1 className="heroTitle">
                    All your favorite music videos here
                </h1>
                <MediaQuery query="(min-width: 0px)">
                    <video
                        className="heroVid"
                        autoPlay
                        preload="false"
                        loop
                        muted
                        playsInline
                        src={mobilehero}
                        alt="mobile hero"
                    ></video>
                </MediaQuery>
                <MediaQuery query={`(min-width:${MDBREAKPOINT})`}>
                    <video
                        className="heroVid"
                        autoPlay
                        preload="false"
                        loop
                        muted
                        playsInline
                        src={hero}
                        alt="hero"
                    ></video>
                </MediaQuery>
            </div>

            <div className="bodyContainer">
                <h1>Music Videos</h1>
                {renderContent()}
            </div>
            {renderModal()}
        </React.Fragment>
    );
};

//IOS fullscreens videos, so playsinline is added

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
    //Object.values :
    //all the objects inside state.streams will be put into an array };
};

// class StreamList extends React.Component {
//     componentDidMount() {
//         this.props.fetchStreams();
//     }

//     render() {
//         return <div>StreamList</div>;
//     }
// }

export default connect(mapStateToProps, {
    fetchStreams,
    animateHeader,
    deleteStream,
})(StreamList);
