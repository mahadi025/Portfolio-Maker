import { Link } from "react-router-dom";
import { useState } from "react";
import '../styles/header.css'

function Header(props) {

    const [showNavbar, setShowNavbar] = useState(false);

    const handleMenuClick = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                Portfolio
            </Link>
            <i className="bx bx-menu" id="menu-icon" onClick={handleMenuClick}></i>
            <nav className={`navbar ${showNavbar ? 'show' : ''}`}>
                <Link to="/" className="active">
                    Home
                </Link>
                <Link to="/about">About</Link>
                <Link to="/skill">Skills</Link>
                <Link to="/project">Projects</Link>
                {/* <Link to="/contact">Contact</Link> */}
                <button className="theme-btn" id="theme-btn" onClick={props.handleThemeToggle}>
                    <i className={`bx bx-adjust`}></i>
                </button>
                {props.user != null && (
                    <button className="logout-btn" onClick={props.handleLogout}>
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Header;