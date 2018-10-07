import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/realexperts-speechbubble.svg'

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <img src={logo} alt="Real Experts" style={{ maxHeight: '75px' }} />
        <div className="footer-powered-by">
          Powered by Real Experts<br/>
          Network GmbH
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li><Link to="/impressum">Impressum</Link></li>
          <li><Link to="/datenschutz">Datenschutzerklärung</Link></li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer
