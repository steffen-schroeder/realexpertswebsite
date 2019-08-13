import React from 'react';
import { useContactData } from '../hooks/use-contact-data';
import facebookIcon from '../img/icons/social/facebook.svg';
import instagramIcon from '../img/icons/social/instagram.svg';
import linkedinIcon from '../img/icons/social/linkedin.svg';
import twitterIcon from '../img/icons/social/twitter.svg';
import xingIcon from '../img/icons/social/xing.svg';
import youtubeIcon from '../img/icons/social/youtube.svg';
import ContactForm from './ContactForm';

const FooterContactForm = () => {

  const {
    contactInfo: {
      title,
      footerContent,
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
              <p>{footerContent}</p>
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
            <ContactForm/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterContactForm;

