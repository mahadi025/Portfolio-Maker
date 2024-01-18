import 'boxicons/css/boxicons.min.css';
import projectPic from "../assets/project.jpg"
import '../styles/projectlist.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await axios.get('https://localhost:5001/api/project');
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
        <div className="project">
            <h2 className="heading text-center">My <span>Projects</span></h2>
            <div className="project-container mt-4">
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
        </div>
    );
}
export default ProjectList;