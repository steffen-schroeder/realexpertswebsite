import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import 'typeface-changa'
import './all.scss'

const TemplateWrapper = ({ children }) => (
  <div className="content">
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <header id="header-main"><Navbar /></header>
    <main>{children()}</main>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
