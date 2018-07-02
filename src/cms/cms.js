import CMS from 'netlify-cms'

import SimplePagePreview from './preview-templates/SimplePagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('imprint', SimplePagePreview);
CMS.registerPreviewTemplate('dataPrivacy', SimplePagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
