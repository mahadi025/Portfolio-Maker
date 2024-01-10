import { Link } from "react-router-dom";
import '../styles/header.css'

function Header(props) {
    return (
        <header className="header">
            <Link to="/" className="logo">Portfolio</Link>
            <i className='bx bx-menu' id="menu-icon"></i>
            <nav className="navbar">
                <Link to="/" className="active">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/skill">Skills</Link>
                <Link to="/project">Projects</Link>
                <Link to="/contact">Contact</Link>
                <button className="btn" id="theme-btn" onClick={props.handleThemeToggle}>
                    <i className={`bx bx-adjust`}></i>
                </button>
            </nav>
        </header>
    );
}

export default Header;