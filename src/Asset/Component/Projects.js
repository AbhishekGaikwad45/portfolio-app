import React from 'react';
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








function Projects() {
  return (
    <div className="container py-2">
      <h1 className="text-white mb-4">Projects</h1>
      <p className="text-light">
        
      </p>

      <h5 className="text-white my-4">Screenshots</h5>

      <div className="row g-4">
        {[snap, snap1, snap2, snap3].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 link">
  <a
    href="https://agriculture-product-selling-website3.onrender.com"
    target="_blank"
    rel="noreferrer"
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>
<div className="row g-4 mt-3">
        {[snap4, snap5, snap6, snap7].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
  <a
    href="https://freelancer-website-bw7d.onrender.com"
    target="_blank"
    rel="noreferrer"
    className='button'
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>

<div className="row g-4 mt-3">
        {[snap8, snap9, snap10, snap11,snap12,snap13].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
  <a
    href=" https://github.com/AbhishekGaikwad45/Music-"
    target="_blank"
    rel="noreferrer"
    className='button'
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>

<div className="row g-4 mt-3">
        {[snap14, snap15].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
  <a
    href="https://weather-app-one-eta-14.vercel.app/"
    target="_blank"
    rel="noreferrer"
    className='button'
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>


<div className="row g-4 mt-3">
        {[snap16, snap17,snap18,snap19,snap20].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
   <a
    href="https://github.com/AbhishekGaikwad45/Attendence-Manegement-System"
    target="_blank"
    rel="noreferrer"
    className='button'
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>

<div className="row g-4 mt-3">
        {[snap21, snap22,snap23,snap24,snap25,snap26].map((image, index) => (
          <div className="col-12 col-sm-6 col-lg-6" key={index}>
            <img
              src={image}
              className="img-fluid rounded shadow snapshot w-100"
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </div>
       <div className="mt-4 link">
   <a
    href="https://github.com/AbhishekGaikwad45/Instutute_Manegment_sys"
    target="_blank"
    rel="noreferrer"
    className='button'
    style={{ color: 'white', backgroundColor: 'green', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}
  >
    Visit Project
  </a>
</div>




    </div>
  );
}

export default Projects;
