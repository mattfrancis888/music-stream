import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, animateHeader } from "../../actions";

const StreamShow = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id);
        //Fetch the current stream first.
        //If we dont and user enters /streams/edit, the state would be empty!
        props.animateHeader(false);
    }, []);

    if (!props.stream) {
        return <div> Loading </div>;
    }

    const { title, description, streamLink } = props.stream;
    return (
        <React.Fragment>
            <iframe
                className="streamShowVideo"
                title="hi"
                src={streamLink}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <h1>{title}</h1>
            <h5>{description}</h5>
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchStream, animateHeader })(
    StreamShow
);
