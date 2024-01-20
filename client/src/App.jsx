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
import { getLoggedInUser } from './auth';
import EditProject from './components/EditProject';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import CreateProject from './components/CreateProject';

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

  const user = getLoggedInUser();

  console.log(user)

  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false);
    }
  }, [user]);


  const handleLogout = () => {

    localStorage.removeItem('user');

    setIsLoggedOut(true);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'light-mode' : ''}`}>
        <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle} handleLogout={handleLogout} user={user} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home user={user} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/skill" element={<SkillList />} />
            <Route exact path="/project" element={<ProjectList />} />
            <Route exact path="/create-project" element={<CreateProject />} />
            <Route exact path="/project/:id" element={<ProjectDetail user={user} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
            <Route exact path="profile/edit-profile" element={<EditProfile user={user} />} />
            <Route exact path="/project/edit-project/:id" element={<EditProject />} />
            <Route exact path="/remove-skill-from-project/:projectId/:skillId" />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
