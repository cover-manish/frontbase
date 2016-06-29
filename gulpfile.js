var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');
var atImport = require('postcss-import');

gulp.task('build', function() {
	var processors = [
	require('postcss-mixins'),
	atImport({
		path: ['static/pcss']
	}),
	require('postcss-simple-vars'),
	require('postcss-nested'),
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

gulp.task('watch:pcss', function () {
	gulp.watch('./static/pcss/*.pcss', ['build']);
	});

gulp.task('default', ['watch:pcss', 'connect']);