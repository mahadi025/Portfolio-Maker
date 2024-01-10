import profilePic from "../assets/Mahadi.png"
import { useEffect } from "react";
import Typed from "typed.js";
import '../styles/about.css'

function About() {

    useEffect(() => {
        const typed2 = new Typed(".multiple-text2", {
            strings: ["Software Developer", ""],
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
        <section className="about" id="about">
            <div className="about-img">
                <img src={profilePic} alt="" />
            </div>
            <div className="about-content">
                <h2 className="heading">About <span>ME</span></h2>
                <h3><span className="multiple-text2"></span></h3>
                <p>Hello, My name is Mahadi Karim Munif. I graduated from East West University with BSC in Computer Science
                    Engineering. I love programming. I
                    know <span className="multiple-text2"><b>C</b></span>, <span className="multiple-text2"><b>C++</b></span>, <span
                        className="multiple-text2"><b>JAVA</b></span>, <span className="multiple-text2"><b>Python</b></span>,
                    <span className="multiple-text2"><b>C#</b></span>, <span className="multiple-text2"><b>JavaScript</b></span>.
                    I like to build different kinds of Android
                    apps using <span className="multiple-text2"><b>Android Studio</b></span> and Websites using <span
                        className="multiple-text2"><b>Django</b></span> and <span className="multiple-text2"><b>Flask</b></span>,
                    and <span className="multiple-text2"><b>ASP.NET</b></span> I
                    also have experience in data science, machine learning, and image processing.
                    <br />
                    I like to learn from <span className="multiple-text3"></span>
                </p>
            </div>
        </section>
    );
}

export default About;