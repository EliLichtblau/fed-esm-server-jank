const path = require("node:path")

const { UniversalFederationPlugin } = require("@module-federation/node")


/** @type {import("webpack").Configuration} */
module.exports = {
    target: "async-node",
    devtool: 'source-map',
    entry: "./src/server/index",
    mode: "development",
    resolve: {
        extensionAlias: {
            '.js': ['.ts', '.tsx', '.js'],
            '.mjs': ['.mts', '.mtsx', '.mjs'],
            '.cjs': ['.cts', '.ctsx', '.cjs'],
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    experiments: {
        outputModule: true,
    },

    output: {
        environment: {
            module: true,
        },
        clean: true,
        publicPath: "/whatever",
        path: path.resolve(__dirname, './dist/server'),
        filename: '[name].js',
        module: true,
        chunkFormat: "module",
        chunkLoading: "import",
        library: {type: "module"},
        libraryTarget: "module",
        chunkFilename: '[name].js',
    },

    module: {
        parser: {
            javascript : { importMeta: false } // Absolutely insane this is default behavior
          },
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                }
            },
        ],
    },
    // Does this make any sense to be an external - I don't htink so on server
    externals: {
        "react": "node-commonjs react",
        "react-dom": "node-commonjs react-dom",
    },

    plugins: [
        new UniversalFederationPlugin({
            isServer: true,
            name: "remote1",
            remoteType: "script", // Yea this is sstraight up broken lmfao - but it has to be a script because i'm hard substituing in here
            library: { type: 'module' },
            filename: "remoteEntry.js",
            exposes: {
                "./app": "./src/client/app",
            },
        }),
        {
            apply(compiler) {
                // Yea this isn't the cleanest way to do it but it should be ifne for now
                compiler.options.output.importMetaName= "import.meta"
            }
        }
    ]

}