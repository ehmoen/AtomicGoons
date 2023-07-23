/// <binding BeforeBuild='sass, js' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

const gulp = require('gulp'),
    rimraf = require("rimraf"),
    fs = require("fs"),
    sass = require("gulp-sass")(require("sass")),
    prefix = require("gulp-autoprefixer"),
    minifyCss = require("gulp-cssmin"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename");

const paths = { webroot: "./wwwroot/" };
const jsSource = "JavaScript/**/*.js";
const sassSource = "Styles/**/*.scss";

const sassMainFile = "Styles/stylesheet.scss";

const cssDestinationFile = "Site.min.css";

const jsDestination = paths.webroot + "js/Site.min.js";
const cssDestination = paths.webroot + "css/";

function watchOnly() {
    gulp.watch(sassSource, gulp.series("sass"));
    gulp.watch(jsSource, gulp.series("js"));
}

function styles () {
    return gulp.src(sassMainFile)
        .pipe(sass())
        .pipe(prefix("last 2 versions"))
        .pipe(minifyCss())
        .pipe(rename(cssDestinationFile))
        .pipe(gulp.dest(cssDestination));
}

function js () {
    return gulp.src(jsSource)
        .pipe(concat(jsDestination))
        .pipe(gulp.dest('.'));
}

const build = gulp.series(gulp.parallel(js, styles));
const watch = gulp.series(gulp.parallel(js, styles), watchOnly);

exports.sass = styles;
exports.js = js;
exports.watch = watch;
exports.jsAndSass = build;
