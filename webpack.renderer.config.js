const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const rules = require('./webpack.rules');

rules.push({
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}, {
    test: /\.vue$/,
    loader: 'vue-loader'
});

module.exports = {
    // Put your normal webpack config below here
    module: {
        rules,
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
};
