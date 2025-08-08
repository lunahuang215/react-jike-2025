const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Use cheap-module-source-map for better compatibility
      if (process.env.NODE_ENV === 'production') {
        webpackConfig.devtool = 'cheap-module-source-map';
      }
      return webpackConfig;
    },
    plugins: {
      add: process.env.ANALYZE ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      ] : [],
    },
  },
};