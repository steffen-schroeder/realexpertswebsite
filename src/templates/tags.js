import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import BlogPostTeaser from '../components/BlogPostTeaser';
import favicon from '../img/favicon.ico';
import Layout from '../components/layout';

export default class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;

    return (
      <Layout>
        <section className="section blogs-by-tag">

          <Helmet title={`${tag} | ${title}`} link={[
            {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
          ]}/>
          <h2>Alle Beiträge in <strong>{tag}</strong> ({totalCount})</h2>
          <div className="all-posts">
            {posts.map(({node: post}) => (
              <BlogPostTeaser post={post} type='normal' key={post.id}/>
            ))}
          </div>
          <p>
            <Link to="/tags/">Alle Kategorien</Link>
          </p>
        </section>
      </Layout>
    );
  }
}

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, templateKey: { eq: "blog-post" } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
            image {
              childImageSharp {
                fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            title
            templateKey
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
