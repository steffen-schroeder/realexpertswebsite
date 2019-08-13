import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';

const NotFoundPage = () => (
  <Layout noHeader={true}>
    <section className="section">
      <Helmet title={`404 | Seite nicht gefunden`}/>
      <div className="page-content">
        <h2>Uups!</h2>
        <div className="content-block-wrapper">
          <p>Leider konnten wir die Seite nicht finden, haben Sie sich vielleicht verschrieben?</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
