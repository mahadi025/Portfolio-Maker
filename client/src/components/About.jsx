import profilePic from "../assets/Mahadi.png"
import { useEffect, useState } from "react";
import Typed from "typed.js";
import '../styles/about.css'

function About(props) {

    const user = props.mainUser;

    useEffect(() => {
        const typed2 = new Typed(".multiple-text2", {
            strings: [user.introduction],
            typeSpeed: 100,
            backSpeed: 100,
            typeDelay: 1000,
            loop: true
        });

        const typed3 = new Typed(".multiple-text3", {
            strings: ["anything", "and everything."],
            typeSpeed: 80,
            backSpeed: 80,
            typeDelay: 2000,
            loop: true
        });

        return () => {
            typed2.destroy();
            typed3.destroy();
        };
    }, []);

    return (
        <div className="container about-container">
            <div className="d-flex align-items-center justify-content-center">
                <div className="about-img">
                    <img className="rounded-circle" src={user.photoUrl} alt="" />
                </div>
                <div className="about-content pl-2">
                    <h2 className="heading">About <span>ME</span></h2>
                    <h3><span className="multiple-text2"></span></h3>
                    <p>Hello, My name is {user.firstName} {user.lastName}. I graduated from East West University with BSC in Computer Science
                        Engineering. I love programming. I
                        know <span className="badge badge-pill badge-success"><i>C</i></span>, <span className="badge badge-pill badge-success"><i>C++</i></span>, <span
                            className="badge badge-pill badge-success"><i>JAVA</i></span>, <span className="badge badge-pill badge-success"><i>Python</i></span>,
                        <span className="badge badge-pill badge-success"><i>C#</i></span>, <span className="badge badge-pill badge-success"><i>JavaScript</i></span>.
                        I like to build different kinds of Android
                        apps using <span className="badge badge-pill badge-info"><b>Android Studio</b></span> and Websites using <span
                            className="badge badge-pill badge-info"><b>Django</b></span>, <span className="badge badge-pill badge-info"><b>Flask</b></span>,
                        and <span className="badge badge-pill badge-info"><b>ASP.NET</b></span> I
                        also have experience in data science, machine learning, and image processing.
                        <br />
                        I like to learn from <span className="multiple-text3"></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;