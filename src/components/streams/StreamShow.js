import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, animateHeader } from "../../actions";
import anime from "animejs/lib/anime.es.js";

const StreamShow = (props) => {
    useEffect(() => {
        props.animateHeader(false);

        props.fetchStream(props.match.params.id);
        //Fetch the current stream first.
        //If we dont and user enters /streams/edit, the state would be empty!
    }, []);

    anime({
        targets: ".streamShowTitle .streamShowDesc",
        // Properties
        translateX: [-100, 0],
        // Property Parameters
        duration: 350,
        easing: "linear",
        // Animation Parameters
        // direction: "alternate",
    });

    if (!props.stream) {
        return <div> Loading </div>;
    }

    const { title, description, streamLink } = props.stream;
    return (
        <React.Fragment>
            <div className="streamShowContainer">
                <iframe
                    className="streamShowVideo"
                    title="hi"
                    src={streamLink}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <div className="streamShowInfoWrap">
                    <h1 className="streamShowTitle">{title}</h1>
                    <p className="streamShowDesc">{description}</p>
                </div>
            </div>
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
