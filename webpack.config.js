var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const loaders = [
    {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
            presets: ["es2015", "stage-2"]
        }
    },
    {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
    },
    {
        test: /\.json$/,
        loader: "json"
    }
]

module.exports = [{
    entry: {
        server: "./server/index.js",
        fetch_data: "./data/fetch-data.js"
    },
    target: "node",
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    module: {
        loaders: loaders,
    },
    plugins: [
         new webpack.DefinePlugin({ "global.GENTLY": false })
    ]
},
{
    entry: "./client/index.jsx",
    output: {
        path: path.join(__dirname, "static"),
        filename: "bundle.js"
    },
    module: {
        loaders: loaders
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./client/index.html"
            }
        ])
    ]
}
];
