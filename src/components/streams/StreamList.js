import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

const StreamList = (props) => {
    useEffect(() => {
        props.fetchStreams();
    }, []);

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
                <div className="streamListContainer" key={stream.id}>
                    <iframe
                        className="streamShowVideo"
                        title={stream.streamLink}
                        src={stream.streamLink}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
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

    return <div className="streamsContainer">{renderList()}</div>;
};

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
