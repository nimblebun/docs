const withOptimizedImages = require('next-optimized-images');
const path = require('path');

const prefix = process.env.APP_PREFIX;

module.exports = withOptimizedImages({
  basePath: prefix || '',
  assetPrefix: prefix ? `${prefix}/` : '',
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles')
    ]
  }
});
