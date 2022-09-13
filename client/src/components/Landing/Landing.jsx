import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
import background from  "../../assets/background.webm" 

function Landing () {
    return (
        <div className="hero">
            <video className='backVideo' autoPlay loop muted>
                <source src={background} type="video/webm" />
            </video>
            <div className="content">
                <h1 className="landingTitle">App name</h1>
                <Link to='/home' className="link">Start</Link>
            </div>
        </div>
    )
}

export default Landing