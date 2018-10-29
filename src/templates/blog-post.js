import React from 'react';
import PropTypes from 'prop-types';
import {kebabCase} from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Content, {HTMLContent} from '../components/Content';
import SocialButtons from '../components/SocialButtons';

import left from '../img/icons/chevron-left.svg';
import right from '../img/icons/chevron-right.svg';

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   date,
                                   helmet,
                                   featuredImage,
                                   author,
                                   relatedPosts,
                                   socialConfig,
                                   onRelatedLeft,
                                   onRelatedRight,
                                   relatedIndex
                                 }) => {
  const PostContent = contentComponent || Content;
  const relatedPostsContent = !relatedPosts ? null : relatedPosts.slice(0, 3).map(post => (
    <BlogPostTeaser post={post} type='related' key={post.id}/>
  ));

  return (
    <section className="blog-post"
             style={{marginBottom: relatedPosts !== null ? '470px' : '40px'}}>
      {helmet || ''}
      {tags && tags.length ? (
        <ul className="taglist divided">
          {tags.map(tag => (
            <li key={tag + `-tag`}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      ) : null}
      <h1>{title}</h1>
      <div className="image-type-featured">
        {featuredImage && <Img sizes={featuredImage.childImageSharp.sizes}/>}
      </div>
      <div className="blog-post-author">
        {author.fields.image && <Img sizes={author.fields.image.childImageSharp.sizes}/>}
          <div className="wrapper-for-tablet">
        <div className="blog-author-info">
          <h5 className="title">{author.frontmatter.title}</h5>
          <small className="position">{author.frontmatter.position}</small>
          <p className="company">{author.frontmatter.company}</p>
        </div>
        <p className="release-date">Veröffentlicht am {date}</p>
          </div>
      </div>
      {/*<p className="description">{description}</p>*/}
      <PostContent className="content" content={content}/>
      <SocialButtons socialConfig={socialConfig} tags={tags}/>
      {relatedPosts &&
      <div className="related-posts">
        <div className="related-posts-wrapper">
          <h3>Relevante Artikel</h3>
          <div className="related-posts-list-wrapper">
            <div className="related-posts-list">
              {relatedPostsContent}
            </div>
          </div>
        </div>
      </div>
      }
    </section>
  )
};

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  helmet: PropTypes.instanceOf(Helmet),
  featuredImage: PropTypes.object,
  onRelatedLeft: PropTypes.func,
  onRelatedRight: PropTypes.func,
  relatedIndex: PropTypes.number,
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

  constructor(props) {
    super(props);
    this.state = {
      relatedIndex: 0,
      relatedPostsLength: 0
    };
  }

  relatedLeft() {

    if (this.state.relatedIndex > 0) {
      console.log(this.state.relatedIndex);
      this.setState({relatedIndex: this.state.relatedIndex - 1});
    }
  }

  relatedRight(relatedPostsLength) {
    if (this.state.relatedIndex < relatedPostsLength) {
      console.log(this.state.relatedIndex);
      this.setState({relatedIndex: this.state.relatedIndex + 1});
    }
  }

  render() {
    const {
      settings: {
        general: {title: siteTitle, url},
        fields: {
          defaultAuthor
        }
      },
      post: {
        html,
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
        }
      },
    } = this.props.data;
    const postAuthor = author ? author : defaultAuthor;
    const helmet = <Helmet title={`${title} | Blog | ${siteTitle}`}/>;
    console.log("sdasd");
    return (
      <BlogPostTemplate
        content={html}
        contentComponent={HTMLContent}
        description={description}
        helmet={helmet}
        tags={tags}
        title={title}
        date={date}
        featuredImage={image}
        author={postAuthor}
        relatedPosts={relatedPosts}
        onRelatedLeft={() => {
          this.relatedLeft();
        }}
        onRelatedRight={() => {
          this.relatedRight(relatedPosts.length);
        }}
        relatedIndex={this.state.relatedIndex}
        socialConfig={{
          twitterHandle: postAuthor.frontmatter.twitterHandle,
          config: {
            url: `${url}${slug}`,
            title: siteTitle,
          },
        }}
      />
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    settings: PropTypes.shape({
      general: PropTypes.shape({
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
      general {
        title
        url
      }
      fields {
        defaultAuthor {
          fields {
            image {
              childImageSharp {
                sizes (maxWidth: 100, maxHeight: 100) {
                  ...GatsbyImageSharpSizes
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
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
            author {
              fields {
                image {
                  childImageSharp {
                    sizes (maxWidth: 100, maxHeight: 100) {
                      ...GatsbyImageSharpSizes
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
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
