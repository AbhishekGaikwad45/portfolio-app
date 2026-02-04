import React from 'react'
import '../Css/About.css'
import logo from '../Images/Devoloper.jpg'


function About() {
  return (
    <div>
      <h1 style={{color:'white'}}>About</h1>
       <p>
  Hi, I'm <strong>Abhishek Gaikwad</strong>, a passionate and detail-oriented full-stack developer with a strong foundation in front-end and back-end technologies. I specialize in building responsive, user-friendly web applications using technologies like <strong>React</strong>, <strong>Node.js</strong>,<strong>Express.js</strong> and <strong>MongoDB</strong>.
  <br /><br />
  I'm constantly learning new tools and best practices to stay ahead in the fast-evolving tech landscape. Whether it's creating dynamic UIs or building RESTful APIs, I love turning ideas into reality through clean and efficient code.
</p>

      
     {/* ================= STRENGTHS ================= */}
      <h2 className="text-white mt-5">Strengths</h2>
      <ul className="text-light">
        <li>Problem Solving</li>
        <li>Quick Learner</li>
        <li>Team Collaboration</li>
        <li>Time Management</li>
      </ul>  
      

      <div className="container">
  <div className="row align-items-center">
    <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
      <img src={logo} className="img-fluid mainlogo" alt="Logo" />
    </div>
    <div className="col-12 col-md-6">
      <div className="row">
        <div className="col-12 col-sm-6 mb-3">
          <p><strong>Birthday:</strong> 29 Sep 2001</p>
          <p><strong>Phone:</strong> +91 9665670540</p>
          <p><strong>Email:</strong> abhishekgaikwad2766<br></br>@gmail.com</p>
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <p><strong>Age:</strong> 24</p>
          <p><strong>Degree:</strong> Deploma in CS</p>
          <p><strong>City:</strong> Pune</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default About
