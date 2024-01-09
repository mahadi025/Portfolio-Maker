import { useParams } from "react-router-dom";
import useFetch from '../useFetch';
import 'boxicons/css/boxicons.min.css';
import '../styles/projectdetail.css'

function ProjectDetail() {
    const { id } = useParams();

    const { data: project, error, isPending } = useFetch("https://localhost:5001/api/project/" + id);
    console.log(project)
    return (
        <section className="project-detail" id="project-detail">
            <div className="project-detail-content">
                <h3 className="project-heading"><span>Project Name: </span>{project.name}</h3>
                {project.description && <h4 className="project-description"> <span>Description: </span>
                    {project.description}
                </h4>}
                <div className="project-link">
                    <h3><span>Project Link </span></h3> <a href={project.url} target="_blank"><i className='bx bxl-github'></i></a>
                </div>
                <div className="project-skills">
                    <h3><span>Skills</span></h3>
                    {project.skills && project.skills.map(skill => (
                        <h4 key={skill.id}>{skill.name}</h4>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectDetail;