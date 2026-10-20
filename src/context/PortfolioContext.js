import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPortfolio, verifyAuth, clearAuthToken } from '../services/api';

const PortfolioContext = createContext(null);

export const initialPortfolioData = {
  profile: {
    name: "Abhishek Gaikwad",
    displayName: "Abhishek",
    title: "Full Stack Developer",
    greeting: "Hello,",
    introLines: [
      "I am a skilled and passionate web developer with experience in",
      "creating visually appealing and user-friendly websites."
    ],
    profilePhotoUrl: "",
    resumeUrl: "/Abhishek Gaikwad Resume.pdf",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abhishek-gaikwad-b6819731b/",
      github: "https://github.com/AbhishekGaikwad45",
      facebook: "https://www.facebook.com/abhishek.gaikwad.77736",
      instagram: "https://www.instagram.com/abhishek_gaikwad_45/",
      email: "gaikwadabhi246@gmail.com",
      phone: "+91 9665670540"
    }
  },
  about: {
    bio: "Hi, I'm Abhishek Gaikwad, a passionate and detail-oriented full-stack developer with a strong foundation in front-end and back-end technologies. I specialize in building responsive, user-friendly web applications using technologies like React, Node.js, Express.js and MongoDB.\n\nI'm constantly learning new tools and best practices to stay ahead in the fast-evolving tech landscape. Whether it's creating dynamic UIs or building RESTful APIs, I love turning ideas into reality through clean and efficient code.",
    imageUrl: "",
    personalDetails: {
      birthday: "29 Sep 2001",
      phone: "+91 9665670540",
      email: "gaikwadabhi246@gmail.com",
      age: "23",
      degree: "Graduation",
      city: "Pune"
    }
  },
  skills: {
    technical: [
      "C",
      "HTML5",
      "CSS3",
      "javascript",
      "Bootstrap",
      "JQuery",
      "C++",
      "ReactJs",
      "Node.js",
      "Express.js",
      "MongoDB"
    ],
    additional: [
      "GitHub"
    ]
  },
  experience: [
    {
      id: "exp-1",
      role: "Full Stack Developer",
      company: "Freelance & Projects",
      duration: "2023 - Present",
      description: "Building full stack web applications with React, Node.js, Express, and MongoDB. Designing REST APIs and responsive UIs."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Graduation",
      institution: "Savitribai Phule Pune University",
      year: "2020 - 2024",
      details: "Computer Science and software development fundamentals."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Full Stack Web Development",
      issuer: "MERN Stack Certification",
      year: "2024",
      credentialUrl: ""
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Agriculture Product Selling Website",
      description: "The Agriculture Product Selling Website is an online platform that connects farmers and agricultural product suppliers with buyers, allowing them to sell fresh produce, seeds, fertilizers, tools, and more directly through a digital storefront.",
      liveLink: "https://agriculture-product-selling-website3.onrender.com",
      defaultScreenshotKeys: ["snap", "snap1", "snap2", "snap3"],
      screenshots: []
    },
    {
      id: "proj-2",
      title: "Freelancer Website",
      description: "A comprehensive platform connecting freelancers with clients, allowing users to showcase services, manage requests, and collaborate seamlessly online.",
      liveLink: "https://freelancer-website-bw7d.onrender.com",
      defaultScreenshotKeys: ["snap4", "snap5", "snap6", "snap7"],
      screenshots: []
    },
    {
      id: "proj-3",
      title: "Music App",
      description: "A responsive web-based music application that lets users discover music, explore playlists, listen to favorite tracks, and enjoy a rich audio streaming experience.",
      liveLink: "https://github.com/AbhishekGaikwad45/Music-",
      defaultScreenshotKeys: ["snap8", "snap9", "snap10", "snap11", "snap12", "snap13"],
      screenshots: []
    },
    {
      id: "proj-4",
      title: "Weather App",
      description: "A real-time weather forecasting application providing current conditions, forecasts, and atmospheric data for locations worldwide with a clean UI.",
      liveLink: "https://weather-app-one-eta-14.vercel.app/",
      defaultScreenshotKeys: ["snap14", "snap15"],
      screenshots: []
    },
    {
      id: "proj-5",
      title: "Attendance Management System",
      description: "A web-based attendance management portal for educational institutions and organizations featuring teacher registration, login, class-wise attendance marking, and student tracking.",
      liveLink: "https://github.com/AbhishekGaikwad45/Attendence-Manegement-System",
      defaultScreenshotKeys: ["snap16", "snap17", "snap18", "snap19", "snap20"],
      screenshots: []
    },
    {
      id: "proj-6",
      title: "Institute Management System (Spark)",
      description: "An end-to-end management system with multi-role dashboards for faculty, students, and counselors, facilitating seamless academic and administrative operations.",
      liveLink: "https://github.com/AbhishekGaikwad45/Instutute_Manegment_sys",
      defaultScreenshotKeys: ["snap21", "snap22", "snap23", "snap24", "snap25", "snap26"],
      screenshots: []
    }
  ]
};

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false, user: null, checking: true });

  const loadPortfolio = useCallback(async () => {
    try {
      const data = await getPortfolio();
      if (data && data.profile) {
        setPortfolio(data);
      }
    } catch (err) {
      console.warn('Could not load portfolio from server, using local fallback state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await verifyAuth();
      if (res.valid) {
        setAuthStatus({ isAuthenticated: true, user: res.user, checking: false });
      } else {
        setAuthStatus({ isAuthenticated: false, user: null, checking: false });
      }
    } catch (err) {
      setAuthStatus({ isAuthenticated: false, user: null, checking: false });
    }
  }, []);

  useEffect(() => {
    loadPortfolio();
    checkAuth();
  }, [loadPortfolio, checkAuth]);

  const updatePortfolioState = (newData) => {
    setPortfolio(newData);
  };

  const logout = () => {
    clearAuthToken();
    setAuthStatus({ isAuthenticated: false, user: null, checking: false });
  };

  const setLoginSuccess = (user) => {
    setAuthStatus({ isAuthenticated: true, user, checking: false });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio: updatePortfolioState,
        refreshPortfolio: loadPortfolio,
        loading,
        isAuthenticated: authStatus.isAuthenticated,
        adminUser: authStatus.user,
        checkingAuth: authStatus.checking,
        checkAuth,
        logout,
        setLoginSuccess
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
