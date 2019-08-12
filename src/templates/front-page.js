import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import ReactPlayer from 'react-player';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Layout from '../components/layout';

import favicon from '../img/favicon.ico';
import BackgroundImage from 'gatsby-background-image';

export const FrontPageTemplate = ({
  title,
  claim,
  thesis,
  video,
  relatedPosts,
  data
}) => {

  console.log(data);
  const thesisElements = thesis.map((thesisElement, key) => (
    <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
      <h3>{thesisElement.headline}</h3>
      <p>{thesisElement.body}</p>
    </div>
  ));

  // show the first three related posts as top posts
  let topPosts = [];
  if(relatedPosts){
    topPosts = relatedPosts.slice(0, 3).map((post) => (
      <BlogPostTeaser key={post.id} type='top' post={post}/>
    ));
  }

  return (
    <Layout>
      <section className="front">
        <Helmet title={title} link={[
          {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
        ]} bodyAttributes={{
          class: 'front-page',
        }}/>
        <div className="hero">
          <BackgroundImage Tag="div" style={{
            backgroundPosition: 'top left',
          }} fluid={data.frontmatter.headerImage.childImageSharp.fluid}>
            <div className="claim">
              <p>{claim.teaser}</p>
              <Link to={claim.linkto} className="button-round-red">Mehr erfahren</Link>
            </div>
          </BackgroundImage>
        </div>
        <div className="page-content">
          <div className="content-block-wrapper">
              {thesisElements}
          </div>

          <div className="featured-video-wrapper">
            <div className='featured-video'>
              <div style={{
                position: 'relative',
                paddingTop: '56.25%',
              }}>
                <ReactPlayer url={video} width='100%' height='100%' style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                }}/>
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
    </Layout>
  );
};

FrontPageTemplate.propTypes = {
  site: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  title: PropTypes.string.isRequired,
  claim: PropTypes.shape({
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
    <FrontPageTemplate data={post} title={`${post.frontmatter.title} | ${data.settings.global.title}`} claim={post.frontmatter.claim} thesis={post.frontmatter.thesis} video={post.frontmatter.video} relatedPosts={post.fields.relatedPosts}/>
  );
};

FrontPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FrontPage;

export const frontPageQuery = graphql`
    query FrontPage($id: String!) {
        settings: settingsJson(id: {eq: "general-settings"}) {
            global {
                title
                url
            }
        }
        markdownRemark(id: { eq: $id }) {
            fields {
                relatedPosts {
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
            frontmatter {
                title
                headerImage {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                claim {
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
