var gulp = require('gulp');
var assets = require('postcss-assets');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var connect = require('gulp-connect');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');

//build task
gulp.task('build', function() {
	var processors = [
	require('postcss-mixins'),
	atImport({path: ['./static/pcss']}),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	assets({loadPaths: ['static/images/']}),
	require('css-mqpacker'),
	autoprefixer({browsers: ['last 2 version']}),
	//cssnano() //uncomment when in production
	];
	return gulp.src('./static/pcss/[^_]*.pcss')
	.pipe(postcss(processors))
	.pipe(rename({extname: '.css'}))
	.pipe(gulp.dest('./static/css'))
	.pipe(connect.reload())
	});

//livereload task
gulp.task('connect', function() {
	connect.server({
		livereload: true
		});
	});

gulp.task('default', ['build', 'connect'] , function () {
	gulp.watch(['./static/pcss/*.pcss', './*.html'], ['build']);
	});
