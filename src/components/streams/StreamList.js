import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import anime from "animejs/lib/anime.es.js";
import { MDBREAKPOINT } from "../../constants";
import hero from "../../videos/hero.mp4";
import mobilehero from "../../videos/mobilehero.mp4";

const StreamList = (props) => {
    useEffect(() => {
        props.fetchStreams();
    }, []);

    // let animation = anime({
    //     targets: ".streamListContainer",
    //     // Properties
    //     translateX: [-100, 0],
    //     // Property Parameters
    //     duration: 350,
    //     easing: "linear",
    //     // Animation Parameters
    //     // direction: "alternate",
    // });

    const renderAdmin = (stream) => {
        //Show edit and delete button in the stream list if a stream belongs to them
        //Will disappear when user signs out
        if (stream.userId === props.currentUserId) {
            return (
                <div className="editAndDeleteWrap">
                    <Link to={`/streams/edit/${stream.id}`}>
                        <button className="whiteButton"> Edit </button>
                    </Link>
                    <Link to={`streams/delete/${stream.id}`}>
                        <button className="greyButton"> Delete </button>
                    </Link>
                </div>
            );
        }
    };

    const renderList = () => {
        return props.streams.map((stream) => {
            return (
                <div
                    className="streamListContainer"
                    onMouseOver={console.log("hover")}
                    key={stream.id}
                >
                    <iframe
                        className="streamShowVideo"
                        title={stream.streamLink}
                        src={stream.streamLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="streamInfoWrap">
                        {renderAdmin(stream)}
                        <Link to={`streams/${stream.id}`}>
                            <h1 className="streamListTitle">{stream.title}</h1>
                        </Link>
                    </div>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="heroContainer">
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
            <div className="streamsContainer">{renderList()}</div>
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

export default connect(mapStateToProps, { fetchStreams })(StreamList);
