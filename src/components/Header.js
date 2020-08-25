import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../img/logo.png";
import GoogleAuth from "./GoogleAuth";
import { useHistory } from "react-router-dom";

const Header = (props) => {
    const history = useHistory();
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
                    <button
                        onClick={() => {
                            history.push("/streams/new");
                        }}
                        className="whiteButton"
                    >
                        <h5> Create Stream</h5>
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
