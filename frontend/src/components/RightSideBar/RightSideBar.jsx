import React from "react";
import "./RightSideBar.css";
const RightSideBar = () => {
  return (
    <>
      <div className="right-sidebar">
        <h3>Top Contributors</h3>
        <ol>
          <li>Alice Johnson (2340 pts)</li>
          <li>Bob Smith (2100 pts)</li>
          <li>Charlie Dev (1950 pts)</li>
          <li>Dev Goel (1765 pts)</li>
          <li>Emma Watson (1600 pts)</li>
        </ol>
      </div>
      <div className="announcements">
        <h3>📢 Announcements</h3>
        <p>
          We are hiring full-stack developers! <a href="/jobs">Apply Now</a>
        </p>
        <p>
          Join our React workshop on March 20th! <a href="/events">Register</a>
        </p>
      </div>
    </>
  );
};

export default RightSideBar;
