import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from 'react-cookie-consent';
import 'typeface-open-sans';
import 'typeface-changa';
import '../layouts/all.scss';
import FooterContactForm from '../components/FooterContactForm';
import FooterLinks from './FooterLinks';
import { globalHistory } from "@reach/router"

const TemplateWrapper = ({children, noHeader}) => {
  const path = globalHistory.location.pathname;

  return (
    <div className={noHeader ? "content no-header" : "content"}>
      <Helmet title="Home | Gatsby + Netlify CMS"/>
      <header id="header-main"><Navbar/></header>
      <main>
        {children}
      </main>
      {path !== '/kontakt' &&
        <FooterContactForm/>
      }
      <FooterLinks/>
      <Footer/>
      <CookieConsent
        buttonText="Verstanden"
        cookieName="reCoockieConsent"
        style={{background: '#40A6B9'}}
        buttonStyle={{background: '#FFF', color: '#0E3F93', fontSize: '13px',}}>
        Wir verwenden Cookies, um Ihnen einen optimalen Service zu bieten. Wenn Sie auf dieser Seite weitersurfen, stimmen Sie der Verwendung von Cookies zu. Mehr zu <Link to="/datenschutz">Datenschutz</Link>.
      </CookieConsent>
    </div>
  )
};

TemplateWrapper.propTypes = {
  children: PropTypes.object,
  noHeader: PropTypes.bool
};

export default TemplateWrapper;
