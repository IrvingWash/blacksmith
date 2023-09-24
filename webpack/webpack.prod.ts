import { Configuration } from 'webpack';

const prodConfig: Configuration = {
	mode: 'production',
	devtool: 'source-map',
	output: {
		publicPath: './',
	},
};

export default prodConfig;
