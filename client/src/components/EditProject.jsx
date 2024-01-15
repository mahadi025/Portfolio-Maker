import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function EditProject() {
    const { id } = useParams();

    const navigateTo = useNavigate();

    const { data: project, error, isPending } = useFetch("https://localhost:5001/api/project/" + id);

    const [editProject, setEditProject] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (project) {
            setEditProject({
                name: project.name || '',
                description: project.description || ''
            });
        }
    }, [project]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProject((prevEditProject) => ({
            ...prevEditProject,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://localhost:5001/api/project/edit-project/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editProject),
        })
            .then(response => {
                console.log('Server response:', response);
                return response.json();
            })
            .then(updatedProject => {
                console.log('Project updated:', updatedProject);
                navigateTo(`/project/${id}`);
            })
            .catch(error => {
                console.error('Error updating project:', error);
            });

    };

    return (
        <div>
            <form className="edit-project-form" onSubmit={handleSubmit}>
                <input
                    defaultValue={editProject.name}
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                />
                <input
                    defaultValue={editProject.description}
                    type="text"
                    name="description"
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default EditProject;
