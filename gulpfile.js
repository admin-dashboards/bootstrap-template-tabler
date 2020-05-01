const gulp = require('gulp'),
	glob = require('glob'),
	sass = require('gulp-ruby-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	fs = require('fs'),
	path = require('path'),
	YAML = require('yaml'),
	cp = require('child_process');


/**
 * SVG icons
*/
const prepareSvgFile = function(svg) {
	return svg.replace(/\n/g, '').replace(/>\s+</g, '><');
};

const generateIconsYml = function(dir, filename) {
	const files = glob.sync(dir);
	let svgList = {};

	files.forEach(function(file){
		const basename = path.basename(file, '.svg');
		svgList[basename] = prepareSvgFile(fs.readFileSync(file).toString());
	});

	fs.writeFileSync(filename, YAML.stringify(svgList));
};

gulp.task('svg-icons', function (cb) {
	generateIconsYml("./node_modules/tabler-icons/icons/*.svg", './pages/_data/icons-tabler.yml');
	generateIconsYml("./svg/brand/*.svg", './pages/_data/icons-brand.yml');
	cb();
});

gulp.task('sass', function () {
	return sass('scss/default.scss', { style: 'expanded' })
		.pipe(postcss([
			require('autoprefixer'),
		]))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser-sync', function () {
	browserSync({
		watch: true,
		server: {
			baseDir: "tmp",
			routes: {
				"/dist/css": "./tmp-dist/css",
				"/dist/js": "./tmp-dist/js",
				"/dist/img": "./img",
				"/node_modules": "./node_modules",
				"/static": "./static",
			}
		},
		open: false,
		host: "localhost",
		notify: false,
		reloadOnRestart: true
	});
});

gulp.task('watch', function (cb) {
	gulp.watch('./scss/**/*.scss', gulp.series('sass'));
	cb();
});

gulp.task('jekyll-watch', function (done) {
	browserSync.notify('Building Jekyll');
	return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--watch'], { stdio: 'inherit' })
		.on('close', done);
});

gulp.task('develop', gulp.parallel('sass', 'jekyll-watch', 'watch', 'browser-sync'));
