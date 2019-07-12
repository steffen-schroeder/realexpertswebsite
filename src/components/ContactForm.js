import React from 'react';
import Link from 'gatsby-link';
import { useContactData } from '../hooks/use-contact-data';
import facebookIcon from '../img/icons/social/facebook.svg';
import instagramIcon from '../img/icons/social/instagram.svg';
import linkedinIcon from '../img/icons/social/linkedin.svg';
import twitterIcon from '../img/icons/social/twitter.svg';
import xingIcon from '../img/icons/social/xing.svg';
import youtubeIcon from '../img/icons/social/youtube.svg';

const ContactForm = () => {

  const {
    contactInfo: {
      title,
      content,
      socialMedia: {
        facebook,
        instagram,
        linkedin,
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
                <img src={facebookIcon} alt="Facebook"/>
              </a>
              <a href={instagram} className="contact-social-media-link">
                <img src={instagramIcon} alt="Instagramm"/>
              </a>
              <a href={linkedin} className="contact-social-media-link">
                <img src={linkedinIcon} alt="Linkedin"/>
              </a>
              <a href={twitter} className="contact-social-media-link">
                <img src={twitterIcon} alt="Twitter"/>
              </a>
              <a href={xing} className="contact-social-media-link">
                <img src={xingIcon} alt="Xing"/>
              </a>
              <a href={youtube} className="contact-social-media-link">
                <img src={youtubeIcon} alt="Youtube"/>
              </a>
            </div>
          </div>
          <div className="contact-form-wrapper">
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
        </div>
      </section>
    </div>
  );
};

export default ContactForm;

