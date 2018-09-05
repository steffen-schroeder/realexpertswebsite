import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/realexperts-speechbubble.svg'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div>
        <img src={logo} alt="Real Experts"style={{ maxHeight: '100px' }} />
        Powered by Real Experts<br/>
        Network GmbH
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
