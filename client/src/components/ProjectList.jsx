import 'boxicons/css/boxicons.min.css';
import projectPic from "../assets/project.jpg"
import useFetch from '../useFetch';
import '../styles/projectlist.css'

import { Link } from 'react-router-dom';

function ProjectList() {
    const { data: projects, loading, error } = useFetch('https://localhost:5001/api/Project');

    return (
        <div className="project">
            <h2 class="heading">My <span>Projects</span></h2>
            <div className="project-container">
                {projects.map(project => (
                    <Link to={`/project/${project.id}`} key={project.id}>
                        <div className="project-box">
                            <img src={projectPic} alt="" />
                            <div className="project-layer">
                                <h4>Advising Portal</h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default ProjectList;