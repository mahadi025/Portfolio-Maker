import { useState } from "react";
import axios from "../axiosConfig"
import { getLoggedInUserToken } from "../auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../styles/addPhoto.css'


function AddPhoto() {

    const [selectedFile, setSelectedFile] = useState(null);

    const token = getLoggedInUserToken();

    const navigateTo = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {

        if (!token) {
            return null;
        }

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();

        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/users/add-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigateTo(-1);

        } catch (error) {
            toast.error(error.response.data);
        }
    };

    return (
        <div className="container">
            <div className="upload-photo">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} className="upload-photo-btn">Upload Photo</button>
                <button onClick={() => { navigateTo(-1); }} className="btn btn-outline-danger">Back</button>
            </div>
        </div>
    );
}

export default AddPhoto;