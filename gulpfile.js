var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');


gulp.task('sass', function() {
	gulp.src('./assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./assets/css/'))
	.pipe(connect.reload());
});


gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('watch:scss', function () {
	gulp.watch('./assets/scss/*.scss', ['sass']);
});



gulp.task('default', ['watch:scss', 'connect']);