import React from "react";
import { Field, reduxForm } from "redux-form";
//reduxForm acts like connect()

const StreamCreate = (props) => {
    const renderError = ({ error, touched }) => {
        if (touched && error) {
            //Touched (for input) will be false at first
            //When clicked and then clicked otuside of the input, it will be true
            return <div>{error}</div>;
        }
    };

    const renderInput = ({ input, label, meta }) => {
        console.log(meta);
        //"component" automatically passes props to argument, it has {input properties and meta properties}
        //"label" automatically passes props to arguments
        return (
            <div>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {renderError(meta)}
            </div>
        );
        //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
        //props to <input>
    };

    const onSubmit = (formValues) => {
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes
        //after clicking the submit button
        //console.log(formValues);
    };

    return (
        <React.Fragment>
            <div>StreamCrate</div>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <Field
                    name="title"
                    component={renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={renderInput}
                    label="Enter Description"
                />
                <button>Submit</button>
            </form>
        </React.Fragment>
    );
};

const validate = (formValues) => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.title) {
        //user did not enter title, so undefined
        errors.title = "You must enter a title";
        //Must be the same name as field name! The "error" property in {meta} would receive thi
    }

    if (!formValues.description) {
        errors.description = "You must enter a descritpion";
    }
    return errors;
    //Erors is going to be passed to renderInput's meta
};

export default reduxForm({
    form: "streamCreate",
    validate,
})(StreamCreate);
