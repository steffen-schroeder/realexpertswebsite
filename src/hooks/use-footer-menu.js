import { graphql, useStaticQuery } from 'gatsby';

export const useMainMenu = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson(id: {eq: "footer-menu-settings"}) {
          footerMenu {
            link
            title
          }
        }
      }
    `,
  );
  return settings;
};
