const loaders = [
    {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
    },
    {
        test: /\.json$/,
        loader: 'json'
    }
]

module.exports = [{
    entry: "./server/index.js",
    target: "node",
    output: {
        path: __dirname,
        filename: "server.js"
    },
    module: {
        loaders: loaders
    }
},
{
    entry: "./client/index.js",
    output: {
        path: __dirname,
        filename: "client.js"
    },
    module: {
        loaders: loaders
    }
}
];
