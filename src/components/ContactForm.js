import React from 'react';
import Link from 'gatsby-link';
import { useContactData } from '../hooks/use-contact-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faXing,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const ContactForm = () => {

  const {
    contactInfo: {
      title,
      content,
      socialMedia: {
        facebook,
        instagram,
        linkin,
        twitter,
        xing,
        youtube,
      },
    },
  } = useContactData();

  return (
    <div className="contact-form-footer">
      <section className="section">
        <div className="contact-content">
          <div className="contact-information">
            <h3 className="contact-title">{title}</h3>
            <div className="contact-content">
              <p>{content}</p>
            </div>
            <div className="contact-social-media-container">
              <a href={facebook} className="contact-social-media-link">
                <FontAwesomeIcon icon={faFacebookF} color="#00ACE9" size="2x"/> </a>
              <a href={instagram} className="contact-social-media-link">
                <FontAwesomeIcon icon={faInstagram} color="#00ACE9" size="2x"/> </a>
              <a href={linkin} className="contact-social-media-link">
                <FontAwesomeIcon icon={faLinkedinIn} color="#00ACE9" size="2x"/> </a>
              <a href={twitter} className="contact-social-media-link">
                <FontAwesomeIcon icon={faTwitter} color="#00ACE9" size="2x"/> </a>
              <a href={xing} className="contact-social-media-link">
                <FontAwesomeIcon icon={faXing} color="#00ACE9" size="2x"/> </a>
              <a href={youtube} className="contact-social-media-link">
                <FontAwesomeIcon icon={faYoutube} color="#00ACE9" size="2x"/> </a>
            </div>
          </div>
          <div className="contact-form">
            <form name="contact" method="POST" data-netlify="true" action="/success/">
              <input type="hidden" name="form-name" value="contact" />
              <div className="contact-form-wrapper">
                <div className="contact-form-name">
                  <label htmlFor="name">Name</label> <input type="text" name="name"/>
                </div>
                <div className="contact-form-email">
                  <label htmlFor="email">Email-Adresse</label> <input type="email" name="email"/>
                </div>
                <div className="contact-form-message">
                  <label htmlFor="message">Ihre Nachricht</label> <textarea name="message" rows={8}/>
                </div>
              </div>
              <Link to="/datenschutz" className="contact-privacy-policy-link">Datenschutzrichtlinie</Link>
              <button type="submit" className="button-round-blue">Absenden</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;

