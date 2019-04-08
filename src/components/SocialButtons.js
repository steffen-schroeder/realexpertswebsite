import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const SocialButtons = ({ socialConfig, tags }) => (
  <div className="post-social">
    <OutboundLink href={socialConfig.config.url}>
      <FacebookShareButton url={socialConfig.config.url} className="facebook" >
        <FacebookIcon size={48}
                      round={false}
                      iconBgStyle={{ fill: '#879fc9' }}
                      logoFillColor='white' />
      </FacebookShareButton>
    </OutboundLink>
    <OutboundLink href={socialConfig.config.url}>
      <TwitterShareButton url={socialConfig.config.url} className="twitter" title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
        <TwitterIcon size={48}
                     round={false}
                     iconBgStyle={{ fill: '#879fc9' }}
                     logoFillColor='white' />
      </TwitterShareButton>
    </OutboundLink>
  </div>
);

SocialButtons.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
SocialButtons.defaultProps = {
  tags: [],
};

export default SocialButtons;
