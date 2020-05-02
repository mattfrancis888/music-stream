import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
// const StreamList = (props) => {
//     const [streams, setStreams] = useState("");

//     useEffect(() => {
//         props.fetchStreams();
//     }, []);

//     return <div>StreamList</div>;
// };

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    render() {
        return <div>StreamList</div>;
    }
}
export default connect(null, { fetchStreams })(StreamList);
