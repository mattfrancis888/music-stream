import React from "react";
import logo from "../img/twitch.png";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
        <div className="header">
            <div>
                <img src={logo} alt="Twitch logo" />
            </div>
            <div>
                <GoogleAuth />
            </div>
        </div>
    );
};
export default Header;
