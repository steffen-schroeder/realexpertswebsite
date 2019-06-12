import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Content, { HTMLContent } from '../components/Content';
import SocialButtons from '../components/SocialButtons';
import SEO from '../components/SEO';
import arrowLeft from '../img/icons/arrow-left-bold-circle.svg';
import Utils from '../utils/Utils';
import Layout from '../components/layout';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  seoTags,
  featuredImage,
  author,
  relatedPosts,
  socialConfig,
}) => {
  const PostContent = contentComponent || Content;
  const relatedPostsContent = !relatedPosts ? null : relatedPosts.map(post => (
    <BlogPostTeaser post={post} type='related' key={post.id}/>
  ));

  return (
    <Layout>
      <section className={'blog-post ' + (relatedPosts !== null ? 'has-related-posts' : '')}>
        {seoTags || ''} {tags && tags.length ? (
        <ul className="taglist divided">
          {tags.map(tag => (
            <li key={tag + `-tag`}>
              <Link to={`/tags/${Utils.removeUmlaut(Utils.kebabCase(tag))}/`}>{tag.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      ) : null}<h1>{title}</h1>
        <div className="image-type-featured">
          {featuredImage && <Img fluid={featuredImage.childImageSharp.fluid}/>}
        </div>
        <div className="blog-post-author">
          {author.fields.image && <Img fluid={author.fields.image.childImageSharp.fluid}/>}
          <div className="wrapper-for-tablet">
            <div className="blog-author-info">
              <h5 className="title">{author.frontmatter.title}</h5>
              <small className="position">{author.frontmatter.position}</small>
              <p className="company">{author.frontmatter.company}</p>
            </div>
            <p className="release-date">Veröffentlicht am {date}</p>
          </div>
        </div>
        {/*<p className="description">{description}</p>*/} <PostContent className="content" content={content}/>
        <SocialButtons socialConfig={socialConfig} tags={tags}/> {tags && tags.length ? (
        <div className="post-category">
          <span>Kategorie:</span>
          <ul className="taglist divided">
            {tags.map(tag => (
              <li key={tag + `-tag`}>
                <Link to={`/tags/${Utils.removeUmlaut(Utils.kebabCase(tag))}/`}>{tag.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null} <Link className="overview-link" to={`/blog/`}>
        <img src={arrowLeft} alt="Real Experts" style={{maxHeight: '75px'}}/> ZUR ARTIKELÜBERSICHT
      </Link> {relatedPosts &&
      <div className="related-posts">
        <div className="related-posts-wrapper">
          <div className="related-posts-wrapper-inner">
            <h3>Relevante Artikel</h3>
            <div className="related-posts-list-wrapper">
              <div className="related-posts-list">
                {relatedPostsContent}
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </section>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  seoTags: PropTypes.object,
  featuredImage: PropTypes.object,
  author: PropTypes.shape({
    fields: PropTypes.shape({
      image: PropTypes.object,
    }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      position: PropTypes.string,
      company: PropTypes.string,
      email: PropTypes.string,
      twitterHandle: PropTypes.string,
    }),
  }),
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string,
    config: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

class BlogPost extends React.Component {

  render() {
    const {
      settings: {
        global: {
          title: siteTitle,
          url,
          defaultTwitterHandle,
        },
        fields: {
          defaultAuthor,
        },
      },
      post: {
        html,
        excerpt,
        frontmatter: {
          description,
          tags,
          date,
          title,
        },
        fields: {
          image,
          relatedPosts,
          slug,
          author,
        },
      },
    } = this.props.data;

    const postAuthor = author ? author : defaultAuthor;
    const twitterHandle = postAuthor.frontmatter.twitterHandle
      ? postAuthor.frontmatter.twitterHandle
      : defaultTwitterHandle;
    const seoTags =
      <SEO isBlogPost={true} postData={{
        excerpt: excerpt,
        frontmatter: {
          description,
          tags,
          date,
          title,
        },
        slug,
      }} postImage={url + image.publicURL} author={postAuthor.frontmatter.title}/>;

    return (
      <BlogPostTemplate content={html} contentComponent={HTMLContent} description={description} seoTags={seoTags} tags={tags} title={title} date={date} featuredImage={image} author={postAuthor} relatedPosts={relatedPosts} socialConfig={{
        twitterHandle: twitterHandle,
        config: {
          url: `${url}${slug}`,
          title: siteTitle,
        },
      }}/>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    settings: PropTypes.shape({
      global: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
      fields: PropTypes.shape({
        defaultAuthor: PropTypes.object,
      }),
    }).isRequired,
    post: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    settings: settingsJson {
      global {
        title
        url
        defaultTwitterHandle
      }
      fields {
        defaultAuthor {
          fields {
            image {
              publicURL
              childImageSharp {
                fluid (maxWidth: 100, maxHeight: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            title
            position
            company
            twitterHandle
          }
        }
      }
    }
    post: markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1280, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          fields {
            image {
              id
              publicURL
              childImageSharp {
                fluid (maxWidth: 100, maxHeight: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            title
            contentType
            twitterHandle
            position
            company
            email
            description
          }
        }
        relatedPosts {
          id
          # TODO: Should we use _description_ instead?
          excerpt(pruneLength: 400)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
            author {
              fields {
                image {
                  publicURL
                  childImageSharp {
                    fluid (maxWidth: 100, maxHeight: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              frontmatter {
                title
                position
                company
                twitterHandle
              }
            }
            image {
              id
              publicURL
              childImageSharp {
                fluid (maxWidth: 160) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      frontmatter {
        title
        description
        tags
        date(formatString: "DD.MM.YYYY")
      }
    }
  }
  `;
