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

  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false);
    }
  }, [user]);


  const handleLogout = () => {

    localStorage.removeItem('token');

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
            <Route exact path="/project/:id" element={<ProjectDetail />} />
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/detail" element={<ProjectDetail />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
