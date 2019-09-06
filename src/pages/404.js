import React from 'react';
import Layout from '../components/layout';
import Helmet from 'react-helmet';

const NotFoundPage = () => (
  <Layout noHeader={true}>
    <section className="section not-found-section">
      <Helmet title={`404 | Seite nicht gefunden`}/>
      <div className="page-content">
        <h2>Uups!</h2>
        <div className="content-block-wrapper">
          <div className="content-block">
            <p>Leider konnten wir die Seite nicht finden, haben Sie sich vielleicht verschrieben?</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
