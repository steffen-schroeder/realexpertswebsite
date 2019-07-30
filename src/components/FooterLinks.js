import React from 'react';
import { useFooterLinks } from '../hooks/use-footer-links';
import { Link } from 'gatsby';

const FooterLink = ({title, link}) => {
  return (
    <li>
      <Link to={link}>{title}</Link>
    </li>
  );
};

const FooterLinkSection = ({data, slugs}) => {
  const links = data.links.map((item, key) => {
    let link = "/";
    if (item.url) {
      link = item.url;
    } else {
      const edge = slugs.edges.find((slugItem) => {
        return slugItem.node.frontmatter.title === item.link;
      });

      if (edge) {
        link = edge.node.fields.slug;
      }
    }
    return (
      <FooterLink title={item.title} link={link} key={key}/>
    )}
  );

  return (
    <ul>
      {links}
    </ul>
  );
};

const FooterLinks = () => {

  const {
    settings,
    slugs,
    mobileImage,
    desktopImage
  } = useFooterLinks();

  const linkSections = settings.footerLinks.map((item, key) => (
    <div className="footer-links-menu-column" key={key}>
      <span className="footer-links-menu-title">{item.title}</span>
      <FooterLinkSection data={item} slugs={slugs}/>
    </div>
  ));

  return (
    <div className="footer-links">
      <section>
        <div className="footer-links-content">
          {linkSections}
        </div>
        <div>
          <a href="http://www.strukturfonds.sachsen.de/europaeischer-sozialfonds-esf.html" className="footer-links-logo-esf-smartphone">
            <img src={mobileImage.childImageSharp.fluid.src} alt="Logo ESF Sachsen mobil" />
          </a>
          <a href="http://www.strukturfonds.sachsen.de/europaeischer-sozialfonds-esf.html" className="footer-links-logo-esf">
            <img src={desktopImage.childImageSharp.fluid.src} alt="Logo ESF Sachsen" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default FooterLinks;
