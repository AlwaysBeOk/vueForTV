var gulp = require('gulp');
var webpack = require('gulp-webpack');
gulp.task('default', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack({
            entry: './news/topic/js/main.js',
            output: {
                filename: 'build.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.vue$/,
                        loader: 'vue'
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel!eslint',
                        // make sure to exclude 3rd party code in node_modules
                        exclude: /node_modules/
                    },
                    {
                        // edit this for additional asset file types
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url',
                        query: {
                            // inline files smaller then 10kb as base64 dataURL
                            limit: 10000,
                            // fallback to file-loader with this naming scheme
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            // vue-loader config:
            // lint all JavaScript inside *.vue files with ESLint
            // make sure to adjust your .eslintrc
            vue: {
                loaders: {
                    js: 'babel!eslint'
                }
            },
            externals: {
                jquery: 'window.$'
            },
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.js',
                    'vue-swipe$': 'vue-swipe/dist/vue-swipe.js'
                }

            }
        }))
        .pipe(gulp.dest('./news/dist/'));
});
gulp.task('cbox_detail', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      entry: './cbox/detail/js/main.js',
      output: {
        filename: 'build.js'
      },
      module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel!eslint',
            // make sure to exclude 3rd party code in node_modules
            exclude: /node_modules/
          },
          {
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
              // inline files smaller then 10kb as base64 dataURL
              limit: 10000,
              // fallback to file-loader with this naming scheme
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      // vue-loader config:
      // lint all JavaScript inside *.vue files with ESLint
      // make sure to adjust your .eslintrc
      vue: {
        loaders: {
          js: 'babel!eslint'
        }
      },
      externals: {
        jquery: 'window.$'
      },
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.js',
          'vue-swipe$': 'vue-swipe/dist/vue-swipe.js'
        }

      }
    }))
    .pipe(gulp.dest('cbox/detail/dist/'));
});
gulp.task('cbox_subscribe', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      entry: './cbox/subscribe/js/main.js',
      output: {
        filename: 'build.js'
      },
      module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel!eslint',
            // make sure to exclude 3rd party code in node_modules
            exclude: /node_modules/
          },
          {
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
              // inline files smaller then 10kb as base64 dataURL
              limit: 10000,
              // fallback to file-loader with this naming scheme
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      // vue-loader config:
      // lint all JavaScript inside *.vue files with ESLint
      // make sure to adjust your .eslintrc
      vue: {
        loaders: {
          js: 'babel!eslint'
        }
      },
      externals: {
        jquery: 'window.$'
      },
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.js',
          'vue-swipe$': 'vue-swipe/dist/vue-swipe.js'
        }

      }
    }))
    .pipe(gulp.dest('cbox/subscribe/dist/'));
});
gulp.task('news_detail', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      entry: './news/detail/js/main1.js',
      output: {
        filename: 'build.js'
      },
      module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel!eslint',
            // make sure to exclude 3rd party code in node_modules
            exclude: /node_modules/
          },
          {
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
              // inline files smaller then 10kb as base64 dataURL
              limit: 10000,
              // fallback to file-loader with this naming scheme
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      // vue-loader config:
      // lint all JavaScript inside *.vue files with ESLint
      // make sure to adjust your .eslintrc
      vue: {
        loaders: {
          js: 'babel!eslint'
        }
      },
      externals: {
        jquery: 'window.$'
      },
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.js',
          'vue-swipe$': 'vue-swipe/dist/vue-swipe.js'
        }

      }
    }))
    .pipe(gulp.dest('./news/detail/dist/'));
});