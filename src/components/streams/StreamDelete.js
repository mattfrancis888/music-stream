import React from "react";
import Modal from "../Modal";
import history from "../../history";
const StreamDelete = () => {
    const actions = (
        <React.Fragment>
            <button className="blueButton">Delete</button>
            <button className="greyButton">Cancel</button>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <div>StreamCrate</div>;
            <Modal
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={actions}
                onDismiss={() => history.push("/")}
            />
        </React.Fragment>
    );
};

export default StreamDelete;
