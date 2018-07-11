const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.sourceNodes = ({ boundActionCreators, getNodes, getNode }) => {
  const { createNodeField } = boundActionCreators;
  const sourceNodes = getNodes();

  sourceNodes
  .filter(node => node.internal.type === "MarkdownRemark")
  .forEach(node => {

    if (node.frontmatter.relatedPosts) {

      const resolvedRelatedPosts = [];

      node.frontmatter.relatedPosts.map(relatedPost => {

        const postNode = sourceNodes.find(someNode =>
          someNode.internal.type === "MarkdownRemark" &&
          someNode.frontmatter.title === relatedPost.post
        );

        if (postNode) {
          resolvedRelatedPosts.push(postNode.id)
        }
      });

      if (resolvedRelatedPosts.length) {
        createNodeField({
          node,
          name: "relatedPosts",
          value: resolvedRelatedPosts
        })
      }
    }
  })
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      posts.forEach(edge => {
        const id = edge.node.id;

        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        })
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      posts.forEach(edge => {
        if (_.get(edge, `node.frontmatter.tags`)) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`;

        createPage({
          path: tagPath,
          component: path.resolve(`src/templates/tags.js`),
          context: {
            tag,
          },
        })
      });
      resolve();
    });

  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    if (node.frontmatter.image) {
      let imagePath = node.frontmatter.image;
      if (node.frontmatter.image.startsWith('/img/')) {
        imagePath = `../../../static${node.frontmatter.image}`;
        createNodeField({
          name: `image`,
          node,
          value: imagePath,
        });
      }
    }

  }
};
