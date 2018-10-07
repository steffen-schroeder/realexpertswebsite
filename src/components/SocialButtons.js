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

const SocialButtons = ({ socialConfig, tags }) => (
  <div className="post-social">
    <FacebookShareButton url={socialConfig.config.url} className="facebook" >
      <FacebookIcon size={48}
                    round={false}
                    iconBgStyle={{ fill: '#879fc9' }}
                    logoFillColor='white' />
    </FacebookShareButton>
    <TwitterShareButton url={socialConfig.config.url} className="twitter" title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
      <TwitterIcon size={48}
                   round={false}
                   iconBgStyle={{ fill: '#879fc9' }}
                   logoFillColor='white' />
    </TwitterShareButton>
    <GooglePlusShareButton url={socialConfig.config.url} className="googleplus" >
      <GooglePlusIcon size={48}
                      round={false}
                      iconBgStyle={{ fill: '#879fc9' }}
                      logoFillColor='white' />
    </GooglePlusShareButton>
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
