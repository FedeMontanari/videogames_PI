import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
import background from  "../../assets/background.mp4" 

function Landing () {
    return (
        <div className="hero">
            <video className='backVideo' autoPlay loop muted>
                <source src={background} type="video/mp4" />
            </video>
            <div className="content">
                <h1 className="landingTitle">App name</h1>
                <Link to='/home' className="link">Start</Link>
            </div>
        </div>
    )
}

export default Landing