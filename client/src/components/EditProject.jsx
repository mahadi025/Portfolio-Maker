import { useParams } from "react-router-dom";
import axios from '../axiosConfig';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from "../auth";

function EditProject() {
    const { id } = useParams();
    const navigateTo = useNavigate();

    const [editProject, setEditProject] = useState({
        name: '',
        description: '',
        skills: ''
    });

    useEffect(() => {
        async function getProject() {
            try {
                const response = await axios.get(`/project/${id}`);

                if (response.status !== 200) throw new Error('Network response was not ok');

                setEditProject({
                    name: response.data.name || '',
                    description: response.data.description || '',
                    skills: response.data.skills.map(skill => skill.name).join(', ')
                });
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getProject();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProject((prevEditProject) => ({
            ...prevEditProject,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getLoggedInUserToken();

        if (!token) {
            navigateTo(`/project/${id}`);
            return;
        }

        try {
            const skillsArray = editProject.skills.split(',').map(skill => skill.trim());
            const payload = {
                ...editProject,
                skills: skillsArray.length > 0 ? skillsArray.map(skill => ({ name: skill })) : null
            };

            const response = await axios.put(
                `/project/edit-project/${id}`,
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log('Server response:', response.data);
            navigateTo(`/project/${id}`);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div>
                <form className="edit-project-form" onSubmit={handleSubmit}>
                    <input
                        value={editProject.name}
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                    <input
                        value={editProject.description}
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                    />
                    <input
                        value={editProject.skills}
                        type="text"
                        name="skills"
                        placeholder="Enter skills separated by commas"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
                <button onClick={() => { navigateTo(-1); }} className="btn btn-warning mt-3">Back</button>
            </div>
        </div>
    );
}


export default EditProject;
