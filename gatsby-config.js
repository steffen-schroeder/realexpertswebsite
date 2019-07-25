const fileSystemAPI = require('./src/cms/file-system-api-plugin/fs-express-api');

module.exports = {
  siteMetadata: {
    title: 'Real Experts',
    twitterHandle: '@hut1315',
    siteUrl: 'https://www.realexperts.de',
  },
  mapping: {
    'MarkdownRemark.fields.relatedPosts': 'MarkdownRemark',
    'MarkdownRemark.fields.author': 'MarkdownRemark',
    'SettingsJson.fields.defaultAuthor': 'MarkdownRemark',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        configFile: 'robots-txt.config.js',
      },
    },
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
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
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
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: ALLOW-FROM https://www.itsax.de',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
          ],
        },
        mergeSecurityHeaders: false,
      },
    },
  ],
  developMiddleware: fileSystemAPI,
};
