import React from 'react';
import PropTypes from 'prop-types';
import Content, { HTMLContent } from '../components/Content';
import favicon from '../img/favicon.ico';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const SimplePageTemplate = ({title, content, contentComponent}) => {
  const PageContent = contentComponent || Content;

  return (
    <Layout>
      <section className='simple'>
        <Helmet title={title} link={[
          {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
        ]}/>
        <h2>{title}</h2>
        <PageContent className="content" content={content}/>
      </section>
    </Layout>
  );
};

SimplePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const SimplePage = ({data}) => {
  const {markdownRemark: post} = data;

  return (
    <SimplePageTemplate contentComponent={HTMLContent} title={`${post.frontmatter.title}`} content={post.html}/>
  );
};

SimplePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SimplePage;

export const simplePageQuery = graphql`
  query SimplePage($id: String!) {
    settings: settingsJson {
      global {
        title
        url
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
