import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
	entry: resolve(__dirname, '..', './src/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			resolve(__dirname, '..', 'node_modules'),
			resolve(__dirname, '..', './'),
		],
		alias: {
			'@ui-kit': resolve(__dirname, '..', './src/ui-kit'),
			'@utils': resolve(__dirname, '..', './src/utils'),
			'@domain': resolve(__dirname, '..', './src/domain'),
			'@last-fm-api': resolve(__dirname, '..', './src/last-fm-api'),
		},
	},
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, '..', 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(ts)x?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.pcss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							esModule: true,
							modules: {
								localIdentName: '[local]--[hash:base64:5]',
								namedExport: true,
							},
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '..', './src/index.html'),
		}),
		new MiniCssExtractPlugin(),
		new Dotenv({ systemvars: true }),
	],
};

export default commonConfig;
