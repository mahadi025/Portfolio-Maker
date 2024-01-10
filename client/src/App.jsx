import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import './App.css'
import SkillList from './components/SkillList';
import About from './components/About';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import { useState } from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  function handleThemeToggle() {
    setDarkMode(prev => !prev)
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'light-mode' : ''}`}>
        <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle} />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/skill" element={<SkillList />} />
            <Route exact path="/project" element={<ProjectList />} />
            <Route exact path="/project/:id" element={<ProjectDetail />} />
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
