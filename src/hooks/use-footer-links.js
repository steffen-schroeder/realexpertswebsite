import { graphql, useStaticQuery } from 'gatsby';

export const useFooterLinks = () => {
  const {settings} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson {
          footerlinks {
            menutitle
            links {
              link
              linktitle
            }
          }
        }
      }
    `,
  );
  return settings;
};
