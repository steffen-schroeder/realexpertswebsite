import { graphql, useStaticQuery } from 'gatsby';

export const useFooterMenu = () => {
  const {settings, slugs} = useStaticQuery(
    graphql`
        query {
            settings: settingsJson(id: {eq: "footer-menu-settings"}) {
                footerMenu {
                    link
                    url
                    title
                }
            }
            slugs: allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `,
  );
  return {settings, slugs};
};
