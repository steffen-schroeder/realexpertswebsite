import React from 'react';
import { useFooterLinks } from '../hooks/use-footer-links';
import { Link } from 'gatsby';

const FooterLink = ({data}) => {
  return (
    <li>
      <Link to={data.link}>{data.linktitle}</Link>
    </li>
  );
};

const FooterLinkSection = ({data}) => {
  const links = data.links.map((item, key) => (
    <FooterLink data={item}/>
  ));

  return (
    <ul>
      {links}
    </ul>
  );
};

const FooterLinks = () => {

  const {
    footerlinks,
  } = useFooterLinks();

  const linkSections = footerlinks.map((item, key) => (
    <div className="footer-links-menu-column">
      <h4>{item.menutitle}</h4>
      <FooterLinkSection data={item} />
    </div>
  ));

  return (
    <div className="footer-links">
      <section>
        <div className="footer-links-content">
          {linkSections}
        </div>
      </section>
    </div>
  );
};

export default FooterLinks;
