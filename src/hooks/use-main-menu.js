import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings, slugs} = useStaticQuery(
    graphql`
        query {
            settings: settingsJson(id: {eq: "main-menu-settings"}) {
                mainMenu {
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
