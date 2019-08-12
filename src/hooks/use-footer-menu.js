import { graphql, useStaticQuery } from 'gatsby';

export const useFooterMenu = () => {
  const {settings, slugs} = useStaticQuery(
    graphql`
        query {
            settings: settingsJson(id: {eq: "footer-menu-settings"}) {
                footerMenu {
                    url
                    title
                }
            }
        }
    `,
  );
  return {settings, slugs};
};
