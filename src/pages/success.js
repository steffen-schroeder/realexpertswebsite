import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';

const ContactSuccessPage = () => (
  <Layout>
    <section className="section contact">
      <Helmet title={`Kontakt | Vielen Dank`}/>
      <h1>Vielen Dank!</h1>
      <p>Wir haben Ihre Kontaktanfrage erhalten und werden uns umgehend mit Ihnen in Verbindung setzen.</p>
    </section>
  </Layout>
);

export default ContactSuccessPage;
