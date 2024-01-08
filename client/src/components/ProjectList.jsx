import 'boxicons/css/boxicons.min.css';
import projectPic from "../assets/project.jpg"
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
import '../styles/projectlist.css'

function ProjectList() {
    const { data: projects, loading, error } = useFetch('https://localhost:5001/api/Project');

    return (
        <section className="project" id="project">
            <h2 className="heading">My <span>Projects</span></h2>
            <div className="project-container">
                {projects.map(project => (
                    <div className="project-box" key={project.id}>
                        <img src={projectPic} alt="" />
                        <Link to={`/project/${project.id}`}>
                            <div className="project-layer">
                                <h4>{project.name}</h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectList;