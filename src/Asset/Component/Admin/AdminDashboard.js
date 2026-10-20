import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  updatePortfolio,
  uploadProfilePhoto,
  uploadResume,
  uploadAboutImage,
  uploadProjectImage,
  addProject,
  updateProject,
  deleteProject,
  changePassword,
  resolveAssetUrl
} from '../../../services/api';
import { usePortfolio } from '../../../context/PortfolioContext';
import defaultLogo from '../../Images/Abhishek image.jpeg';
import defaultDevImage from '../../Images/Devoloper.jpg';

import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';

import '../../Css/Admin.css';

const AdminDashboard = () => {
  const { portfolio, setPortfolio, logout, adminUser } = usePortfolio();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);

  // Local form states
  const [profileData, setProfileData] = useState(portfolio.profile || {});
  const [aboutData, setAboutData] = useState(portfolio.about || {});
  const [skillsData, setSkillsData] = useState(portfolio.skills || { technical: [], additional: [] });
  const [experienceData, setExperienceData] = useState(portfolio.experience || []);
  const [educationData, setEducationData] = useState(portfolio.education || []);
  const [certificationsData, setCertificationsData] = useState(portfolio.certifications || []);
  const [projectsData, setProjectsData] = useState(portfolio.projects || []);

  // Temporary inputs
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newAddSkill, setNewAddSkill] = useState('');
  
  // Password change
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  // Sync state when portfolio changes
  useEffect(() => {
    if (portfolio.profile) setProfileData(portfolio.profile);
    if (portfolio.about) setAboutData(portfolio.about);
    if (portfolio.skills) setSkillsData(portfolio.skills);
    if (portfolio.experience) setExperienceData(portfolio.experience);
    if (portfolio.education) setEducationData(portfolio.education);
    if (portfolio.certifications) setCertificationsData(portfolio.certifications);
    if (portfolio.projects) setProjectsData(portfolio.projects);
  }, [portfolio]);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: '', message: '' });
    }, 4500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ===============================
  // 1. PROFILE & RESUME HANDLERS
  // ===============================
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updatePortfolio({ profile: profileData });
      setPortfolio(res.portfolio);
      showNotification('success', 'Profile information updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const res = await uploadProfilePhoto(file);
      setPortfolio(res.portfolio);
      setProfileData(res.portfolio.profile);
      showNotification('success', 'Profile photo uploaded and updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to upload photo.');
    } finally {
      setSaving(false);
      e.target.value = '';
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const res = await uploadResume(file);
      setPortfolio(res.portfolio);
      setProfileData(res.portfolio.profile);
      showNotification('success', 'Resume PDF uploaded and updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to upload resume.');
    } finally {
      setSaving(false);
      e.target.value = '';
    }
  };

  // ===============================
  // 2. ABOUT HANDLERS
  // ===============================
  const handleAboutSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updatePortfolio({ about: aboutData });
      setPortfolio(res.portfolio);
      showNotification('success', 'About information updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to update about section.');
    } finally {
      setSaving(false);
    }
  };

  const handleAboutImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const res = await uploadAboutImage(file);
      setPortfolio(res.portfolio);
      setAboutData(res.portfolio.about);
      showNotification('success', 'About image uploaded successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to upload about image.');
    } finally {
      setSaving(false);
      e.target.value = '';
    }
  };

  // ===============================
  // 3. SKILLS HANDLERS
  // ===============================
  const addTechSkill = () => {
    if (!newTechSkill.trim()) return;
    setSkillsData({
      ...skillsData,
      technical: [...skillsData.technical, newTechSkill.trim()]
    });
    setNewTechSkill('');
  };

  const removeTechSkill = (index) => {
    setSkillsData({
      ...skillsData,
      technical: skillsData.technical.filter((_, i) => i !== index)
    });
  };

  const addAddSkill = () => {
    if (!newAddSkill.trim()) return;
    setSkillsData({
      ...skillsData,
      additional: [...skillsData.additional, newAddSkill.trim()]
    });
    setNewAddSkill('');
  };

  const removeAddSkill = (index) => {
    setSkillsData({
      ...skillsData,
      additional: skillsData.additional.filter((_, i) => i !== index)
    });
  };

  const handleSkillsSave = async () => {
    setSaving(true);
    try {
      const res = await updatePortfolio({ skills: skillsData });
      setPortfolio(res.portfolio);
      showNotification('success', 'Skills updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to update skills.');
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // 4. WORK EXPERIENCE HANDLERS
  // ===============================
  const addExperienceItem = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      role: 'Full Stack Developer',
      company: 'Company Name',
      duration: 'Year - Year',
      description: 'Describe your responsibilities and achievements.'
    };
    setExperienceData([...experienceData, newItem]);
  };

  const updateExperienceItem = (id, field, value) => {
    setExperienceData(
      experienceData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeExperienceItem = (id) => {
    setExperienceData(experienceData.filter((item) => item.id !== id));
  };

  const handleExperienceSave = async () => {
    setSaving(true);
    try {
      const res = await updatePortfolio({ experience: experienceData });
      setPortfolio(res.portfolio);
      showNotification('success', 'Work experience updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to update experience.');
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // 5. EDUCATION & CERTIFICATIONS HANDLERS
  // ===============================
  const addEducationItem = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: 'Degree / Certificate',
      institution: 'University / Institute',
      year: 'Year - Year',
      details: 'Specialization or achievements'
    };
    setEducationData([...educationData, newItem]);
  };

  const updateEducationItem = (id, field, value) => {
    setEducationData(
      educationData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeEducationItem = (id) => {
    setEducationData(educationData.filter((item) => item.id !== id));
  };

  const addCertItem = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      name: 'Certification Title',
      issuer: 'Issuing Organization',
      year: 'Year',
      credentialUrl: ''
    };
    setCertificationsData([...certificationsData, newItem]);
  };

  const updateCertItem = (id, field, value) => {
    setCertificationsData(
      certificationsData.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeCertItem = (id) => {
    setCertificationsData(certificationsData.filter((item) => item.id !== id));
  };

  const handleEduCertSave = async () => {
    setSaving(true);
    try {
      const res = await updatePortfolio({
        education: educationData,
        certifications: certificationsData
      });
      setPortfolio(res.portfolio);
      showNotification('success', 'Education and Certifications updated successfully!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to update education & certifications.');
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // 6. PROJECTS HANDLERS
  // ===============================
  const handleAddNewProject = async () => {
    setSaving(true);
    try {
      const newProj = {
        title: 'New Project',
        description: 'Describe the project features, architecture, and tech stack.',
        liveLink: '',
        screenshots: []
      };
      const res = await addProject(newProj);
      setPortfolio(res.portfolio);
      setProjectsData(res.portfolio.projects);
      showNotification('success', 'New project added!');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to add project.');
    } finally {
      setSaving(false);
    }
  };

  const handleProjectFieldChange = (id, field, value) => {
    setProjectsData(
      projectsData.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSaveSingleProject = async (project) => {
    setSaving(true);
    try {
      const res = await updateProject(project.id, project);
      setPortfolio(res.portfolio);
      showNotification('success', `Saved project: "${project.title}"!`);
    } catch (err) {
      showNotification('danger', err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSingleProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setSaving(true);
    try {
      const res = await deleteProject(id);
      setPortfolio(res.portfolio);
      setProjectsData(res.portfolio.projects);
      showNotification('success', `Project "${title}" deleted.`);
    } catch (err) {
      showNotification('danger', err.message || 'Failed to delete project.');
    } finally {
      setSaving(false);
    }
  };

  const handleProjectScreenshotUpload = async (projectId, file) => {
    if (!file) return;

    setSaving(true);
    try {
      const uploadRes = await uploadProjectImage(file);
      const imageUrl = uploadRes.imageUrl;

      // Find project and append screenshot
      const currentProj = projectsData.find((p) => p.id === projectId);
      if (currentProj) {
        const updatedScreenshots = [...(currentProj.screenshots || []), imageUrl];
        const updatedProj = { ...currentProj, screenshots: updatedScreenshots };
        const res = await updateProject(projectId, updatedProj);
        setPortfolio(res.portfolio);
        setProjectsData(res.portfolio.projects);
        showNotification('success', 'Screenshot uploaded and attached to project!');
      }
    } catch (err) {
      showNotification('danger', err.message || 'Failed to upload screenshot.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveScreenshot = async (projectId, index) => {
    const currentProj = projectsData.find((p) => p.id === projectId);
    if (!currentProj) return;

    const updatedScreenshots = (currentProj.screenshots || []).filter((_, i) => i !== index);
    const updatedProj = { ...currentProj, screenshots: updatedScreenshots };

    setSaving(true);
    try {
      const res = await updateProject(projectId, updatedProj);
      setPortfolio(res.portfolio);
      setProjectsData(res.portfolio.projects);
      showNotification('success', 'Screenshot removed.');
    } catch (err) {
      showNotification('danger', err.message || 'Failed to remove screenshot.');
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // 7. CHANGE PASSWORD HANDLER
  // ===============================
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      showNotification('danger', 'New passwords do not match.');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      showNotification('danger', 'New password must be at least 6 characters.');
      return;
    }

    setSaving(true);
    try {
      await changePassword(pwdForm.currentPassword, pwdForm.newPassword);
      showNotification('success', 'Password successfully changed!');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showNotification('danger', err.message || 'Failed to change password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <h2 className="mb-0 fw-bold">Portfolio Admin Dashboard</h2>
          <small className="text-muted">
            Logged in as <strong className="text-info">{adminUser?.username || 'admin'}</strong>
          </small>
        </div>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <VisibilityIcon fontSize="small" /> View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          >
            <LogoutIcon fontSize="small" /> Logout
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {feedback.message && (
        <div className={`alert alert-${feedback.type} alert-dismissible fade show`} role="alert">
          {feedback.message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="admin-nav-tabs d-flex flex-wrap mb-4">
        <button
          className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <PersonIcon className="me-1" fontSize="small" /> Profile & Resume
        </button>
        <button
          className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <InfoIcon className="me-1" fontSize="small" /> About & Bio
        </button>
        <button
          className={`nav-link ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <BuildIcon className="me-1" fontSize="small" /> Skills
        </button>
        <button
          className={`nav-link ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          <WorkIcon className="me-1" fontSize="small" /> Work Experience
        </button>
        <button
          className={`nav-link ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <SchoolIcon className="me-1" fontSize="small" /> Education & Certs
        </button>
        <button
          className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <AccountTreeIcon className="me-1" fontSize="small" /> Projects ({projectsData.length})
        </button>
        <button
          className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <VpnKeyIcon className="me-1" fontSize="small" /> Security
        </button>
      </div>

      {/* ========================================================
          TAB 1: PROFILE & RESUME
         ======================================================== */}
      {activeTab === 'profile' && (
        <div className="row">
          <div className="col-12 col-lg-4 mb-4">
            <div className="admin-card text-center">
              <h5>Profile Photo</h5>
              <div className="my-3">
                <img
                  src={
                    profileData.profilePhotoUrl
                      ? resolveAssetUrl(profileData.profilePhotoUrl)
                      : defaultLogo
                  }
                  alt="Profile Preview"
                  className="admin-preview-img"
                />
              </div>
              <p className="text-muted small">
                JPG, PNG, WEBP, or AVIF. Automatically updates on the public sidebar!
              </p>
              <label className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1 cursor-pointer">
                <CloudUploadIcon fontSize="small" /> Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                  disabled={saving}
                />
              </label>

              <hr className="my-4 border-secondary" />

              <h5>Resume PDF</h5>
              <p className="text-muted small">
                Current Resume:{' '}
                {profileData.resumeUrl ? (
                  <a
                    href={resolveAssetUrl(profileData.resumeUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-info fw-semibold"
                  >
                    View File
                  </a>
                ) : (
                  'Default PDF'
                )}
              </p>
              <label className="btn btn-outline-success btn-sm d-inline-flex align-items-center gap-1 cursor-pointer">
                <CloudUploadIcon fontSize="small" /> Replace Resume PDF
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  style={{ display: 'none' }}
                  disabled={saving}
                />
              </label>
            </div>
          </div>

          <div className="col-12 col-lg-8 mb-4">
            <div className="admin-card">
              <h4>Profile Details</h4>
              <form onSubmit={handleProfileSave}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.name || ''}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Display Name (Hero)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.displayName || ''}
                      onChange={(e) =>
                        setProfileData({ ...profileData, displayName: e.target.value })
                      }
                      placeholder="Abhishek"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.title || ''}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      placeholder="Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Greeting</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.greeting || ''}
                      onChange={(e) => setProfileData({ ...profileData, greeting: e.target.value })}
                      placeholder="Hello,"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Home Intro Lines (One per line)</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={(profileData.introLines || []).join('\n')}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          introLines: e.target.value.split('\n')
                        })
                      }
                    />
                  </div>

                  <h5 className="mt-4 mb-2 text-info">Social & Contact Links</h5>
                  <div className="col-md-6">
                    <label className="form-label">LinkedIn URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileData.socialLinks?.linkedin || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, linkedin: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">GitHub URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileData.socialLinks?.github || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, github: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Facebook URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileData.socialLinks?.facebook || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, facebook: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Instagram URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={profileData.socialLinks?.instagram || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, instagram: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profileData.socialLinks?.email || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, email: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.socialLinks?.phone || ''}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: { ...profileData.socialLinks, phone: e.target.value }
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary d-inline-flex align-items-center gap-1"
                      disabled={saving}
                    >
                      <SaveIcon fontSize="small" /> Save Profile Details
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: ABOUT & BIO
         ======================================================== */}
      {activeTab === 'about' && (
        <div className="row">
          <div className="col-12 col-lg-4 mb-4">
            <div className="admin-card text-center">
              <h5>About Section Image</h5>
              <div className="my-3">
                <img
                  src={
                    aboutData.imageUrl ? resolveAssetUrl(aboutData.imageUrl) : defaultDevImage
                  }
                  alt="About Preview"
                  className="admin-preview-rect img-fluid"
                />
              </div>
              <label className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-1 cursor-pointer">
                <CloudUploadIcon fontSize="small" /> Change About Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAboutImageUpload}
                  style={{ display: 'none' }}
                  disabled={saving}
                />
              </label>
            </div>
          </div>

          <div className="col-12 col-lg-8 mb-4">
            <div className="admin-card">
              <h4>About & Personal Information</h4>
              <form onSubmit={handleAboutSave}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">About Bio</label>
                    <textarea
                      rows="6"
                      className="form-control"
                      value={aboutData.bio || ''}
                      onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                      required
                    />
                  </div>

                  <h5 className="mt-4 mb-2 text-info">Personal Details</h5>
                  <div className="col-md-6">
                    <label className="form-label">Birthday</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aboutData.personalDetails?.birthday || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            birthday: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aboutData.personalDetails?.phone || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            phone: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={aboutData.personalDetails?.email || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            email: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Age</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aboutData.personalDetails?.age || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            age: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aboutData.personalDetails?.degree || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            degree: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aboutData.personalDetails?.city || ''}
                      onChange={(e) =>
                        setAboutData({
                          ...aboutData,
                          personalDetails: {
                            ...aboutData.personalDetails,
                            city: e.target.value
                          }
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary d-inline-flex align-items-center gap-1"
                      disabled={saving}
                    >
                      <SaveIcon fontSize="small" /> Save About Details
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: SKILLS
         ======================================================== */}
      {activeTab === 'skills' && (
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="admin-card">
              <h4>Technical Skills</h4>
              <p className="text-muted small">
                These are displayed under the Skills section in two responsive columns.
              </p>
              <div className="d-flex flex-wrap mb-3">
                {(skillsData.technical || []).map((skill, index) => (
                  <span className="skill-tag" key={index}>
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeTechSkill(index)}
                      title="Remove skill"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Next.js, Python, PostgreSQL"
                  value={newTechSkill}
                  onChange={(e) => setNewTechSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechSkill();
                    }
                  }}
                />
                <button className="btn btn-outline-primary" type="button" onClick={addTechSkill}>
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <div className="admin-card">
              <h4>Additional Skills</h4>
              <p className="text-muted small">
                Tools, platforms, and secondary skills (e.g. GitHub, Docker, AWS).
              </p>
              <div className="d-flex flex-wrap mb-3">
                {(skillsData.additional || []).map((skill, index) => (
                  <span className="skill-tag" key={index}>
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeAddSkill(index)}
                      title="Remove skill"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Git, Docker, Figma"
                  value={newAddSkill}
                  onChange={(e) => setNewAddSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addAddSkill();
                    }
                  }}
                />
                <button className="btn btn-outline-primary" type="button" onClick={addAddSkill}>
                  Add Skill
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 text-end">
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-1"
              onClick={handleSkillsSave}
              disabled={saving}
            >
              <SaveIcon fontSize="small" /> Save All Skills
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: WORK EXPERIENCE
         ======================================================== */}
      {activeTab === 'experience' && (
        <div className="row">
          <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
            <h4>Work Experience Entries</h4>
            <button
              className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
              onClick={addExperienceItem}
            >
              <AddCircleOutlineIcon fontSize="small" /> Add Experience
            </button>
          </div>

          {experienceData.map((exp, index) => (
            <div className="col-12 mb-3" key={exp.id || index}>
              <div className="admin-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-warning">#{index + 1} {exp.role || 'Role'}</h5>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeExperienceItem(exp.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" /> Remove
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Role / Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.role || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'role', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Company / Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.company || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.duration || ''}
                      placeholder="e.g. 2023 - Present"
                      onChange={(e) => updateExperienceItem(exp.id, 'duration', e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Responsibilities & Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={exp.description || ''}
                      onChange={(e) => updateExperienceItem(exp.id, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 text-end">
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-1"
              onClick={handleExperienceSave}
              disabled={saving}
            >
              <SaveIcon fontSize="small" /> Save All Work Experience
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: EDUCATION & CERTIFICATIONS
         ======================================================== */}
      {activeTab === 'education' && (
        <div className="row">
          {/* Education column */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Education</h4>
              <button
                className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
                onClick={addEducationItem}
              >
                <AddCircleOutlineIcon fontSize="small" /> Add Education
              </button>
            </div>
            {educationData.map((edu, index) => (
              <div className="admin-card mb-3" key={edu.id || index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-warning mb-0">#{index + 1} {edu.degree}</h6>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeEducationItem(edu.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label small">Degree / Major</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={edu.degree || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="col-8">
                    <label className="form-label small">Institution</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={edu.institution || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small">Year</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={edu.year || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'year', e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small">Details</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={edu.details || ''}
                      onChange={(e) => updateEducationItem(edu.id, 'details', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications column */}
          <div className="col-12 col-lg-6 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Certifications</h4>
              <button
                className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
                onClick={addCertItem}
              >
                <AddCircleOutlineIcon fontSize="small" /> Add Certification
              </button>
            </div>
            {certificationsData.map((cert, index) => (
              <div className="admin-card mb-3" key={cert.id || index}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-warning mb-0">#{index + 1} {cert.name}</h6>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeCertItem(cert.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                </div>
                <div className="row g-2">
                  <div className="col-12">
                    <label className="form-label small">Certification Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={cert.name || ''}
                      onChange={(e) => updateCertItem(cert.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-8">
                    <label className="form-label small">Issuer / Platform</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={cert.issuer || ''}
                      onChange={(e) => updateCertItem(cert.id, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small">Year</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={cert.year || ''}
                      onChange={(e) => updateCertItem(cert.id, 'year', e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small">Credential URL (optional)</label>
                    <input
                      type="url"
                      className="form-control form-control-sm"
                      value={cert.credentialUrl || ''}
                      placeholder="https://..."
                      onChange={(e) => updateCertItem(cert.id, 'credentialUrl', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 text-end">
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-1"
              onClick={handleEduCertSave}
              disabled={saving}
            >
              <SaveIcon fontSize="small" /> Save Education & Certifications
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: PROJECTS
         ======================================================== */}
      {activeTab === 'projects' && (
        <div className="row">
          <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
            <h4>Projects Management</h4>
            <button
              className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
              onClick={handleAddNewProject}
              disabled={saving}
            >
              <AddCircleOutlineIcon fontSize="small" /> Add New Project
            </button>
          </div>

          {projectsData.map((project, index) => (
            <div className="col-12 mb-4" key={project.id || index}>
              <div className="admin-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-warning">
                    Project #{index + 1}: {project.title}
                  </h5>
                  <button
                    className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                    onClick={() => handleDeleteSingleProject(project.id, project.title)}
                    disabled={saving}
                  >
                    <DeleteOutlineIcon fontSize="small" /> Delete Project
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-md-7">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={project.title || ''}
                      onChange={(e) =>
                        handleProjectFieldChange(project.id, 'title', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">Live Project Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={project.liveLink || ''}
                      placeholder="https://..."
                      onChange={(e) =>
                        handleProjectFieldChange(project.id, 'liveLink', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Project Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      value={project.description || ''}
                      onChange={(e) =>
                        handleProjectFieldChange(project.id, 'description', e.target.value)
                      }
                    />
                  </div>

                  {/* Screenshots gallery & upload */}
                  <div className="col-12">
                    <label className="form-label d-flex justify-content-between align-items-center">
                      <span>Screenshots / Showcase Images</span>
                      <label className="btn btn-outline-info btn-sm d-inline-flex align-items-center gap-1 cursor-pointer mb-0">
                        <CloudUploadIcon fontSize="small" /> Upload New Screenshot
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleProjectScreenshotUpload(project.id, e.target.files[0]);
                              e.target.value = '';
                            }
                          }}
                          style={{ display: 'none' }}
                          disabled={saving}
                        />
                      </label>
                    </label>

                    {/* Render custom uploaded screenshots */}
                    {project.screenshots && project.screenshots.length > 0 ? (
                      <div className="row g-2 mt-2">
                        {project.screenshots.map((imgUrl, sIndex) => (
                          <div className="col-6 col-md-3" key={sIndex}>
                            <div className="position-relative border rounded p-1 bg-dark">
                              <img
                                src={resolveAssetUrl(imgUrl)}
                                alt={`Screenshot ${sIndex + 1}`}
                                className="img-fluid rounded"
                                style={{ height: '110px', width: '100%', objectFit: 'cover' }}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 py-0 px-1"
                                onClick={() => handleRemoveScreenshot(project.id, sIndex)}
                                title="Remove screenshot"
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted small mt-1">
                        Currently using bundled screenshots. Uploading screenshots above will replace/expand the showcase for this project.
                      </p>
                    )}
                  </div>

                  <div className="col-12 mt-3 text-end">
                    <button
                      className="btn btn-primary btn-sm d-inline-flex align-items-center gap-1"
                      onClick={() => handleSaveSingleProject(project)}
                      disabled={saving}
                    >
                      <SaveIcon fontSize="small" /> Save Changes to this Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          TAB 7: SECURITY & PASSWORD
         ======================================================== */}
      {activeTab === 'security' && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="admin-card">
              <h4>Change Admin Password</h4>
              <p className="text-muted small">
                Protect your dashboard by changing the default administrator password.
              </p>
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={pwdForm.currentPassword}
                    onChange={(e) =>
                      setPwdForm({ ...pwdForm, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={pwdForm.newPassword}
                    onChange={(e) =>
                      setPwdForm({ ...pwdForm, newPassword: e.target.value })
                    }
                    placeholder="Enter new password (min. 6 chars)"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={pwdForm.confirmPassword}
                    onChange={(e) =>
                      setPwdForm({ ...pwdForm, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 d-inline-flex justify-content-center align-items-center gap-1"
                  disabled={saving}
                >
                  <SaveIcon fontSize="small" /> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
