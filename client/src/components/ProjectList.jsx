import 'boxicons/css/boxicons.min.css';
import projectPic from "../assets/project.jpg"
import '../styles/projectlist.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axiosConfig';

function ProjectList() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await axios.get('/project');
                if (response.status !== 200) throw new Error('Network response was not ok');
                setProjects(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, [])

    return (
        <section className="project">
            <h2 className="heading">My <span>Projects</span></h2>
            <div className="project-container">
                {projects.map(project => (
                    <Link to={`/project/${project.id}`} key={project.id}>
                        <div className="project-box">
                            <img src={projectPic} alt="" />
                            <div className="project-layer">
                                <h4>{project.name}</h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
export default ProjectList;