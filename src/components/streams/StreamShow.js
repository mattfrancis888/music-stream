import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, animateHeader } from "../../actions";
import anime from "animejs/lib/anime.es.js";
import Loading from "../Loading";

const StreamShow = (props) => {
    useEffect(() => {
        props.animateHeader(false);

        props.fetchStream(props.match.params.id);
        //Fetch the current stream first.
        //If we dont and user enters /streams/edit, the state would be empty!
    }, []);
    useEffect(() => {
        //Usually you could put anime on componentDidMount (must wait for elements to render before using animation),
        // but since we are rendering the  <Loading> if block first,
        //anime js  does not recognize streamShowInfoWrap because it was not an elmeent in return(...)
        //once stream does get it's data, the component gets re-rendered but!
        //anime.js dosen't re-render the animation. So we are left with no animation!
        //Hence why we need to put it here to "call it again" via componentDidUpdate
        anime({
            targets: ".streamShowInfoWrap",
            // Properties
            translateX: [-100, 0],
            // Property Parameters
            duration: 800,
            easing: "linear",
            // Animation Parameters
            // direction: "alternate",
        });
    }, [props.stream]);

    const renderContent = () => {
        if (!props.stream) {
            return (
                <div className="streamShowLoadingContainer">
                    <Loading />
                </div>
            );
        } else {
            const { title, description, streamLink } = props.stream;
            return (
                <div className="streamShowContainer">
                    <iframe
                        className="streamShowVideo"
                        title={title}
                        src={streamLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className="streamShowInfoWrap">
                        <h1 className="streamShowTitle">{title}</h1>
                        <p className="streamShowDesc">{description}</p>
                    </div>
                </div>
            );
        }
    };

    return <React.Fragment>{renderContent()}</React.Fragment>;
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchStream, animateHeader })(
    StreamShow
);
