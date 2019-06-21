import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import BlogPostTeaser from '../components/BlogPostTeaser';
import favicon from '../img/favicon.ico';
import arrowLeft from '../img/icons/arrow-left.svg';
import arrowRight from '../img/icons/arrow-right.svg';
import Layout from '../components/layout';

export default class BlogIndexPage extends React.Component {
  render() {
    const {data} = this.props;

    // only consider the first four related posts on the front page as top posts
    const topPosts = data.markdownRemark.fields.relatedPosts.slice(0, 4);
    // exclude posts from `all posts` which are already in top posts
    const posts = data.allMarkdownRemark.edges
      .filter(({node: post}) => {
        return !topPosts.find(topPost => topPost.id === post.id);
      });

    console.log(this.props.pageContext.currentPage);

    const {currentPage, numPages} = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <Layout>
        <section className="blog">
          <Helmet title={`Blog | ${data.settings.global.title}`} link={[
            {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
          ]}/> {isFirst &&
        <div>
          <h2>Top Beiträge</h2>
          <div className="top-posts">
            {topPosts.map((topPost, key) => (
              <BlogPostTeaser key={topPost.id} post={topPost} type={key === 0 ? 'featured' : 'top'}/>
            ))}
          </div>
        </div>
        }

          <h2>Alle Beiträge</h2>
          <div className="all-posts">
            {posts.map(({node: post}) => (
              <BlogPostTeaser key={post.id} post={post} type='normal'/>
            ))}
          </div>
          <ul className="pagination">
            {!isFirst && (
              <Link to={`/blog/${prevPage}`} rel="prev" className="pagination-prev"> <img src={arrowLeft} alt="Previous"/> </Link>
            )} {Array.from({length: numPages}, (_, i) => (
            <li className="pagination-item" key={`pagination-number${i + 1}`}>
              <Link to={`/blog/${i === 0 ? '' : i + 1}`} className={i + 1 === currentPage
                ? 'pagination-item-link active'
                : 'pagination-item-link'}>
                {i + 1}
              </Link>
            </li>
          ))} {!isLast && (
            <Link className="pagination-next" to={`/blog/${nextPage}`} rel="next"> <img src={arrowRight} alt="Next"/> </Link>
          )}
          </ul>
        </section>
      </Layout>
    );
  }
}

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    markdownRemark: PropTypes.shape({
      id: PropTypes.string,
      fields: PropTypes.shape({
        relatedPosts: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          excerpt: PropTypes.string,
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            date: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string,
            image: PropTypes.object,
          }),
        })),
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogIndexQuery($skip: Int!, $limit: Int!) {
    settings: settingsJson {
      global {
        title
        url
      }
    }
    # Query front page for related posts used as top posts
    markdownRemark(fields: { slug: { eq: "/" }}) {
      id
      fields {
        relatedPosts {
          id
          # TODO: Should we use _description_ instead?
          excerpt(pruneLength: 140)
          frontmatter {
            title
            date
            tags
          }
          fields {
            slug
            image {
              id
              childImageSharp {
                fluid (maxWidth: 850) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
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
