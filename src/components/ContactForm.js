import React from 'react';
import Link from 'gatsby-link';
import { useContactData } from '../hooks/use-contact-data';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, } from 'react-share';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const ContactForm = () => {

  const {
    global: {
      url,
      defaultTwitterHandle
    },
    contactInfo: {
      title,
      content,
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
            <div>
              <OutboundLink href={url}>
                <FacebookShareButton url={url} className="facebook">
                  <FacebookIcon size={48}
                                round={false}
                                iconBgStyle={{ fill: '#879fc9' }}
                                logoFillColor='white'/>
                </FacebookShareButton>
              </OutboundLink>
              <OutboundLink href={url}>
                <TwitterShareButton url={url} className="twitter" title={title}
                                    via={defaultTwitterHandle.split('@').join('')}>
                  <TwitterIcon size={48}
                               round={false}
                               iconBgStyle={{ fill: '#879fc9' }}
                               logoFillColor='white'/>
                </TwitterShareButton>
              </OutboundLink>
            </div>
          </div>
          <div className="contact-form">
            <form name="contact" method="POST" data-netlify="true">
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
              <p>
                <Link to="/datenschutz">Datenschutzrichtlinie</Link>
              </p>
              <p>
                <button type="submit">Absenden</button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;

