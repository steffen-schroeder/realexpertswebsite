import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Map from '../../components/Map';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';

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
      <Layout>
        <section className="section contact">
          <Helmet title={`Kontakt | ${title}`}/>
          <h2 className="contact-title">{contactTitle}</h2>
          <div className="contact-content">
            <div className="contact-information">
              <div className="contact-title">{title}</div>
              <div className="contact-address">
                <p>{street}</p>
                <p>{zip}</p><br/>
                <p>{phone}</p>
                <p>{fax}</p>
              </div>
              <div className="contact-email">
                <span className="label">E-Mail: </span><a href={`mailto:${email}`}>{email}</a></div>
            </div>
            <div className="contact-map">
              <Map latitude={latitude} longitude={longitude} googleMaps={googleMaps}/>
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
    settings: settingsJson {
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
