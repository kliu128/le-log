(function() {
    "use strict";
    
    // Include gulp
    let gulp = require('gulp'); 

    // Makes it so that pipes don't abort upon any error (such as an SCSS 
    // compilation error, helpful in watch)
    let plumber = require('gulp-plumber');

    let browserSync = require('browser-sync');

    let sass = require('gulp-sass');
    let nano = require('gulp-cssnano');
    let sourcemaps = require('gulp-sourcemaps');
    let autoprefixer = require('gulp-autoprefixer');

    let ts = require('gulp-typescript');
    let webpack = require('webpack-stream');
    let uglify = require('gulp-uglify');

    function sync() {
        browserSync({
            server: {
                baseDir: '.'
            },
        })
    }

    // Compile sass, autoprefix, minify
    gulp.task('stylesheets', function() {
        return gulp.src('scss/**/*.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(nano())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('css'));
    });

    // Concatenate & Minify JS
    gulp.task('scripts', function() {
        return gulp.src('ts/**/main.ts')
            .pipe(plumber())
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest('js'));
    });

    // Watch Files For Changes
    gulp.task('watch', function() {
        sync();
        gulp.watch('ts/**/*.ts', gulp.series('scripts'));
        gulp.watch('scss/**/*.scss', gulp.series('stylesheets'));
        // Reload when HTML/compiled JS/compiled CSS changes
        gulp.watch('**/*.html', browserSync.reload);
        gulp.watch('js/**/*.js', browserSync.reload);
        gulp.watch('css/**/*.css', browserSync.reload);
    });

    gulp.task('build', gulp.parallel('stylesheets', 'scripts'));

    // Default Task
    gulp.task('default', gulp.series('build', 'watch'));
})();