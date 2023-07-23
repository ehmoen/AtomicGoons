const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

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

// compile TypeScript to JS
gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            module: 'ES6' 
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
});

// compile SCSS to CSS
gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest));
});

// watch for changes in TypeScript and SCSS files
gulp.task('watch', function () {
    gulp.watch(paths.scripts.src, gulp.series('scripts'));
    gulp.watch(paths.styles.src, gulp.series('styles'));
});

// default task
gulp.task('default', gulp.parallel('scripts', 'styles', 'watch'));
