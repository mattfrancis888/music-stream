import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
const Loading = () => {
    //Animate loading

    useEffect(() => {
        //Must wait for animation to render before animating
        anime({
            targets: ".loadingCircle",
            translateY: [
                { value: 75, duration: 500 },
                { value: 0, duration: 800 },
            ],
            direction: "alternate",
            easing: "easeInOutQuad",
            delay: function () {
                return anime.random(0, 1000);
            },
            // autoplay: false,
            loop: true,
            elasticity: 200,
        });
    }, []);
    return (
        <div className="loadingWrap">
            <div className="loadingCircle"></div>
            <div className="loadingCircle"></div>
            <div className="loadingCircle"></div>
        </div>
    );
};

export default Loading;
