import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import ReactPlayer from 'react-player'
import BlogPostTeaser from '../components/BlogPostTeaser';

export const FrontPageTemplate = ({
                                    title,
                                    claim,
                                    thesis,
                                    video,
                                    relatedPosts
                                  }) => {

  const thesisElements = thesis.map((thesisElement, key) => (
    <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
      <h3>{thesisElement.headline}</h3>
      <p>{thesisElement.body}</p>
    </div>
  ));

  // show the first three related posts as top posts
  const topPosts = relatedPosts.slice(0, 3).map((post) => (
    <BlogPostTeaser key={post.id}
                    type='top'
                    post={post}/>
  ));

  return (
    <section>
      <Helmet title={title}/>
      <div className="hero">
        <div className="claim">
          <h1>{claim.heading}</h1>
          <p>{claim.teaser}</p>
          <Link to={claim.linkto}>Mehr erfahren</Link>
        </div>
      </div>
      <div className="page-content">
        <div className="thesis-wrapper">
          {thesisElements}
        </div>

        <div className="featured-video-wrapper">
          <div className='featured-video'>
            <div style={{
              position: "relative",
              paddingTop: "56.25%"
            }}>
              <ReactPlayer url={video}
                           width='100%'
                           height='100%'
                           style={{position: 'absolute', top: '0', left: '0'}}
              />
            </div>
          </div>
        </div>

        <div className="posts">
          <h2>Top Beiträge</h2>
          <div className="top-posts">
            {topPosts}
          </div>
        </div>

      </div>

    </section>
  )
};

FrontPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  claim: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    teaser: PropTypes.string,
    linkto: PropTypes.string,
  }),
  thesis: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string,
    highlighted: PropTypes.bool,
    body: PropTypes.string,
  })),
  video: PropTypes.string.isRequired,
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

const FrontPage = ({data}) => {
  const {markdownRemark: post} = data;

  return (
    <FrontPageTemplate
      title={post.frontmatter.title}
      claim={post.frontmatter.claim}
      thesis={post.frontmatter.thesis}
      video={post.frontmatter.video}
      relatedPosts={post.fields.relatedPosts}
    />
  )
};

FrontPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FrontPage

export const frontPageQuery = graphql`
  query FrontPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        relatedPosts {
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
      frontmatter {
        title
        claim {
          heading
          teaser
          linkto
        }
        thesis {
          headline
          highlighted
          body
        }
        video
        relatedPosts {
          post
        }
      }
    }
  }
`;
