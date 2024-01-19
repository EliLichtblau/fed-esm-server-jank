const path = require("node:path")
const webpack = require("webpack")
const { UniversalFederationPlugin } = require("@module-federation/node")
const deps = require("./package.json")

/** @type {import("webpack").Configuration} */
module.exports = {
    target: "node18",
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
        topLevelAwait: true,
    },
    output: {
        environment: {
          module: true,  
        },
        clean: true,
        publicPath: "/whatever",
        chunkFormat: "module",
        chunkLoading: "import",
        path: path.resolve(__dirname, './dist/server'),
        filename: '[name].js',
        module: true,
        library: { type: "module" },
        libraryTarget: "module",
        chunkFilename: '[name].js',
    },

    module: {
        parser: {
            javascript: { importMeta: false } // Absolutely insane this is default behavior
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
            name: "shell",
            // runtime: "module",
            remoteType: "script", // Yea this is sstraight up broken lmfao - but it has to be a script because i'm hard substituing in here
            library: { type: 'module' },
            filename: "remoteEntry.js",
            remotes: {
                remote1: "remote1@http://localhost:3001/server/remoteEntry.js",
            },
            shared: [{
                react: {
                    version: deps.react,
                    eager: false,
                    singleton: true,

                },
                'react-dom': {
                    version: deps['react-dom'],
                    eager: false,
                    singleton: true,
                }

            }],
        }),
        {
            apply(compiler) {
                // Yea this isn't the cleanest way to do it but it should be ifne for now
                compiler.options.output.importMetaName = "import.meta"
            }
        },
        new webpack.DefinePlugin({IMPORTMETAURL: `import.meta.url`})
    ]

}