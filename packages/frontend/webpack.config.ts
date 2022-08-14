import {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {Configuration} from "webpack"
import * as path from "path";
import CopyPlugin from "copy-webpack-plugin";

const devServerConfig: DevServerConfiguration = {
    port: 3001,
}

const config: Configuration = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    mode: "development",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: devServerConfig,
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
        }],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src', 'index.html'),
                to: path.resolve(__dirname, 'dist', 'index.html'),
            }],
        }),
    ]
}

export default config