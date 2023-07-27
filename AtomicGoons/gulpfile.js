const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

// define paths
const paths = {
    scripts: {
        src: 'Scripts/**/*.ts',
        dest: 'wwwroot/js/'
    },
    styles: {
        src: 'Styles/**/*.scss',
        dest: 'wwwroot/css/'
    }
};

// compile TypeScript to JS, bundle and minify
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            module: 'ES6'
        }))
        .pipe(concat('bundle.js')) // Bundle to a single file
        .pipe(terser()) // Minify the JavaScript
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
});

// compile SCSS to CSS, bundle and minify
gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css')) // Bundle to a single file
        .pipe(cleanCSS()) // Minify the CSS
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
});

// watch for changes in TypeScript and SCSS files
gulp.task('watch', function() {
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.styles.src, gulp.series('styles'));
});

// default task
gulp.task('default', gulp.parallel('scripts', 'styles', 'watch'));

