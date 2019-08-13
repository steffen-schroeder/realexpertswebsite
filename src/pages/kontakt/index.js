import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Map from '../../components/Map';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import ContactForm from '../../components/ContactForm';

class ContactPage extends React.Component {

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      window.initMap = function () {
        new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 40, lng: 10},
          zoom: 5,
        });
      };
    }
  }

  render() {

    const {
      settings: {
        global: {
          title,
        },
        apiKeys: {
          googleMaps,
        },
        contactInfo: {
          title: contactTitle,
          content,
          street,
          zip,
          phone,
          fax,
          email,
          location: {
            latitude,
            longitude,
          },
        },
      },
    } = this.props.data;

    return (
      <Layout noHeader={true}>
        <section className="section contact">
          <Helmet title={`Kontakt | ${title}`}/>
          <div className="page-content">
            <h2 className="contact-title">{contactTitle}</h2>
            <div className="content-block-wrapper">
              <div className="contact-content">
                <div className="contact-information">
                  <p>
                    {content}<br/>
                    <br/>
                    <strong>{title}</strong><br/>
                    {street}<br/>
                    {zip}<br/>
                    <br/>
                    {phone}<br/>
                    {fax}<br/>
                    E-Mail: <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
                <div className="contact-form-block">
                  <ContactForm/>
                </div>
              </div>
            </div>
            <div className="content-block-wrapper">
              <div className="contact-map">
                <Map latitude={latitude} longitude={longitude} googleMaps={googleMaps}/>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    settings: PropTypes.shape({
      global: PropTypes.shape({
        title: PropTypes.string,
      }),
      apiKeys: PropTypes.shape({
        googleMaps: PropTypes.string,
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

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPageQuery {
    settings: settingsJson(id: {eq: "general-settings"}) {
      global {
        title
      }
      apiKeys {
        googleMaps
      }
      contactInfo {
        title
        content
        street
        zip
        phone
        fax
        email
        location {
          latitude
          longitude
        }
      }
    }
  }
`;
