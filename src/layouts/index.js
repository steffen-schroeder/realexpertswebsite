import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieConsent from "react-cookie-consent"
import 'typeface-changa'
import './all.scss'

const TemplateWrapper = ({ children }) => (
  <div className="content">
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <header id="header-main"><Navbar /></header>
    <main>{children()}</main>
    <Footer />
    <CookieConsent
      buttonText="Verstanden"
      cookieName="reCoockieConsent"
      style={{ background: "#40A6B9" }}
      buttonStyle={{ background: "#fff", color: "#0E3F93", fontSize: "13px" }}>
      Wir verwenden Cookies, um Ihnen einen optimalen Service zu bieten. Wenn Sie auf dieser Seite weitersurfen, stimmen Sie der Verwendung von Cookies zu.
      Mehr zu <Link to="/datenschutz">Datenschutz</Link>.
    </CookieConsent>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
