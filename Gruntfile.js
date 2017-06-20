/**
 * Created by mxl on 2016/8/16.
 */

module.exports = function(grunt) {
    // Do grunt-related things in here
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsdoc : {
            dist : {
                src: ['./js/*/*.js','./es6/*/*/*.js'],
                options: {
                    template : "node_modules/jaguarjs-jsdoc",
                    destination: 'doc'
                }
            }
        },
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: 'component/scroller/css/img/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: 'component/scroller/css/img/',
                // 替换后的背景路径，默认 ../images/
                spritepath: '../images/',
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: true,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: 'component/scroller/css/',
                    // 匹配规则
                    src: 'sprite.css',
                    // 导出css和sprite的路径地址
                    dest: 'component/scroller/css/',
                    // 导出的css名
                    ext: 'sprites.css'
                }]
            }
        },

        webpack: {
            imgtext: {
                entry: './es6/service/comment/eg/main.js',
                output: {
                    path: './es6/service/comment/eg',
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
                }
            }
        }



    });
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-css-sprite');

    grunt.registerTask('default', [ 'jsdoc','babel','webpack']);
};
