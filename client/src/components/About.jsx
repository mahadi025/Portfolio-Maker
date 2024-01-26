import { useEffect } from "react";
import Typed from "typed.js";
import '../styles/about.css'

function About(props) {

    const user = props.mainUser;

    useEffect(() => {
        const typed1 = new Typed(".multiple-text1", {
            strings: [user.introduction || ""],
            typeSpeed: 100,
            backSpeed: 100,
            typeDelay: 1000,
            loop: true
        });

        const typed2 = new Typed(".multiple-text2", {
            strings: ["anything", "and everything."],
            typeSpeed: 80,
            backSpeed: 80,
            typeDelay: 2000,
            loop: true
        });

        return () => {
            typed1.destroy();
            typed2.destroy();
        };
    }, [user]);

    return (
        <div className="about">
            <div className="about-img">
                <img src={user.photoUrl} alt="" />
            </div>
            <div className="about-content">
                <h2 className="heading">About <span>ME</span></h2>
                <h3><span className="multiple-text1"></span></h3>
                <p>Hello, My name is {user.firstName} {user.lastName}. I graduated from East West University with BSC in Computer Science
                    Engineering. I love programming. I
                    know <span><i>C</i></span>, <span><i>C++</i></span>, <span><i>JAVA</i></span>,
                    <span><i>Python</i></span>,
                    <span><i>C#</i></span>, <span><i>JavaScript</i></span>.
                    I like to build different kinds of Android
                    apps using <span><b>Android Studio</b></span> and Websites using <span><b>Django, </b></span>
                    <span><b>Flask</b></span>,
                    and <span><b>ASP.NET</b></span> I
                    also have experience in data science, machine learning, and image processing.
                    <br />
                    I like to learn from <span className="multiple-text2"></span>
                </p>
            </div>
        </div>
    );
}

export default About;