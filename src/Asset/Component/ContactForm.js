import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../Css/ContactForm.css';
import { toast } from 'sonner';

//  Initialize once (BEST PRACTICE)
emailjs.init(process.env.REACT_APP_PUBLIC_API_KEY);

const ContactForm = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (e) => {
  e.preventDefault();
  setIsSending(true);

  // Loading toast
  const loadingToast = toast.loading("Sending message...");

  try {

    // Send BOTH emails together 
    await Promise.all([
      emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current
      ),
      emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_AUTO_REPLY_TEMPLATE_ID,
        form.current
      )
    ]);

    toast.dismiss(loadingToast);

    toast.success("🚀 Message sent! Check your email for confirmation.");

    e.target.reset();

  } catch (error) {

    toast.dismiss(loadingToast);

    toast.error(" Failed to send message. Please try again.");

    console.error(error);

  } finally {
    setIsSending(false);
  }
};


  return (
    <div className='contact-form-container'>
      <h2>Contact Us</h2>

      <form ref={form} onSubmit={sendEmail} className="contact-form">

        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Your Email" required />

        <label>Phone</label>
        <input type="tel" name="phone" placeholder="Your Phone No" required />

        <label>Message</label>
        <textarea name="message" placeholder="Your Message" rows="5" required />

        {/*  Add time automatically */}
        <input 
          type="hidden" 
          name="time" 
          value={new Date().toLocaleString()} 
        />

        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </button>

      </form>
    </div>
  );
};

export default ContactForm;
