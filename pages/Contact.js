import React, { useState, useRef } from 'react';
import supabase from '../src/utils/supabase';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const backgroundVideo = '/bgVid.mp4';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataWithTimestamp = {
        ...formData,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert(formDataWithTimestamp);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted');
        setShowNotification(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setTimeout(() => setShowNotification(false), 3000); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOkayButton = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>
      <main className={styles.mainContent}>
        <h1 className={styles.contactTitle}>Contact Us</h1>
        <p className={styles.titleDesc}>
          If you have a new and innovative scalable project, unique idea, or research you&apos;d like to pursue, fill out the form below. We&apos;re here to help guide and support you!
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Enter your name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Enter your email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-label="Enter your phone number"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              aria-label="Enter subject"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Description*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-label="Enter your message"
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        {showNotification && (
          <div className={styles.notificationPopup}>
            <div className={styles.notificationContent}>
              <h2>Message sent successfully!</h2>
              <p>Your message has been sent. Thank you for reaching out!</p>
              <button onClick={handleOkayButton}>Okay</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Contact;
