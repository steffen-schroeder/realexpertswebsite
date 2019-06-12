import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

export default class ContactForm extends React.Component {

  render() {

    console.log(this.props);

    return (

      <section className="section contact">
        {/*<Helmet title={`Kontakt | ${title}`}/>*/} {/*<h2 className="contact-title">{contactTitle}</h2>*/}
        <div className="contact-content">
          {/*<div className="contact-information">*/} {/*  <div className="contact-title">{title}</div>*/} {/*  <div className="contact-address">*/} {/*    <p>{street}</p>*/} {/*    <p>{zip}</p><br/>*/} {/*    <p>{phone}</p>*/} {/*    <p>{fax}</p>*/} {/*  </div>*/} {/*  <div className="contact-email">*/} {/*    <span className="label">E-Mail: </span><a href={`mailto:${email}`}>{email}</a></div>*/} {/*</div>*/}
          <div className="contact-form">
            <form name="contact" method="POST" data-netlify="true">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="name">Name</label> <input type="text" name="name"/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="email">Email-Adresse</label> <input type="email" name="email"/>
                </div>
                <div className="col-md-12">
                  <label htmlFor="message">Ihre Nachricht</label> <textarea name="message" rows={5}/>
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

    );
  }
}

ContactForm.propTypes = {
  data: PropTypes.shape({
    settings: PropTypes.shape({
      global: PropTypes.shape({
        title: PropTypes.string,
      }),
      contactInfo: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
        address: PropTypes.string,
        location: PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      }),
    }).isRequired,
  }),
};

