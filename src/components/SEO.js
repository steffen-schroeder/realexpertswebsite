import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import * as config from '../../gatsby-config';

const getSchemaOrgJSONLD = ({
                              isBlogPost,
                              url,
                              title,
                              description,
                              datePublished,
                            }) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: config.siteMetadata.title,
    },
  ];

  return isBlogPost
    ? [
      ...schemaOrgJSONLD,
      {
        '@context': 'https://www.realexperts.de/',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
            },
          },
        ],
      },
      {
        '@context': 'https://www.realexperts.de/',
        '@type': 'BlogPosting',
        url,
        name: title,
        alternateName: config.siteMetadata.title,
        headline: title,
        description,
        author: {
          '@type': 'Person',
          name: 'Christoph Rauhut',
        },
        publisher: {
          '@type': 'Organization',
          url: 'https://www.realexperts.de/',
          logo: config.siteMetadata.logo,
          name: 'Christoph Rauhut',
        },
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': config.siteMetadata.url,
        },
        datePublished,
      },
    ]
    : schemaOrgJSONLD;
};

const SEO = ({ postData, postImage, isBlogPost, author }) => {
  const postMeta = postData || {};

  let title = config.siteMetadata.title;

  if (postMeta) {
    title = postMeta.title || (config.siteMetadata.title + " - " + postMeta.frontmatter.title)
  }

  console.log(title);
  const description =
    postMeta.description || postData.excerpt || postData.frontmatter.description || config.description;
  const image = `${postImage}` || config.image;
  const url = postMeta.slug
    ? `${config.siteMetadata.siteUrl}${postMeta.slug}`
    : config.siteMetadata.siteUrl;
  const datePublished = isBlogPost ? postMeta.date : false;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
  });

  return (
    <Helmet title={title}>
      {/* General tags */}
      <meta name="description" content={description}/>
      <meta name="image" content={image}/>

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url}/>
      {isBlogPost ? <meta property="og:type" content="article"/> : null}
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:creator" content={author}/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>
    </Helmet>
  );
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }).isRequired,
  postImage: PropTypes.string,
  author: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
};

export default SEO;
