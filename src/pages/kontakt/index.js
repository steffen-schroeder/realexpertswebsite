import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'

const ContactPage = ({
  data: { settings: { global: { title } } },
}) => (
  <section className="section tags">
    <Helmet title={`Tags | ${title}`} />
    <div className="container content">
      <div className="columns">
        <p>Yet to be defined!</p>
      </div>
    </div>
  </section>
)

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPageQuery {
    settings: settingsJson {
      global {
        title
      }
    }
  }
`
