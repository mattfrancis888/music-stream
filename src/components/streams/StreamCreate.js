import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";
//reduxForm acts like connect()

class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes [Which is done in Streamform]
        //after clicking the submit button
        this.props.createStream(formValues);
    };
    render() {
        return (
            <React.Fragment>
                <h3>Create A Stream</h3>
                <StreamForm onSubmit={this.onSubmit}></StreamForm>
            </React.Fragment>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);

// const formWrapped = reduxForm({
//     form: "streamCreate",
//     validate,
// })(StreamCreate);

// export default connect(null, { createStream })(formWrapped);
