const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'svg-ids': './src/svg-ids.js',
		'svg-ids.min': './src/svg-ids.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
		library: 'SvgIds',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};