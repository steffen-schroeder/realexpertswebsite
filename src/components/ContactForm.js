import React from 'react';
import Link from 'gatsby-link';

const ContactForm = () => {

  return (
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
  );
};

export default ContactForm;

