import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../Css/ContactForm.css';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4mvc2dk', 'template_zkmjb77', form.current, 'KdK9GBxAZlkKn6jpw')
      .then((result) => {
        console.log('Success:', result.text);
        alert('Message sent!');
      }, (error) => {
        console.error('Failed:', error.text);
        alert('Failed to send message.');
      });

    e.target.reset();
  };

  return (
    <div className='contact-form-container'>
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="name"  placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="email"  placeholder="Your Email" required />

         <label>Phone</label>
        <input type="tel" name="phone"  placeholder="Your Phone No" required />

        <label>Message</label>
        <textarea name="message" placeholder="Your Message" rows="5" required />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
