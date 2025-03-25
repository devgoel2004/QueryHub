import React from "react";
import "./About.css";
import { FaUsers, FaCode, FaShieldAlt, FaSearch } from "react-icons/fa";
import MetaData from "../MetaData/MetaData";

const About = () => {
  return (
    <>
      <MetaData title={"QUERYHUB || ABOUT"} />
      <div className="about-container">
        <header className="about-header">
          <h1>About QueryHub</h1>
          <p>
            Empowering students to ask, explore, and share knowledge
            effectively.
          </p>
        </header>
        <section className="about-section">
          <div className="about-card">
            <FaUsers className="about-icon" />
            <h2>Community Driven</h2>
            <p>
              QueryHub is a collaborative platform where students share
              knowledge, ask questions, and provide answers to build a thriving
              academic community.
            </p>
          </div>

          <div className="about-card">
            <FaCode className="about-icon" />
            <h2>Technology Stack</h2>
            <p>
              Built with React.js, Node.js, MongoDB, and Express.js, QueryHub
              ensures a seamless and efficient experience for students and
              faculty.
            </p>
          </div>

          <div className="about-card">
            <FaShieldAlt className="about-icon" />
            <h2>Secure & Reliable</h2>
            <p>
              Using authentication and security protocols, your data and
              contributions remain safe and protected.
            </p>
          </div>

          <div className="about-card">
            <FaSearch className="about-icon" />
            <h2>Smart Search & Filter</h2>
            <p>
              Easily find relevant questions using smart search and filtering
              features, making knowledge retrieval faster and simpler.
            </p>
          </div>
        </section>

        <footer className="about-footer">
          <p>© {new Date().getFullYear()} QueryHub. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default About;
