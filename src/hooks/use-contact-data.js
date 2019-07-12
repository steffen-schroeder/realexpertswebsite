import { graphql, useStaticQuery } from 'gatsby';

export const useContactData = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson {
          global {
            title
            url
            defaultTwitterHandle
          }
          contactInfo {
            title
            content
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
