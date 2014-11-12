
module.exports = {
    entry: "./main.js",
    output: {
        filename: "build.js"
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.jade/, loader: 'html!jade-html' }
        ]
    }
};