import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types';
import Script from 'react-load-script'


class ContactPage extends React.Component {

  constructor(props) {
    super(props);
  }

  handleScriptLoad() {
    const s2 = document.createElement('script');
    s2.type = 'text/javascript';
    s2.innerHTML = "hbspt.forms.create({portalId: '3217061',formId: 'cae0b9cf-f2bc-4a3f-950b-99ddeeff88c8'});";
    s2.async = true;
    this.content.appendChild(s2);
  }

  render() {

    const {
      settings: {
        global: {
          title: title,
        },
      },
    } = this.props.data;

    return (
      <section className="section tags">
        <Script
          url="https://js.hsforms.net/forms/shell.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Helmet title={`Tags | ${title}`}/>
        <div className="container content" ref={el => (this.content=el)}>
        </div>
      </section>
    );
  }
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    settings: PropTypes.shape({
      global: PropTypes.shape({
        title: PropTypes.string,
      }),
    }).isRequired,
  }),
};

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
