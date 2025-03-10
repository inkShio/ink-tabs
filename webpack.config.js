const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Path = require('path');

module.exports = {
	mode: 'production',
	optimization: {
		minimizer: [new CssMinimizerPlugin()]
	},
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'ink-tabs.js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'ink-tabs.min.css'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: Path.join(__dirname, 'dist'),
					to: Path.join(__dirname, 'docs')
				}
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		]
	}
}
