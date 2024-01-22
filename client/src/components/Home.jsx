import Typed from "typed.js";
import { useEffect } from "react";
import pdf from "../assets/Mahadi.pdf"
import '../styles/home.css'
import 'boxicons/css/boxicons.min.css';

function Home(props) {

    const user = props.mainUser;

    useEffect(() => {
        const typed1 = new Typed(".multiple-text1", {
            strings: ["React", "Angular"],
            typeSpeed: 100,
            backSpeed: 100,
            typeDelay: 1000,
            loop: true
        });
        const typed2 = new Typed(".multiple-text2", {
            strings: ["ASP.NET", "Django", "Flask"],
            typeSpeed: 100,
            backSpeed: 100,
            typeDelay: 1000,
            loop: true
        });
        return () => {
            typed1.destroy();
            typed2.destroy();
        };
    }, []);

    return (
        <section className="home">
            <div className="home-content">
                <h3>Hi, I am</h3>
                <h3>{user.firstName}<span> {user.lastName}</span></h3>
                <h3>and I am a {user.introduction}</h3>
                <h3>Frontend: <span className="multiple-text1"></span></h3>
                <h3>Backend: <span className="multiple-text2"></span></h3>
                <p>“You are never too old to set another goal or to dream a new dream.” ~ C.S Lewis</p>
                <div className="social-media">
                    <a href="https://www.linkedin.com/in/mahadi025/" target="_blank"><i className="bx bxl-linkedin"></i></a>
                    <a href="https://www.facebook.com/MahadiKarimMunif" target="_blank"><i className="bx bxl-facebook"></i></a>
                    <a href="https://github.com/mahadi025" target="_blank"><i className="bx bxl-github"></i></a>
                </div>
                <a href={pdf} target="_blank" className="resume-btn">Download Resume</a>
            </div>
            <div className="home-img">
                <img src={user.photoUrl} alt="" />
            </div>
        </section>
    );
}

export default Home;