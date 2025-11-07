import React, { useState } from 'react';
import { Container, Row, Col,} from 'react-bootstrap';
import '../Css/Layout.css';

import ContactForm from './ContactForm';
import logo from '../Images/Abhishek image.jpeg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ContactMailIcon from '@mui/icons-material/ContactMail';


function Layout() {
  const [activeComponent, setActiveComponent] = useState("Home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "About":
        return <About />;
      case "project":
        return <Projects />;
      case "Contact":
        return <ContactForm />;
      default:
        return <Home />;
    }
  };

  return (
    <Container fluid className="layout-container">
      <Row className="min-vh-100">
        {/* Sidebar */}
        <Col xs={12} md={3} className="sidebar text-center py-4">
          <img src={logo} alt="Logo" className="logo mb-3" />
          <h4>Abhishek Gaikwad</h4>
          <h5 className="mb-4">Full Stack Developer</h5>

          <h5>Follow Me</h5>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <Button variant="secondary" size="sm">
              <a href="https://www.linkedin.com/in/abhishek-gaikwad-b6819731b/" target="_blank" rel="noreferrer" style={{ color: 'white' }}>
                <LinkedInIcon />
              </a>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setActiveComponent("Contact")}>
              <EmailOutlinedIcon />
            </Button>
            <Button variant="secondary" size="sm">
              <a href="https://github.com/AbhishekGaikwad45" target="_blank" rel="noreferrer" style={{ color: 'white' }}>
                <GitHubIcon />
              </a>
            </Button>
          </div>

          <div className="d-grid gap-4 topic">
            <Button variant="outline-light" startIcon={<HomeIcon/>} onClick={() => setActiveComponent("home")}>Home</Button>
            <Button variant="outline-light" startIcon={<InfoIcon/>} onClick={() => setActiveComponent("About")}>About</Button>
            <Button variant="outline-light" startIcon={<AccountTreeIcon/>} onClick={() => setActiveComponent("project")}>Projects</Button>
            <Button variant="outline-light" startIcon={<ContactMailIcon/>} onClick={() => setActiveComponent("Contact")}>Contact Me</Button>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} className="main-content p-4">
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
