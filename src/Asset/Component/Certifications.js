import React from "react";
import "../Css/Certifications.css";

import mern from "../Images/web develpment.jpeg";
import java from "../Images/java.jpeg";


function Certifications() {
  const certificates = [
    {
      title: "MERN Stack Certification",
      org: "Training Institute",
      image: mern,
    },
    {
      title: "Java Full Stack Certification",
      org: "Training Institute",
      image: java,
    },
    
  ];

  return (
    <div className="container py-5">
  <h1 className="text-center text-white mb-5">Certifications</h1>

  <div className="row">
    {certificates.map((cert, index) => (
      <div className="col-12 col-md-6 mb-4" key={index}>
        <div className="card cert-card h-100">
          <img
            src={cert.image}
            className="card-img-top img-fluid"
            alt={cert.title}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{cert.title}</h5>
            <p className="card-text">{cert.org}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Certifications;
