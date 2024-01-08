import profilePic from "../assets/Mahadi.png"
import Typed from "typed.js";
import { useEffect } from "react";
import pdf from "../assets/Mahadi.pdf"
import '../styles/home.css'
import 'boxicons/css/boxicons.min.css';

function Home() {

    useEffect(() => {
        const typed1 = new Typed(".multiple-text1", {
            strings: ["Software Developer", ""],
            typeSpeed: 100,
            backSpeed: 100,
            typeDelay: 1000,
            loop: true
        });

        return () => {
            typed1.destroy();
        };
    }, []);


    return (
        <section className="home" id="home">
            <div className="home-content">
                <h3>Hi, I am</h3>
                <h3>Mahadi Karim <span>Munif</span></h3>
                <h3>and I am a <span className="multiple-text1"></span></h3>
                <p>“You are never too old to set another goal or to dream a new dream.” ~ C.S Lewis</p>
                <div className="social-media">
                    <a href="https://www.linkedin.com/in/mahadi025/" target="_blank" rel="noreferrer"><i className="bx bxl-linkedin"></i></a>
                    <a href="https://www.facebook.com/MahadiKarimMunif" target="_blank" rel="noreferrer"><i className="bx bxl-facebook"></i></a>
                    <a href="https://github.com/mahadi025" target="_blank" rel="noreferrer"><i className="bx bxl-github"></i></a>
                </div>
                <a href={pdf} target="_blank" className="btn" rel="noreferrer">Download Resume</a>
            </div>
            <div className="home-img">
                <img src={profilePic} alt="" />
            </div>
        </section>
    );
}

export default Home;