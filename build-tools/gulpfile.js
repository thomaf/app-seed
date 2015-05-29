// Récupération des modules
var gulp = require('gulp');

var angularTemplatecache = require('gulp-angular-templatecache'),
concat = require('gulp-concat'),
fs = require('fs'),
less = require('gulp-less'),
minifyHtml = require('gulp-minify-html'),
ngAnnotate = require('gulp-ng-annotate'),
path = require('path'),
sourcemaps = require('gulp-sourcemaps'),
uglify = require('gulp-uglify'),
plumber = require('gulp-plumber')

// Définition des chemins
gulp.paths = {
	development: '../development/',
	build: '../build/',
	tmp: './tmp/',
	bower_compponents: './bower_components/'
};
// Tâche de concaténation et minification des lib js
gulp.task('concat-libs', function () {
	return gulp.src([
		// put the bower libs here
	])
		.pipe(plumber())
		.pipe(concat(gulp.paths.build + 'js/lib.js'))
		.pipe(gulp.dest('.'));

});
// Tâche de concaténation et minification des fichiers js
gulp.task('concat-minify', function () {
	return gulp.src([
		gulp.paths.development + 'app/application.module.js',
		gulp.paths.development + 'app/**/*.js',
		gulp.paths.development + 'doubledash/*.js'
	])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat(gulp.paths.build + 'js/app.js'))
		.pipe(ngAnnotate({add: true}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.'));

});

// Tâche ajoutant la date au fichier js
gulp.task('create-app-js', ['concat-minify'], function () {
	var content = fs.readFileSync(gulp.paths.build + 'js/app.js', 'utf-8');
	content = content.replace(/application:"[0-9]{13}"/g, 'application:"' + new Date().getTime() + '"');
	fs.writeFileSync(gulp.paths.build + 'js/app.js', content, {
		encoding: 'utf-8'
	})
});


// Tâche de concaténation des templates HTML
gulp.task('templates', function () {
	return gulp.src([
		gulp.paths.development + 'app/**/*.html'
	])
		.pipe(plumber())
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(angularTemplatecache('templates.js', {
			module: 'app'
		}))
		.pipe(gulp.dest(gulp.paths.build + 'js/'));
});

// Tâche mettant à jour la version des fichier
gulp.task('update-version', function () {
	var content = fs.readFileSync(gulp.paths.development + 'index.html', 'utf-8');
	content = content.replace(/v=[0-9]{13}'/g, 'v=' + new Date().getTime()+'\'');
	content = content.replace(/build : ([0-9]+)/g, function (phrase, build) {
		return phrase.replace(build, +build + 1)
	})
	fs.writeFileSync(gulp.paths.build + 'index.html', content, {
		encoding: 'utf-8'
	});
});

// Tâche de pré-compilation des css
gulp.task('less', function () {
	return gulp.src(gulp.paths.development + 'less/*.less')
		.pipe(plumber())
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest(gulp.paths.build + 'css'));
});

gulp.task('build', ['create-app-js', 'concat-libs', 'templates', 'update-version', 'less']);

gulp.task('watch', function () {
	gulp.watch(gulp.paths.development + '/**/*.js', ['create-app-js']);
	gulp.watch(gulp.paths.development + '/**/*.html', ['templates', 'update-version']);
	gulp.watch(gulp.paths.development + '/**/*.php', ['templates', 'update-version']);
	gulp.watch(gulp.paths.development + '/**/*.less', ['less']);
})