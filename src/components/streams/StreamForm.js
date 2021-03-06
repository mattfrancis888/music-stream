import React from "react";
import { Field, reduxForm } from "redux-form";

//Form that will be re-used in many components
class StreamForm extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            //Touched (for input) will be false at first
            //When clicked and then clicked otuside of the input, it will be true
            return <div className="errorText">{error}</div>;
        }
    };

    renderInput = ({ input, label, meta }) => {
        //"component" property automatically passes props to argument, it has {input properties and meta properties}
        //"label" automatically passes props to arguments
        return (
            <div>
                <label>{label}</label>
                <input className="createInputs" {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
        //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
        //props to <input>
    };

    renderTextArea = ({ input, label, meta }) => {
        //"component" property automatically passes props to argument, it has {input properties and meta properties}
        //"label" automatically passes props to arguments
        return (
            <div>
                <label>{label}</label>
                <textarea
                    className="createInputs"
                    {...input}
                    autoComplete="off"
                />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        //event.preventDefault() is automatically called with handleSubmit, a redux-form property
        //form values are the values from the fields that redux-form automatiacally passes [which is done in streamForm]
        //after clicking the submit button
        this.props.onSubmit(formValues);
    };
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="createFormSection">
                        <h1> Enter Title </h1>
                        <Field name="title" component={this.renderInput} />
                    </div>
                    <div className="createFormSection">
                        <h1> Enter Description</h1>
                        <Field
                            name="description"
                            component={this.renderTextArea}
                        />
                    </div>
                    <div className="createFormSection">
                        <h1> Enter Stream Embed Link</h1>
                        <Field name="streamLink" component={this.renderInput} />
                        <h1>How Do I Find The Embed Link?</h1>
                        <ol>
                            <li>
                                Click "Share" under the youtube video title.
                            </li>
                            <li> Click "Embed".</li>
                            <li> Copy the "src" link.</li>
                        </ol>
                    </div>
                    <button className="redButton">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

const validate = (formValues) => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.title) {
        //user did not enter title, so undefined
        errors.title = "You must enter a title";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }

    if (!formValues.description) {
        errors.description = "You must enter a descritpion";
    }

    if (!formValues.streamLink) {
        errors.streamLink = "You must enter a link";
    }

    const url = "https://www.youtube.com/embed/";
    if (formValues.streamLink) {
        if (!formValues.streamLink.includes(url)) {
            errors.streamLink = `URL must start with ${url}`;
        }
    }

    return errors;
    //Erors is going to be passed to renderInput's meta
};

export default reduxForm({
    form: "streamForm",
    validate,
})(StreamForm);

// const formWrapped = reduxForm({
//     form: "streamCreate",
//     validate,
// })(StreamCreate);

// export default connect(null, { createStream })(formWrapped);
