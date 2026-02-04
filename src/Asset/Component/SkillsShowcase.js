import React from 'react'
import '../Css/About.css'



function SkillsShowscase() {
  return (
    <div>
      <h1 style={{ color: 'white' }}>About</h1>

      <h2 style={{ color: 'white' }} >Skills</h2>
      <div className='row'>
        <div className='col-6'>
          <ul>

            <li>C</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>javascript</li>
            <li>Bootstrap</li>
            <li>JQuery</li>
            <li>Advanced Java</li>
            <li>Hibernate</li>

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
            <li>MySQL</li>
            <li>Spring Boot</li>


          </ul>

        </div>

      </div>
      <h1 >Additional Skills & tools</h1>
      <div className='row'>
        <div className='col-6'>
          <ul>

            <li>Git</li>
            <li>GitHub</li>
            <li>Vs code</li>
           


          </ul>


        </div>
        <div className='col-6'>
          <ul>

            <li>Tailwind CSS</li>
            <li>Postman</li>
            <li>Intelij</li>
            <li>Eclipse</li>

          </ul>

        </div>

      </div>


      <div className="container">

      </div>
    </div>



  )
}

export default SkillsShowscase
