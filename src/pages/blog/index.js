import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import BlogPostTeaser from '../../components/BlogPostTeaser';

export default class BlogIndexPage extends React.Component {
  render() {
    const {data} = this.props;
    const {siteMetadata: title} = data.site;
    // only consider the first three related posts on the front page as top posts
    const topPosts = data.markdownRemark.fields.relatedPosts.slice(0, 3);
    // exclude posts from `all posts` which are already in top posts
    const posts = data.allMarkdownRemark.edges
      .filter(({node: post}) => {
        return !topPosts.find(topPost => topPost.id === post.id);
      });

    return (
      <section className="blog">
        <Helmet title={`Blog | ${title}`}/>
        <h2>Top Beiträge</h2>
        <div className="top-posts">
          {topPosts.map((topPost, key) => (
            <BlogPostTeaser key={topPost.id}
                            post={topPost}
                            type={key === 0 ? 'featured' : 'top'}/>
          ))}
        </div>
        <h2>Alle Beiträge</h2>
        <div className="all-posts">
          {posts.map(({node: post}) => (
            <BlogPostTeaser key={post.id}
                            post={post}
                            type='normal'/>
          ))}
        </div>
      </section>
    )
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
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    # Query front page for related posts used as top posts
    markdownRemark(fields: { slug: { eq: "/" }}) {
      id
      fields {
        relatedPosts {
          id
          # TODO: Should we use _description_ instead?
          excerpt(pruneLength: 400)
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
                sizes (maxWidth: 850) {
                  ...GatsbyImageSharpSizes
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
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
            image {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
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
