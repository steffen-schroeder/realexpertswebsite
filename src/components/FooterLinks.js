import React from 'react';
import { useFooterLinks } from '../hooks/use-footer-links';
import { Link } from 'gatsby';

const FooterLink = ({data}) => {
  return (
    <li>
      <Link to={data.link}>{data.title}</Link>
    </li>
  );
};

const FooterLinkSection = ({data}) => {
  const links = data.links.map((item, key) => (
    <FooterLink data={item} key={key}/>
  ));

  return (
    <ul>
      {links}
    </ul>
  );
};

const FooterLinks = () => {

  const {
    settings,
    mobileImage,
    desktopImage
  } = useFooterLinks();
  
  const linkSections = settings.footerMenu.map((item, key) => (
    <div className="footer-links-menu-column" key={key}>
      <span className="footer-links-menu-title">{item.menuTitle}</span>
      <FooterLinkSection data={item}/>
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
