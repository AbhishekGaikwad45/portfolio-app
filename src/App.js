import React from 'react';
import './App.css';



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Asset/Component/Layout';
// import Home from './Asset/Component/Home';
// import About from './Asset/Component/About';
// import Projects from './Asset/Component/Projects';
// import ContactForm from './Asset/Component/ContactForm';
// import Navbar from './Asset/Component/Navbar';
// import Footer from './Asset/Component/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
        <Layout/>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactForm />} />
          
        </Routes> 
        <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;