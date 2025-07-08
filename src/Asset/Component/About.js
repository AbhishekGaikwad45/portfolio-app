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
<h2 style={{color:'white'}} >Skills</h2>
      <div className='row'>
        <div className='col-6'>
          <ul>
            
            <li>C</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>javascript</li>
            <li>Bootstrap</li>
            <li>JQuery</li>
          </ul>
          
          
          </div>
          <div className='col-6'>
           <ul>
            <li> core java</li>
            <li>C++</li>
            <li>ReactJs</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            
           
          </ul>
          
          </div>

      </div>
      <h1 >Additional Skills</h1>
      <div className='row'>
        <div className='col-6'>
          <ul>
            
            <li>GitHub</li>
           
            
          </ul>
          
          
          </div>
          <div className='col-6'>
           <ul>
             
            <li>Tailwind CSS</li>
           
          </ul>
          
          </div>

      </div>
      

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
          <p><strong>Email:</strong> gaikwadabhi246@gmail.com</p>
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <p><strong>Age:</strong> 23</p>
          <p><strong>Degree:</strong>  Post Graduation</p>
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
