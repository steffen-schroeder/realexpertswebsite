import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson(id: {eq: "main-menu-settings"}) {
          mainMenu {
            link
            title
          }
        }
      }
    `,
  );
  return settings;
};
