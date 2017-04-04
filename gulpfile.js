// Gulp Packages
var gulp = require('gulp'),
	sass = require('gulp-sass')
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	reload = browserSync.reload;

// CSS Compilation
gulp.task('build-css', function() {
	gulp.src('src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
		}))
		.pipe(cleanCss({processImport: false}))
		.pipe(gulp.dest('src/'))
});

// Default Task
gulp.task('default', function() {
	browserSync({
		server: {
			baseDir: 'src'
		}
	});

	gulp.watch('src/scss/**/*.scss', ['build-css']);
	gulp.watch(['*.html', '*.css', '*.js'], {cwd:'src'}, reload);
});