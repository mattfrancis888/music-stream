import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

const StreamList = (props) => {
    const [streams, setStreams] = useState("");

    useEffect(() => {
        props.fetchStreams();
    }, []);

    console.log(props.streams);
    const renderList = () => {
        return props.streams.map((stream) => {
            return (
                <div className="streamListContainer">
                    <h1 className="streamListTitle">{stream.title}</h1>
                    <h1 className="streamListDesc">{stream.description}</h1>
                </div>
            );
        });
    };
    return <div>{renderList()}</div>;
};

const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams) };
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
