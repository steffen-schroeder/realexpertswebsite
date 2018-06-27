import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import ReactPlayer from 'react-player'

export const FrontPageTemplate = ({
  title,
  claim,
  thesis,
  video,
  top_posts
}) => {
  const thesisElements = thesis.map((thesisElement, key) => (
    <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
      <h3>{thesisElement.headline}</h3>
      <p>{thesisElement.body}</p>
    </div>
  ))
  const topPosts = top_posts.map((post, key) => (
    <li key={key}>{post.post}</li>
  ))

  return (
    <section>
      <Helmet title={title} />
      <h1>{claim.heading}</h1>
      <p>{claim.teaser}</p>
      <Link to={claim.linkto}>Mehr erfahren</Link>
      <div className="thesis-wrapper">
        {thesisElements}
      </div>
      <div className='featured-video' style={{ width: "800px" }}>
        <div style={{
          position: "relative",
          paddingTop: "56.25%"
        }}>
          <ReactPlayer url={video}
                       width='100%'
                       height='100%'
                       style={{
                         position: "absolute",
                         top: "0",
                         left: "0"
                       }}
          />
        </div>
      </div>
      <h2>Top Beiträge</h2>
      <ul>{topPosts}</ul>
    </section>
  )
}

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
  top_posts: PropTypes.arrayOf(PropTypes.object),
}

const FrontPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <FrontPageTemplate
      title={post.frontmatter.title}
      claim={post.frontmatter.claim}
      thesis={post.frontmatter.thesis}
      video={post.frontmatter.video}
      top_posts={post.frontmatter.top_posts}
    />
  )
}

FrontPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default FrontPage

export const frontPageQuery = graphql`
  query FrontPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
        top_posts {
          post
        }
      }
    }
  }
`
