import React from 'react';
import '../Css/About.css';
import defaultLogo from '../Images/Devoloper.jpg';
import { usePortfolio } from '../../context/PortfolioContext';
import { resolveAssetUrl } from '../../services/api';

function About() {
  const { portfolio } = usePortfolio();
  const about = portfolio?.about || {};
  const skills = portfolio?.skills || { technical: [], additional: [] };
  const experience = portfolio?.experience || [];
  const education = portfolio?.education || [];
  const certifications = portfolio?.certifications || [];

  const aboutImg = about.imageUrl ? resolveAssetUrl(about.imageUrl) : defaultLogo;

  // Split technical skills into 2 balanced columns
  const techList = skills.technical || [];
  const midIndex = Math.ceil(techList.length / 2);
  const col1 = techList.slice(0, midIndex);
  const col2 = techList.slice(midIndex);

  // Split additional skills into 2 columns
  const addList = skills.additional || [];
  const addMid = Math.ceil(addList.length / 2);
  const addCol1 = addList.slice(0, addMid);
  const addCol2 = addList.slice(addMid);

  const personal = about.personalDetails || {};

  return (
    <div>
      <h1 style={{ color: 'white' }}>About</h1>
      {about.bio ? (
        about.bio.split('\n\n').map((paragraph, idx) => (
          <p key={idx} style={{ whiteSpace: 'pre-line' }}>{paragraph}</p>
        ))
      ) : (
        <p>
          Hi, I'm <strong>Abhishek Gaikwad</strong>, a passionate and detail-oriented full-stack developer with a strong foundation in front-end and back-end technologies. I specialize in building responsive, user-friendly web applications using technologies like <strong>React</strong>, <strong>Node.js</strong>, <strong>Express.js</strong> and <strong>MongoDB</strong>.
          <br /><br />
          I'm constantly learning new tools and best practices to stay ahead in the fast-evolving tech landscape. Whether it's creating dynamic UIs or building RESTful APIs, I love turning ideas into reality through clean and efficient code.
        </p>
      )}

      {/* Skills Section */}
      <h2 style={{ color: 'white' }}>Skills</h2>
      <div className='row'>
        <div className='col-6'>
          <ul>
            {col1.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className='col-6'>
          <ul>
            {col2.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Skills */}
      <h1>Additional Skills</h1>
      <div className='row'>
        <div className='col-6'>
          <ul>
            {addCol1.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className='col-6'>
          <ul>
            {addCol2.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personal Info & Photo */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
            <img
              src={aboutImg}
              className="img-fluid mainlogo"
              alt="Developer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultLogo;
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 col-sm-6 mb-3">
                <p><strong>Birthday:</strong> {personal.birthday || '29 Sep 2001'}</p>
                <p><strong>Phone:</strong> {personal.phone || '+91 9665670540'}</p>
                <p><strong>Email:</strong> {personal.email || 'gaikwadabhi246@gmail.com'}</p>
              </div>
              <div className="col-12 col-sm-6 mb-3">
                <p><strong>Age:</strong> {personal.age || '23'}</p>
                <p><strong>Degree:</strong> {personal.degree || 'Graduation'}</p>
                <p><strong>City:</strong> {personal.city || 'Pune'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      {experience && experience.length > 0 && (
        <div className="mt-5">
          <h1 style={{ color: 'white' }}>Work Experience</h1>
          <div className="row g-4 mt-1">
            {experience.map((exp) => (
              <div className="col-12" key={exp.id}>
                <div
                  style={{
                    border: '1px solid white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '4px 2px 0px 0px white',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h3 style={{ color: 'yellow', marginBottom: 0 }}>{exp.role}</h3>
                    <span className="badge bg-secondary px-3 py-2" style={{ fontSize: '14px' }}>
                      {exp.duration}
                    </span>
                  </div>
                  <h5 style={{ color: '#00d2ff', marginTop: '8px' }}>{exp.company}</h5>
                  <p className="mb-0 mt-2" style={{ fontSize: '16px' }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Certifications Section */}
      {((education && education.length > 0) || (certifications && certifications.length > 0)) && (
        <div className="mt-5">
          <div className="row g-4">
            {education && education.length > 0 && (
              <div className="col-12 col-lg-6">
                <h1 style={{ color: 'white' }}>Education</h1>
                <div className="d-flex flex-column gap-3 mt-3">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      style={{
                        border: '1px solid white',
                        borderRadius: '10px',
                        padding: '16px',
                        boxShadow: '4px 2px 0px 0px white',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <h4 style={{ color: 'yellow', marginBottom: '4px' }}>{edu.degree}</h4>
                      <p className="mb-1" style={{ fontSize: '16px' }}>
                        <strong>{edu.institution}</strong> ({edu.year})
                      </p>
                      {edu.details && (
                        <p className="mb-0 text-muted" style={{ fontSize: '15px', color: '#ccc' }}>
                          {edu.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div className="col-12 col-lg-6">
                <h1 style={{ color: 'white' }}>Certifications</h1>
                <div className="d-flex flex-column gap-3 mt-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        border: '1px solid white',
                        borderRadius: '10px',
                        padding: '16px',
                        boxShadow: '4px 2px 0px 0px white',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <h4 style={{ color: 'yellow', marginBottom: '4px' }}>{cert.name}</h4>
                      <p className="mb-1" style={{ fontSize: '16px' }}>
                        {cert.issuer} ({cert.year})
                      </p>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-info mt-2"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
