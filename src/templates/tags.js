import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import BlogPostTeaser from '../components/BlogPostTeaser';

export default class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pathContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} ${
      totalCount === 1 ? 'Beitrag' : 'Beiträge'
    } in Kategorie “${tag}”`;

    return (
      <section className="section blogs-by-tag">

        <Helmet title={`${tag} | ${title}`} />
        <h2>Alle Beiträge in <strong>{tag}</strong> ({totalCount})</h2>
        <div className="all-posts">
        {posts.map(({ node: post}) => (
          <BlogPostTeaser post={post} type='normal' key={post.id} />
        ))}
        </div>
        <p>
          <Link to="/tags/">Alle Kategorien</Link>
        </p>
      </section>
    )
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
