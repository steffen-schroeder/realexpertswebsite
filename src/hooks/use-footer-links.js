import { graphql, useStaticQuery } from 'gatsby';

export const useFooterLinks = () => {
  const {settings, slugs, mobileImage, desktopImage} = useStaticQuery(
    graphql`
      query {
        settings: settingsJson(id: {eq: "footer-links-settings"}) {
          footerLinks {
            title
            links {
              url
              title
            }
          }
        }
        mobileImage:file(relativePath: { eq: "logo_esf_sachsen_smartphone.png" }) {
          childImageSharp {
            fluid(maxWidth: 480, quality: 100) {
              src
            }
          }
        }
        desktopImage:file(relativePath: { eq: "logo_esf_sachsen.png" }) {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {  
              src         
            }
          }
        }
      }
    `,
  );
  return {settings, slugs, mobileImage, desktopImage};
};
