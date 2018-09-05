module.exports = {
  siteMetadata: {
    title: 'Real Experts',
    twitterHandle: '@hut1315',
    url: 'https://www.realexperts.de/',
  },
  mapping: {
    "MarkdownRemark.fields.relatedPosts": "MarkdownRemark",
    "MarkdownRemark.fields.author": "MarkdownRemark",
    "SettingsJson.fields.defaultAuthor": "MarkdownRemark",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: `${__dirname}/src/settings`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'staticImages',
        path: `${__dirname}/static/img`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
