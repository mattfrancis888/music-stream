import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../img/logo.png";
import GoogleAuth from "./GoogleAuth";

const Header = (props) => {
    const [offset, setOffset] = useState(0); //get scroll position
    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset); //re-renders onScroll
        };
    }, []);

    const renderCreate = () => {
        if (props.isSignedIn) {
            return (
                <div>
                    <button className="whiteButton">
                        <Link to="/streams/new">
                            <h5> Create Stream</h5>
                        </Link>
                    </button>
                </div>
            );
        }
    };

    return (
        <nav
            className={
                offset < 100 && props.headerAnimation.animateHeader === true
                    ? "navOffsetInitial"
                    : "navOffsetScroll"
            }
        >
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <nav className="createAndSignContainer">
                <GoogleAuth />
                {renderCreate()}
            </nav>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        headerAnimation: state.headerAnimation,
    };
};

export default connect(mapStateToProps, null)(Header);
