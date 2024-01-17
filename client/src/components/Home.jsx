import profilePic from "../assets/Mahadi.png"
import Typed from "typed.js";
import { useEffect } from "react";
import pdf from "../assets/Mahadi.pdf"
import '../styles/home.css'
import 'boxicons/css/boxicons.min.css';
import useFetch from "../useFetch";
import axios from "axios";

function Home(props) {

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


    // if (props.user) {
    //     const { data: user, error, isPending } = useFetch("https://localhost:5001/api/users/" + props.user);

    //     console.log(user);
    // }

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('https://localhost:5001/api/users/' + props.user, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });

    //         // Handle the response data
    //         console.log(response.data);
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // if (props.user) {
    //     fetchData();
    // }

    return (
        <div className="container">
            <div className="home row">
                <div className="col-8">
                    <h3>Hi, I am</h3>
                    <h3>Mahadi Karim <span>Munif</span></h3>
                    <h3>and I am a <span> Web Developer</span></h3>
                    <h3>Frontend <span className="multiple-text1"></span></h3>
                    <h3>Backend <span className="multiple-text2"></span></h3>
                    <p>“You are never too old to set another goal or to dream a new dream.” ~ C.S Lewis</p>
                    <div className="social-media">
                        <a href="https://www.linkedin.com/in/mahadi025/" target="_blank" rel="noreferrer"><i className="bx bxl-linkedin"></i></a>
                        <a href="https://www.facebook.com/MahadiKarimMunif" target="_blank" rel="noreferrer"><i className="bx bxl-facebook"></i></a>
                        <a href="https://github.com/mahadi025" target="_blank" rel="noreferrer"><i className="bx bxl-github"></i></a>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <a href={pdf} target="_blank" className="resume-btn" rel="noreferrer">Download Resume</a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <img className="home-img" src={profilePic} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Home;