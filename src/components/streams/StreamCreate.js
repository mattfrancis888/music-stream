import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStream, animateHeader } from "../../actions";
import StreamForm from "./StreamForm";
//reduxForm acts like connect()
import festivalSmall from "../../img/festivalSmall.jpg";
import festivalMedium from "../../img/festivalMedium.jpg";
import festivalLarge from "../../img/festivalLarge.jpg";

const StreamCreate = (props) => {
    useEffect(() => {
        props.animateHeader(false);
    }, []);
    const onSubmit = (formValues) => {
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes [Which is done in Streamform]
        //after clicking the submit button
        //DISABLED FOR DEPLOYMENT so that users can't manipuate online JSON database
        //comment out if want to use for local JSON-database
        // props.createStream(formValues);
    };
    return (
        <React.Fragment>
            <img
                src={festivalLarge}
                className="streamCreateEditHero"
                srcset={`${festivalSmall} 750w,
                ${festivalMedium} 1000w, 
                ${festivalLarge} 1200w`}
                alt="festival hero img"
            />
            <div className="streamCreateEditOutline">
                <div className="streamCreateEditContainer">
                    <h3>Create A Stream</h3>
                    <StreamForm onSubmit={onSubmit}></StreamForm>
                </div>
            </div>
        </React.Fragment>
    );
};

export default connect(null, { createStream, animateHeader })(StreamCreate);

// const formWrapped = reduxForm({
//     form: "streamCreate",
//     validate,
// })(StreamCreate);

// export default connect(null, { createStream })(formWrapped);
