import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/twitch.png";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
        <div className="header">
            <div>
                <Link to="/">
                    <img src={logo} alt="Twitch logo" />
                </Link>
            </div>
            <div>
                <GoogleAuth />
            </div>
        </div>
    );
};
export default Header;
