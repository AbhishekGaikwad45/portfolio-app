import React from 'react';
import '../Css/Project.css';

// Project Screenshots imported from Assets
import snap from '../Images/signup form.png';
import snap1 from '../Images/contact page.png';
import snap2 from '../Images/home page.png';
import snap3 from '../Images/wishlist.png';

import snap4 from '../Images/home.png';
import snap5 from '../Images/contact.png';
import snap6 from '../Images/login.png';
import snap7 from '../Images/account.png';

import snap8 from '../Images/homepage.png';
import snap9 from '../Images/favorite.png';
import snap10 from '../Images/playlist page.png';
import snap11 from '../Images/About.png';
import snap12 from '../Images/loginpage.png';
import snap13 from '../Images/Signuppage.png';

import snap14 from '../Images/wetherHome.png';
import snap15 from '../Images/wether.png';

import snap16 from '../Images/Teacher Register.png';
import snap17 from '../Images/Teacher login.png';
import snap18 from '../Images/Mark Attendence.png';
import snap19 from '../Images/Add student.png';
import snap20 from '../Images/Class wise Attendence.png';

import snap21 from "../Images/i homepage.png";
import snap22 from "../Images/faculty dashboard.png";
import snap23 from "../Images/student dashboard.png";
import snap24 from "../Images/counsellar dashboard.png";
import snap25 from "../Images/counselar dashbord.png";
import snap26 from "../Images/i login.png";

import { usePortfolio } from '../../context/PortfolioContext';
import { resolveAssetUrl } from '../../services/api';

const defaultImgMap = {
  snap, snap1, snap2, snap3,
  snap4, snap5, snap6, snap7,
  snap8, snap9, snap10, snap11, snap12, snap13,
  snap14, snap15,
  snap16, snap17, snap18, snap19, snap20,
  snap21, snap22, snap23, snap24, snap25, snap26
};

function Projects() {
  const { portfolio } = usePortfolio();
  const projects = portfolio?.projects || [];

  return (
    <div className="container-fluid py-2 px-0">
      <h1 className="text-white mb-4">Projects</h1>

      {projects.map((project, pIndex) => {
        // Resolve images to show
        let imageList = [];
        if (project.screenshots && project.screenshots.length > 0) {
          imageList = project.screenshots.map((s) => resolveAssetUrl(s));
        } else if (project.defaultScreenshotKeys && project.defaultScreenshotKeys.length > 0) {
          imageList = project.defaultScreenshotKeys.map((k) => defaultImgMap[k]).filter(Boolean);
        }

        return (
          <div key={project.id || pIndex} className={pIndex > 0 ? "mt-5 pt-4 border-top border-secondary" : ""}>
            <h3 className="project-title mb-2">{project.title}</h3>
            {project.description && (
              <p className="project-desc mb-3">
                {project.description}
              </p>
            )}

            {imageList.length > 0 && (
              <>
                <h5 className="text-white my-3">Screenshots</h5>
                <div className="row g-3 g-md-4">
                  {imageList.map((image, index) => (
                    <div className="col-12 col-sm-6 col-lg-6" key={index}>
                      <img
                        src={image}
                        className="img-fluid rounded snapshot w-100"
                        alt={`${project.title} Screenshot ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.liveLink && (
              <div className="mt-4">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-visit-project"
                >
                  Visit Project
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Projects;
