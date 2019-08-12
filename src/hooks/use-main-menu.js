import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings, slugs} = useStaticQuery(
    graphql`
        query {
            settings: settingsJson(id: {eq: "main-menu-settings"}) {
                mainMenu {
                    url
                    title
                }
            }
        }
    `,
  );
  return {settings, slugs};
};
