const _ = require('lodash');
const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');


exports.sourceNodes = ({actions, getNodes, getNode}) => {
    const {createNodeField} = actions;
    const allNodes = getNodes();

    // Print some debug information on what nodes are actually there because
    // the order in which they are defined to be sourced in gatsby-config.js
    // does seem to matter!
    console.log(
        'All sourced nodes (type => id)',
        allNodes.map(someNode => someNode.internal.type + ' => ' + someNode.id)
    );

    const expandAuthorField = (nodeToExpand, authorTitle, fieldName) => {
        const authorNode = allNodes.find(someNode =>
            someNode.internal.type === "MarkdownRemark" &&
            someNode.frontmatter.contentType === "author" &&
            someNode.frontmatter.title === authorTitle
        );
        if (authorNode) {
            // The following actually works but it's not the way it's been intended
            // since sources are considered to be immutable.
            // e.g. `settings.posts.defaultAuthor = authorNode.id;`
            createNodeField({
                node: nodeToExpand,
                name: fieldName,
                value: authorNode.id
            });
        }
    };

    allNodes
        .filter(node => node.internal.type === "MarkdownRemark")
        .forEach(node => {

            // Expand related posts to full blown nodes in fields.relatedPosts.
            if (node.frontmatter.relatedPosts) {
                const resolvedRelatedPosts = [];
                node.frontmatter.relatedPosts.map(relatedPost => {
                    const postNode = allNodes.find(someNode =>
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
                    });
                }
            }

            if (node.frontmatter.categories) {
                const resolvedCategories = [];
                node.frontmatter.categories.map(category => {
                    const postNode = allNodes.find(someNode => {
                            return someNode.internal.type === "MarkdownRemark" &&
                                someNode.frontmatter.title === category.category
                        }
                    );
                    if (postNode) {
                        resolvedCategories.push(postNode.id);
                    }
                });
                if (resolvedCategories.length) {
                    createNodeField({
                        node,
                        name: "categories",
                        value: resolvedCategories
                    });
                }
            }

            if (node.frontmatter.successStories) {
                const resolvedSuccessStories = [];
                node.frontmatter.successStories.map(successStory => {
                    const postNode = allNodes.find(someNode => {
                            return someNode.internal.type === "MarkdownRemark" &&
                                someNode.frontmatter.title === successStory.post
                        }
                    );
                    if (postNode) {
                        resolvedSuccessStories.push(postNode.id);
                    }
                });
                if (resolvedSuccessStories.length) {
                    createNodeField({
                        node,
                        name: "successStories",
                        value: resolvedSuccessStories
                    });
                }
            }

            if (!!node.frontmatter.author) {
                expandAuthorField(node, node.frontmatter.author, "author");
            }
        });

    // Expand the default author's information on the settings node.
    const settings = allNodes.find(node => node.internal.type === "SettingsJson" && node.id === "general-settings");
    if (!!settings.posts.defaultAuthor) {
        expandAuthorField(settings, settings.posts.defaultAuthor, "defaultAuthor");
    }
};

exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators;

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
            const {allMarkdownRemark: {edges: pages}} = result.data;

            pages.forEach(edge => {
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

            // Create blog post list pages
            const postsPerPage = 6;
            const extraArticlesOnStartPage = 4;
            const blogArticles = pages.filter(page => page.node.frontmatter.templateKey === "blog-post");
            const numPages = Math.ceil((blogArticles.length - extraArticlesOnStartPage) / postsPerPage);

            Array.from({length: numPages}).forEach((_, i) => {

                let numShown = i === 0 ? postsPerPage + extraArticlesOnStartPage : postsPerPage;
                let numSkip = i === 0 ? 0 : extraArticlesOnStartPage + i * postsPerPage;

                createPage({
                    path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
                    component: path.resolve('./src/templates/blog.js'),
                    context: {
                        limit: numShown,
                        skip: numSkip,
                        numPages,
                        currentPage: i + 1
                    },
                });
            });

            // Tag pages:
            let tags = [];
            // Iterate through each post, putting all found tags into `tags`
            pages.forEach(edge => {
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

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
    const {createNodeField} = boundActionCreators;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode});
        createNodeField({
            name: `slug`,
            node,
            value,
        });

        // Fix all image paths got set by netlify-cms but are not resolvable
        // by imageSharp which needs those paths to be relative.
        // Actually, that's kind of a fragile setup since it makes the assumption
        // to find the static folder exactly three folders down from file the images
        // path was defined in.
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
        if (node.frontmatter.thumbnail) {
            let imagePath = node.frontmatter.thumbnail;
            if (node.frontmatter.thumbnail.startsWith('/img/')) {
                imagePath = `../../../static${node.frontmatter.thumbnail}`;
                createNodeField({
                    name: `thumbnail`,
                    node,
                    value: imagePath,
                });
            }
        }

    }
};
