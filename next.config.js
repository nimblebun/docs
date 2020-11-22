const withOptimizedImages = require('next-optimized-images');
const path = require('path');

module.exports = withOptimizedImages({
  basePath: process.env.APP_PREFIX || '',
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles')
    ]
  }
});
