import React from 'react';
import logo from '../img/twitch.png';

const Header = () =>{
    return(
        <div class="header">
            <div>
                <img src={logo}/>
            </div>
            <div>
                <div class="sign-in-box">Sign In</div>
            </div>
        </div>
    )
}
export default Header;