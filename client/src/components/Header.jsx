import { Link } from "react-router-dom";
import '../styles/header.css'

function Header() {

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
            </nav>
        </header>
    );
}

export default Header;