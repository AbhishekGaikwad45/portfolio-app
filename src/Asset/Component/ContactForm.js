import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../Css/ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.sendForm(
         process.env.REACT_APP_SERVICE_ID,
       process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_API_KEY
      );
      alert('Message sent!');
      e.target.reset();
    } catch (error) {
      console.error('Email send failed:', error);
      alert(`Failed to send message: ${error?.text || 'Unknown error'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='contact-form-container'>
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" placeholder="Your Name" required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" placeholder="Your Email" required />

        <label htmlFor="phone">Phone</label>
        <input id="phone" type="tel" name="phone" placeholder="Your Phone No" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your Message" rows="5" required />

        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
