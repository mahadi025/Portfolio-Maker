import { Link, useParams } from "react-router-dom";
import axios from "axios";
import 'boxicons/css/boxicons.min.css';
import '../styles/projectdetail.css'
import { useEffect, useState } from "react";
import { getLoggedInUserToken } from "../auth";

function ProjectDetail(props) {
    const { id } = useParams();

    const [project, setProject] = useState([]);

    useEffect(() => {
        async function getProject() {
            try {
                const response = await axios.get('https://localhost:5001/api/project/' + id);
                if (response.status !== 200) throw new Error('Network response was not ok');
                setProject(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getProject();
    }, [id])

    const handleRemoveSkill = async (skillId) => {
        const token = getLoggedInUserToken();

        if (!token) {
            return;
        }

        try {
            const response = await axios.put(
                `https://localhost:5001/api/project/remove-skill-from-project/${project.id}/${skillId}`,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log('Skill removed successfully:', response.data);

            setProject(prevProject => ({
                ...prevProject,
                skills: prevProject.skills.filter(skill => skill.id !== skillId),
            }));
        } catch (error) {
            console.error(error.response.data);
        }
    };



    return (
        <div className="container project-detail">
            <div className="card">
                <div className="card-body project-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <a href={project.url} className="card-link" target="_blank"><i className='bx bxl-github'></i></a>
                    <br />
                    {project.skills && project.skills.map(skill => (
                        <div key={skill.id} className="d-flex justify-content-between align-items-center pb-2">
                            <h4>{skill.name}</h4>
                            {props.user && <button className="btn btn-danger" onClick={() => handleRemoveSkill(skill.id)}>Remove</button>}
                        </div>
                    ))}
                    {props.user && <Link to={`/project/edit-project/${project.id}`}>
                        <button className="btn btn-info">Edit Project</button>
                    </Link>}
                </div>
            </div>
        </div>

    );
}

export default ProjectDetail;