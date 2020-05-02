import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    //Handle if user is signed in or not
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "375190642457-280r9ivs1gettt0pi12mug6jap8kltlo.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    //Checks if user is already signed in or not
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());

                    this.auth.isSignedIn.listen(this.onAuthChange);
                    //checks if user signs in or signs out during a session
                    //If listener is not added, app won't re-render
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        //Updates the state of IsSignedIn by calling action creators, which calls the reducers

        //let isSignedIn = this.auth.isSignedIn.get();
        //Listener automatically passes a boolean for isSignedIn
        if (isSignedIn === true) {
            this.props.signIn(this.auth.currentUser.get().getId()); //get user's oAuth id when they sign in
        } else if (isSignedIn === false) {
            this.props.signOut();
        }
    };

    signInClick = () => {
        this.auth.signIn();
    };

    signOutClick = () => {
        this.auth.signOut();
    };

    checkAuth() {
        if (this.props.isSignedIn === true)
            return (
                <button className="blueBottom" onClick={this.signOutClick}>
                    Sign Out
                </button>
            );
        else if (this.props.isSignedIn === false)
            return (
                <button className="blueBottom" onClick={this.signInClick}>
                    Sign In (With Google)
                </button>
            );
        else if (this.props.isSignedIn === null) {
            return null;
        }
    }

    render() {
        return <div> {this.checkAuth()} </div>;
    }
}
const mapStateToProps = (state) => {
    //Get state data that is stored in auth reducer via mapStateToProps (refer to index.js)
    //State data will be passed to the component's props
    return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
//signin: signin = signIn
//sign in and singout is available as props now because of connect()
