import React from "react";

class GoogleAuth extends React.Component {
    //Handle if user is signed in or not
    state = { isSignedIn: null };
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "375190642457-280r9ivs1gettt0pi12mug6jap8kltlo.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    this.auth.isSignedIn.listen(this.onAuthChange);
                    //checks if user signs in or signs out during a session and updates it.
                    //If listener is not added, app won't re-render
                });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    checkAuth() {
        if (this.state.isSignedIn === true)
            return (
                <button className="sign-in-out-box" onClick={this.onSignOut}>
                    Sign Out
                </button>
            );
        else if (this.state.isSignedIn === false)
            return (
                <button className="sign-in-out-box" onClick={this.onSignIn}>
                    Sign In (With Google)
                </button>
            );
        else if (this.state.isSignedIn === null) {
            return null;
        }
    }

    render() {
        return <div> {this.checkAuth()} </div>;
    }
}

export default GoogleAuth;
