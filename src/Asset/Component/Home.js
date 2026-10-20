import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Home.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

import { usePortfolio } from '../../context/PortfolioContext';
import { resolveAssetUrl } from '../../services/api';

function Home() {
  const { portfolio, isAuthenticated } = usePortfolio();
  const navigate = useNavigate();

  const profile = portfolio?.profile || {};
  const introLines = profile.introLines && profile.introLines.length > 0
    ? profile.introLines
    : [
      "I am a skilled and passionate web developer with experience in",
      "creating visually appealing and user-friendly websites."
    ];
  const resumeUrl = resolveAssetUrl(profile.resumeUrl) || "/Abhishek Gaikwad Resume.pdf";

  // Dynamic Typewriter Effect for Title
  const fullTitle = profile.title || "Full Stack Developer";
  const [displayedTitle, setDisplayedTitle] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      if (!isDeleting) {
        if (currentIndex <= fullTitle.length) {
          setDisplayedTitle(fullTitle.slice(0, currentIndex));
          currentIndex++;
          timer = setTimeout(tick, 70);
        } else {
          isDeleting = true;
          timer = setTimeout(tick, 2200); // pause at full title
        }
      } else {
        if (currentIndex > 0) {
          setDisplayedTitle(fullTitle.slice(0, currentIndex));
          currentIndex--;
          timer = setTimeout(tick, 35);
        } else {
          isDeleting = false;
          timer = setTimeout(tick, 500); // pause before retyping
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, [fullTitle]);

  const handleGreetingClick = () => {
    navigate(isAuthenticated ? '/admin' : '/login');
  };

  return (
    <div className='home container-fluid'>
      <div className='row align-items-center w-100 m-0'>
        {/* Left Column - Text Content */}
        <div className='col-12 col-xl-10 text-content'>
          <h6
            className='greeting-clickable'
            onClick={handleGreetingClick}
            title="Click here to open Admin Login"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleGreetingClick();
              }
            }}
          >
            {profile.greeting || "Hello,"}
          </h6>

          <h1 className='home-name'>
            I am <strong>{profile.displayName || "Abhishek"}</strong>
          </h1>

          <div className='title-typewriter'>
            <span>{displayedTitle}</span>
            <span className='cursor-blink'>|</span>
          </div>

          {introLines.map((line, idx) => (
            <p key={idx} className='home-intro-text'>{line}</p>
          ))}

          <div className='social'>
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                <LinkedInIcon className="icon" />
              </a>
            )}
            {profile.socialLinks?.facebook && (
              <a href={profile.socialLinks.facebook} target="_blank" rel="noreferrer" title="Facebook">
                <FacebookIcon className="icon" />
              </a>
            )}
            {profile.socialLinks?.instagram && (
              <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" title="Instagram">
                <InstagramIcon className="icon" />
              </a>
            )}
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" title="GitHub">
                <GitHubIcon className="icon" />
              </a>
            )}
          </div>

          <div>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <button className='btn-resume'>View Resume</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
