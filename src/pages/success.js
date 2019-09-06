import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';

const ContactSuccessPage = () => (
  <Layout noHeader={true}>
    <section className="section contact-success">
      <Helmet title={`Kontakt | Vielen Dank`}/>
      <div className="page-content">
        <h2>Vielen Dank!</h2>
        <div className="content-block-wrapper">
          <div className="content-block">
            <p>Wir haben Ihre Kontaktanfrage erhalten und werden uns umgehend mit Ihnen in Verbindung setzen.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ContactSuccessPage;
