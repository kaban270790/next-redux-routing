
module.exports = {
  useFileSystemPublicRoutes: false,
  webpack(config) {
    // config.externals = ['express'];
    // config.node = {
    //   fs: 'empty'
    // };
    return config;
  }
};
