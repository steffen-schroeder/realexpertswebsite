import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { HTMLContent } from '../components/Content';
import CategoryTeaser from '../components/CategoryTeaser';
import BlogPostTeaser from '../components/BlogPostTeaser';
import Helmet from 'react-helmet';
import favicon from '../img/favicon.ico';
import BackgroundImage from 'gatsby-background-image';

export const PortfolioPageTemplate = ({data}) => {
  console.log(data);

  let categories = [];
  if(data.fields.categories){
    categories = data.fields.categories.map((category, index) => (
      <CategoryTeaser key={index} category={category}/>
    ));
  }

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
        <div>
          <BackgroundImage Tag="div" style={{
            backgroundPosition: 'top left',
          }} fluid={data.fields.image.childImageSharp.fluid}>
            <div className="claim">
              <h2>{data.frontmatter.title}</h2>
              <p>{data.frontmatter.description}</p>
            </div>
          </BackgroundImage>
        </div>
        <div className="page-content">
          <div className="posts">
            <h2>Unsere Themen</h2>
            <div className="portfolio-categories">
              {categories}
            </div>
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

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  featuredPost: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
};

const PortfolioPage = ({data}) => {
  const {markdownRemark: post} = data;
  return (
    <PortfolioPageTemplate contentComponent={HTMLContent} data={post}/>
  );
};

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioPage;

export const portfolioPageQuery = graphql`
    query PortfolioPage($id: String!) {
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
                image {
                    childImageSharp {
                        fluid(maxWidth: 630) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                categories {
                    fields {
                        slug
                        thumbnail {
                            childImageSharp {
                                fluid(maxWidth: 630) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    frontmatter {
                        title
                    }
                }
            }
            frontmatter {
                title
                image
                description
                featuredPost
                categories {
                    category
                }
                relatedPosts {
                    post
                }
            }
        }
    }
`;
