import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson {
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
