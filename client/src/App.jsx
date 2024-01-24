import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css'
import SkillList from './components/SkillList';
import About from './components/About';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import EditProject from './components/EditProject';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import CreateProject from './components/CreateProject';
import Register from './components/Register';
import axios from './axiosConfig';
import Photo from './components/Photo';
import AddPhoto from './components/AddPhoto';

function App() {

  const [darkMode, setDarkMode] = useState(false);


  function handleThemeToggle() {

    if (!darkMode) {
      document.body.classList.add('light-mode');
    }
    else {
      document.body.classList.remove('light-mode');
    }
    setDarkMode(prev => !prev)
  }

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [mainUser, setMainUser] = useState({})


  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false);
    }
    async function getUser() {
      try {
        const response = await axios.get('/users/mahadi025');

        if (response.status !== 200) throw new Error('Network response was not ok');

        setMainUser(response.data);

      } catch (error) {
        console.log(error);
      }
    }
    getUser();

  }, []);


  const handleLogout = () => {
    window.location.reload();

    localStorage.removeItem('user');

    localStorage.removeItem('token');

    window.location.href = '/';

    setIsLoggedOut(true);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'light-mode' : ''}`}>
        <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle} handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home mainUser={mainUser} />} />
            <Route exact path="/about" element={<About mainUser={mainUser} />} />
            <Route exact path="/skill" element={<SkillList />} />
            <Route exact path="/project" element={<ProjectList />} />
            <Route exact path="/create-project" element={<CreateProject />} />
            <Route exact path="/project/:id" element={<ProjectDetail />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile/photo" element={<Photo />} />
            <Route exact path="/profile/photo/add-photo" element={<AddPhoto />} />
            <Route exact path="profile/edit-profile" element={<EditProfile />} />
            <Route exact path="/project/edit-project/:id" element={<EditProject />} />
            <Route exact path="/remove-skill-from-project/:projectId/:skillId" />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
