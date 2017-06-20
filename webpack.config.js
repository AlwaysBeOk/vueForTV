module.exports = {
    entry: './es6/service/imgtext/eg/main.js',
    output: {
        path: './es6/service/imgtext/eg',
        publicPath: 'eg/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    externals: {
        jquery: 'window.$'
    },

}
