const path = require('path');
const fs = require('fs.extra');

const target = path.join(__dirname, 'react_example/static');
// clean target
fs.rmrfSync(target);

module.exports = {
    entry: 'app.jsx',
    output: {
        path: target + '/react_example',
        filename: "app.js"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["src", "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
                test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    compact: false,
                    presets: [[ 'env', {
                        "loose": true,
                        "uglify": process.env.NODE_ENV === 'production',
                        "modules": false,
                        "useBuiltIns": true } ],
                                'react'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties']
                }
            },
            { test: /\.(css)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(png|gif|jpg|jpeg)$/, loader: 'file-loader?name=images/[name].[ext]' },
            { test: /\.(woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]' }
        ]
    }
};
