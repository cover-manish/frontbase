var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');
var atImport = require('postcss-import');
var assets  = require('postcss-assets');

gulp.task('build', function() {
	var processors = [
	require('postcss-mixins'),
	atImport({
		path: ['static/pcss']
		}),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	assets({loadPaths: ['static/images/']}),
	require('css-mqpacker'),
	autoprefixer({browsers: ['last 2 version']}),
	cssnano()
	];
	return gulp.src('./static/pcss/*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest('./static/css'))
	.pipe(connect.reload())
	});


gulp.task('connect', function() {
	connect.server({
		livereload: true
		});
	});

gulp.task('default', ['build', 'connect'] , function () {
	gulp.watch(['./static/pcss/*.css', './*.html'], ['build']);
	});
