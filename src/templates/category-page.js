import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';
import favicon from '../img/favicon.ico';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import BlogPostTeaser from '../components/BlogPostTeaser';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';

export const CategoryPageTemplate = ({data}) => {

    const thesisElements = data.frontmatter.thesis.map((thesisElement, key) => (
        <div key={key} className={`thesis ${thesisElement.highlighted ? 'highlighted' : 'normal'}`}>
            <h3>{thesisElement.headline}</h3>
            <p>{thesisElement.body}</p>
        </div>
    ));

    let successStories = [];
    if (data.fields.successStories) {
        successStories = data.fields.successStories.map((successStory, key) => (
            <div key={key} className="success-story">
              <Link to={successStory.fields.slug}>
                <Img fluid={successStory.fields.image.childImageSharp.fluid}/>
              </Link>
              <Link to={successStory.fields.slug}>
                {data.frontmatter.successStories[key].customerName}
              </Link>
            </div>
        ));
    }

    // show the first three related posts as top posts
    let topPosts = [];
    if (data.fields.relatedPosts) {
        topPosts = data.fields.relatedPosts.slice(0, 3).map((post) => (
            <BlogPostTeaser key={post.id} type='top' post={post}/>
        ));
    }
    return (
        <Layout>
            <section className='category'>
                <Helmet title={data.name} link={[
                    {rel: 'shortcut icon', type: 'image/ico', href: `${favicon}`},
                ]}/>
                <div className="hero">
                    <BackgroundImage Tag="div"
                                     style={{
                                         backgroundPosition: 'top left',
                                     }}
                                     fluid={data.frontmatter.headerImage.childImageSharp.fluid}>
                        <div className="claim">
                            <h3>{data.frontmatter.title}</h3>
                            <h1>{data.frontmatter.contentTitle}</h1>
                            <p>{data.frontmatter.description}</p>
                        </div>
                    </BackgroundImage>
                </div>
                <div className="page-content">
                    <div className="content-block-wrapper">
                        {thesisElements}
                    </div>

                    <div className="featured-video-wrapper category-video-wrapper">
                        <div className='featured-video'>
                            <div style={{
                                position: 'relative',
                                paddingTop: '56.25%',
                            }}>
                                <ReactPlayer url={data.frontmatter.video}
                                             width='100%'
                                             height='100%'
                                             style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                             }}
                                             config={{
                                                 youtube: {
                                                     embedOptions: {
                                                         host: 'https://www.youtube-nocookie.com',
                                                     },
                                                     preload: true
                                                 }
                                             }}
                                             />
                            </div>
                        </div>
                        <div className="success-stories-wrapper">
                          <h2>Erfolgsgeschichten</h2>
                          <div className="success-stories">
                            {successStories}
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

CategoryPageTemplate.propTypes = {
    title: PropTypes.string,
    contentTitle: PropTypes.string,
    description: PropTypes.string,
    thesis: PropTypes.arrayOf(PropTypes.shape({
        headline: PropTypes.string,
        highlighted: PropTypes.bool,
        body: PropTypes.string,
    })),
    video: PropTypes.string,
    successStories: PropTypes.arrayOf(PropTypes.object),
    infoBox: PropTypes.arrayOf(PropTypes.object),
    statements: PropTypes.arrayOf(PropTypes.object),
    relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

const CategoryPage = ({data}) => {
    const {markdownRemark: post} = data;
    console.log(data);
    return (
        <CategoryPageTemplate contentComponent={HTMLContent} data={post}/>
    );
};

CategoryPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CategoryPage;

export const categoryPageQuery = graphql`
    query CategoryPage($id: String!) {
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
                successStories {
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
                }
            }
            frontmatter {
                title
                contentTitle
                headerImage {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                description
                thesis {
                    headline
                    highlighted
                    body
                }
                video
                successStories {
                    post
                    customerName
                    image
                }
                infoBox {
                    headline
                    body
                    image
                }
                statements {
                    author
                    image
                    body
                }
                relatedPosts {
                    post
                }
            }
        }
    }
`;
