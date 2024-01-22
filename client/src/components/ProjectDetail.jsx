import { Link, useNavigate, useParams } from "react-router-dom";
import axios from '../axiosConfig';
import 'boxicons/css/boxicons.min.css';
import '../styles/projectdetail.css'
import { useEffect, useState } from "react";
import { getLoggedInUser, getLoggedInUserToken } from "../auth";

function ProjectDetail() {
    const { id } = useParams();

    const navigateTo = useNavigate();

    const [project, setProject] = useState([]);

    const user = getLoggedInUser();

    const token = getLoggedInUserToken();

    useEffect(() => {
        async function getProject() {
            try {
                const response = await axios.get('/project/' + id);
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

        if (!token) {
            return;
        }

        try {
            const response = await axios.put(
                `/project/remove-skill-from-project/${project.id}/${skillId}`,
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

    const deleteProject = async () => {

        if (!token) {
            return;
        }

        try {
            const response = await axios.delete(`/project/${project.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )

            navigateTo("/project")
        }
        catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div className="container project-detail">
            <div className="card">
                <div className="card-body project-detail-body">
                    <h5 className="card-title">{project.name}</h5>
                    {project.description && <p className="card-text">{project.description}</p>}
                    <a href={project.url} className="card-link" target="_blank"><i className='bx bxl-github'></i></a>
                    <h5>Skills</h5>
                    {project.skills && project.skills.map(skill => (
                        <div key={skill.id} className="skill-list d-flex justify-content-between align-items-center pb-2">
                            <h4>{skill.name}</h4>
                            {user && <button className="btn btn-danger remove-btn" onClick={() => handleRemoveSkill(skill.id)}>Remove</button>}
                        </div>
                    ))}
                    <div className="d-flex justify-content-center align-items-center">
                        <i onClick={() => { navigateTo(-1); }} className='bx bxs-left-arrow back-btn mr-auto'></i>
                        {user && <Link to={`/project/edit-project/${project.id}`}>
                            <i className='bx bxs-message-square-edit edit-project'></i>
                        </Link>}
                        {user && <i onClick={deleteProject} className='bx bx-folder-minus'></i>}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProjectDetail;