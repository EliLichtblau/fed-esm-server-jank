const path = require("path")
// const { UniversalFederationPlugin } = require('@module-federation/node');
const { ModuleFederationPlugin } = require("@module-federation/enhanced")


/** @type {import("webpack").Configuration} */
const config = {
    name: 'client',
    target: 'web',
    entry: "./src/client/app",
    mode: "development",
    devtool: 'source-map',
    resolve: {
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
            '.mjs': ['.mts', '.mtsx', '.mjs'],
            '.cjs': ['.cts', '.ctsx', '.cjs'],
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    output: {
        path: path.resolve(__dirname, './dist/client'),
        filename: '[name].js',
        clean: true,
        chunkFilename: '[name].js',
        // publicPath: 'http://localhost:3000/static/',
        // publicPath: "/whatever"
    },
    // externals: {
    //     "react": "window react",
    //     "react-dom": "window react-dom",
    // },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                }
              },
        ]
    },

    plugins: [
        // new UniversalFederationPlugin({
        //     name: 'shell',
        //     isServer: false,
        //     // library: { type: 'commonjs-module' },
        //     remoteType: "script",
        //     filename: 'container.js',
        //     remotes: {
        //         remote1: 'remote1@http://localhost:3001/client/remoteEntry.js',
        //     },
        // })
        new ModuleFederationPlugin({
            name: 'remote1',
            filename: 'remoteEntry.js',
            exposes: {
                "./app": './src/client/app',
            },
            shared: {
                react: {
                    singleton: true,
                    // requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    // requiredVersion: deps['react-dom'],
                },
            }
        }),
    ]
}

module.exports = config