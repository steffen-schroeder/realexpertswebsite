import { graphql, useStaticQuery } from 'gatsby';

export const useContactData = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson(id: {eq: "general-settings"}) {
          global {
            title
            url
            defaultTwitterHandle
          }
          contactInfo {
            title
            footerContent
            socialMedia {
              facebook
              instagram
              linkedin
              twitter
              xing
              youtube
            }
          }
        }
      }
    `,
  );
  return settings;
};
