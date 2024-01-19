import { Link } from "react-router-dom";
import '../styles/header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
    return (
        <Navbar expand="lg" className="header bg-body-tertiary">
            <Container id="nav">
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-toggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
                        <Nav.Link as={Link} to="/skill" className="nav-link">Skills</Nav.Link>
                        <Nav.Link as={Link} to="/project" className="nav-link">Projects</Nav.Link>
                        {props.user && <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>}
                        {props.user != null && (
                            <button className="logout-btn" onClick={props.handleLogout}>
                                <i className='bx bx-log-out' ></i>
                            </button>
                        )}
                        <button className="theme-btn" onClick={props.handleThemeToggle}>
                            <i className={`bx bx-adjust`}></i>
                        </button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;