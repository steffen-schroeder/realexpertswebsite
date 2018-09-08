import CMS from 'netlify-cms'

import SimplePagePreview from './preview-templates/SimplePagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('imprint', SimplePagePreview);
CMS.registerPreviewTemplate('dataPrivacy', SimplePagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
