import { Link, useParams } from "react-router-dom";
import useFetch from '../useFetch';
import 'boxicons/css/boxicons.min.css';
import '../styles/projectdetail.css'

function ProjectDetail() {
    const { id } = useParams();

    const { data: project, error, isPending } = useFetch("https://localhost:5001/api/project/" + id);
    // console.log(project);

    return (
        <div className="container project-detail">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <a href={project.url} className="card-link" target="_blank"><i className='bx bxl-github'></i></a>
                    <br />
                    {project.skills && project.skills.map(skill => (
                        <h4 key={skill.id}>{skill.name}</h4>
                    ))}
                    <Link to={`/project/edit-project/${project.id}`}>
                        <button className="btn btn-info">Edit</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;