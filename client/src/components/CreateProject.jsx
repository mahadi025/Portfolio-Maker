import axios from '../axiosConfig';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserToken } from "../auth";
import { toast } from 'react-toastify';

function CreateProject() {

    const [createProject, setCreateProject] = useState({})

    const navigateTo = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateProject((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getLoggedInUserToken();

        if (!token) {
            navigateTo(-1)
            return;
        }

        try {

            const response = await axios.post(
                `/project/`,
                createProject,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            navigateTo(-1);
        } catch (error) {
            // navigateTo(-1);
            toast.error(error.response.data);
            console.error(error.response.data);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div>
                <form className="create-project-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Project Name</label>
                    <input
                        value={createProject.name || ''}
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="url">Project URL</label>
                    <input
                        value={createProject.url || ''}
                        type="text"
                        name="url"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
                <button onClick={() => { navigateTo(-1); }} className="btn btn-warning mt-3">Back</button>
            </div>
        </div>
    )
}

export default CreateProject;