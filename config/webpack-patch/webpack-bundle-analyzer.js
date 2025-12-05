const path = require('path');

console.log('Applying webpack-bundle-analyzer patch...');
module.exports = function(webpackConfig) {
//   const lastDirName = path.basename(__dirname);
//   const projectPath = path.join(__dirname, './../..');
//   const webpackStats = path.join(projectPath, 'temp', 'webpack');

  if (!webpackConfig.plugins) { webpackConfig.plugins = []; }

//   webpackConfig.module.rules[0].issuer = {
//     test: /\.[tj]s$/i,
//   };
//   webpackConfig.module.rules[2].issuer = { test: /\.[tj]s$/i };
//   var rule2 = { test: /\.ts$/i, use: "ts-loader" };
//   webpackConfig.module.rules.push(rule2);
  
/**rules: [
        { test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i, type: 'asset' },
        { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,  type: 'asset' },
        { test: /\.css$/i, use: [ 'style-loader', cssLoader, postcssLoader ] },
        { test: /\.scss$/i, use: [ 'style-loader', cssLoader, postcssLoader, sassLoader ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: '@aurelia/webpack-loader',
          exclude: /node_modules/
        }
      ] */
  // add plugin

//   webpackConfig.module.rules[1]= {
//     test: /\.ts$/i,
//     use: ['ts-loader', '@aurelia/webpack-loader'],
//     exclude: /node_modules/
//   };

//   webpackConfig.module.rules[5]= {
//     test: /[/\\]src[/\\].+\.html$/i,
//     use: '@aurelia/webpack-loader',
//     exclude: /node_modules/
//   };
//   webpackConfig.module.rules.pop();
  /**[
  {
    type: 'asset/resource',
    generator: { filename: '[name]_[contenthash][ext]' },
    dependency: 'url',
    test: []
  },
  {
    dependency: { not: [Array] },
    test: /\.js$/,
    resolve: { fullySpecified: false }
  },
  {
    dependency: { not: [Array] },
    use: [ [Object] ],
    test: /\.module(?:\.scss)?\.css$/i
  },
  {
    dependency: { not: [Array] },
    use: [ [Object] ],
    test: /(?<!\.module(?:\.scss)?)\.css$/
  },
  {
    dependency: { not: [Array] },
    type: 'asset/resource',
    generator: { filename: '[name]_[contenthash][ext]' },
    test: { or: [Array] }
  },
  {
    dependency: { not: [Array] },
    test: /\.html$/,
    use: { loader: 'C:\\GitProjects\\spfx-heft\\node_modules\\html-loader' }
  },
  {
    test: /\.js$/,
    enforce: 'pre',
    use: {
      loader: 'C:\\GitProjects\\spfx-heft\\node_modules\\source-map-loader',
      options: [Object]
    }
  }
]
   */
  console.log(webpackConfig.module.rules);



  return webpackConfig;
};