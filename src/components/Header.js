import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../img/logo.png";
import GoogleAuth from "./GoogleAuth";

const Header = (props) => {
    const renderCreate = () => {
        if (props.isSignedIn) {
            return (
                <div>
                    <Link to="/streams/new">
                        <button className="whiteButton">
                            <h5> Create Stream</h5>
                        </button>
                    </Link>
                </div>
            );
        }
    };

    return (
        <div className="header">
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="creatAndSignContainer">
                <GoogleAuth />
                {renderCreate()}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, null)(Header);
