import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson(id: {eq: "menu-settings"}) {
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
