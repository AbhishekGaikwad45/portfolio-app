import React from 'react';
import '../Css/Home.css';
import { Button } from 'react-bootstrap';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

function Home() {
  return (
    <div className='home container-fluid'>
      <div className='row align-items-center'>
        {/* Left Column - Text Content */}
        <div className='col-12  text-content '>
          <h6 className='ms-5'>Hello,</h6>
          <h1 className='ms-5'>I am <strong>Abhishek</strong></h1>
          <h2 className='ms-5 typing-container'>Full Stack Developer</h2>
          <p className='ms-5'>I am a skilled and passionate web developer with experience in</p>
          <p className='ms-5'>creating visually appealing and user-friendly websites.</p>

          <div className='social mt-4 ms-5'>
            <a href='https://www.linkedin.com/in/abhishek-gaikwad-b6819731b/' target="_blank"><LinkedInIcon className="icon" /></a>
           <a href='https://www.facebook.com/abhishek.gaikwad.77736' target="_blank"><FacebookIcon className="icon" /></a>
            <a href='https://www.instagram.com/abhishek_gaikwad_45/'target="_blank"> <InstagramIcon className="icon" /></a>
           <a href='https://github.com/AbhishekGaikwad45'target="_blank"><GitHubIcon className="icon" /></a>

          
            
          </div>
         <a href='/Abhishek Gaikwad Resume.pdf' target="_blank" rel="noopener noreferrer">
         <button className='btn btn-success ms-5 mt-2'>View Resume</button>
         </a>




        </div>

        {/* Right Column - Background or Image */}
        <div className='col-12  back'>

        </div>
      </div>
    </div>
  );
}

export default Home;
