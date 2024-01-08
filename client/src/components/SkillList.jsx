import 'boxicons/css/boxicons.min.css';
import '../styles/skills.css'

function SkillList() {
    return (
        <section className="skills" id="skills">
            <h2 className="heading">My <span>Skills</span></h2>
            <div className="skills-container">
                <div className="skills-box">
                    <i className='bx bxl-python'></i>
                    <h3>Python</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bx-hash'></i>
                    <h3>C Sharp</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-java'></i>
                    <h3>Java</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-c-plus-plus'></i>
                    <h3>C++</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-javascript'></i>
                    <h3>JS</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bx-laptop'></i>
                    <h3>Machine Learning</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bx-images'></i>
                    <h3>Image Processing</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-django'></i>
                    <h3>Django</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-react'></i>
                    <h3>React</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-angular'></i>
                    <h3>Angular</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-flask'></i>
                    <h3>Flask</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-mongodb'></i>
                    <h3>MongoDB</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-github'></i>
                    <h3>Git</h3>
                </div>
                <div className="skills-box">
                    <i className='bx bxl-docker'></i>
                    <h3>Docker</h3>
                </div>
            </div>
        </section>
    );
}

export default SkillList;