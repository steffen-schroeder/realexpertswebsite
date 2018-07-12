import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Content, { HTMLContent } from '../components/Content';
import SocialButtons from '../components/SocialButtons';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featuredImage,
  relatedPosts,
  socialConfig,
}) => {
  const PostContent = contentComponent || Content
  const relatedPostsContent = !relatedPosts ? null : relatedPosts.map(post => (
    <BlogPostTeaser post={post} type='related' key={post.id} />
  ));

  return (
    <section className="section">
      {helmet || ''}
      {tags && tags.length ? (
          <ul className="taglist">
            {tags.map(tag => (
              <li key={tag + `-tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
      ) : null}
      <h1>{title}</h1>
      <div className="image-type-featured"
           style={{ height: 'auto', width: '100%' }}>
        { featuredImage && <Img sizes={featuredImage.childImageSharp.sizes} /> }
      </div>
      <p>{description}</p>
      <PostContent content={content} />
      <SocialButtons socialConfig={socialConfig} tags={tags} />
      <div className="related-posts">
        {relatedPostsContent}
      </div>
    </section>
  )
};

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  helmet: PropTypes.instanceOf(Helmet),
  featuredImage: PropTypes.object,
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string,
    config: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

const BlogPost = ({ data }) => {
  const {
    markdownRemark: post,
    site: {
      siteMetadata: { url, twitterHandle },
    },
  } = data;
  const helmet = <Helmet title={`${post.frontmatter.title} | Blog`} />;
  console.log('POST', post);
  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={helmet}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      featuredImage={post.fields.image}
      relatedPosts={post.fields.relatedPosts}
      socialConfig={{
        twitterHandle,
        config: {
          url: `${url}${post.fields.slug}`,
          title: post.frontmatter.title,
        },
      }}
    />
  )
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        url
        twitterHandle
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        image {
          childImageSharp {
            sizes(maxWidth: 1020) {
              ...GatsbyImageSharpSizes
            }
          }
        }
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
                sizes (maxWidth: 160) {
                  ...GatsbyImageSharpSizes
                }
              }
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
`
