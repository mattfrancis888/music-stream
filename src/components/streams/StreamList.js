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
                <div>
                    <Link to={`/streams/edit/${stream.id}`}>
                        <button className="blueButton"> EDIT </button>
                    </Link>
                    <Link to={`streams/delete/${stream.id}`}>
                        <button className="redButton"> DELETE </button>
                    </Link>
                </div>
            );
        }
    };

    const renderCreate = () => {
        if (props.isSignedIn) {
            return (
                <div>
                    <Link to="/streams/new">
                        <button className="blueButton"> Create Stream </button>
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
                    <Link to={`streams/${stream.id}`}>
                        <h1 className="streamListTitle">{stream.title}</h1>
                    </Link>
                    <h1 className="streamListDesc">{stream.description}</h1>
                    {renderAdmin(stream)}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div>{renderList()}</div>
            {renderCreate()}
        </React.Fragment>
    );
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
