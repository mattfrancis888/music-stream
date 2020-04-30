import React from "react";
import { Field, reduxForm } from "redux-form";
//reduxForm acts like connect()

const StreamCreate = (props) => {
    console.log(props);

    const renderInput = ({ input, label }) => {
        //"component" automatically passes props to argument, it has {input properties and meta properties}
        //"label" automatically passes props to arguments
        return (
            <div>
                <label>{label}</label>
                <input {...input} />
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
        console.log(formValues);
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

export default reduxForm({
    form: "streamCreate",
})(StreamCreate);
