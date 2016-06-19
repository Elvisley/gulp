var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlmin = require('gulp-htmlmin');
var serverlive = require('gulp-live-server');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var less = require('gulp-less');
var lessPluginCleanCss = require('less-plugin-clean-css');
var cleancss = new lessPluginCleanCss({ advanced: true });


gulp.task('default',['sass','less','js','htmlmin','image','watch','serve']);

gulp.task('sass' , function(){
	//src caminho fonte dos arquivos
	return gulp.src('assets/src/sass/**/*.scss')
			//concatenando todos os arquivos sass
			.pipe(concat('style.min.css'))
			// compilar o sass e comprimir o script
			.pipe(sass({outputStyle: 'compressed'}).on('error' , sass.logError))
			// dest destino dos arquivos 
			.pipe(gulp.dest('assets/css'));
});

gulp.task('js' , function(){
	//src caminho fonte dos arquivos
	return gulp.src('assets/src/js/**/*.js')
			//concatenando todos os arquivos
			.pipe(concat('script.min.js'))
			// comprimir o script
			.pipe(uglify())
			// dest destino dos arquivos 
			.pipe(gulp.dest('assets/js'));
});

gulp.task('image' , function(){
	//src caminho fonte dos arquivos
	return gulp.src('assets/src/images/*')
			.pipe(imagemin({
				progressive : true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('assets/img'));
});

gulp.task('htmlmin' , function(){
	//src caminho fonte dos arquivos
	return gulp.src('_html/*.html')
			.pipe(htmlmin({collapseWhitespace: true}))
			// dest destino dos arquivos 
			.pipe(gulp.dest('.'));
});

gulp.task('watch',function() {
    gulp.watch('assets/src/sass/**/*.scss' 	, ['sass']);
    gulp.watch('assets/src/less/**/*.less' 	, ['less']);
    gulp.watch('assets/src/js/**/*.js' 		, ['js']);
    gulp.watch('assets/src/images/*' 		, ['image']);
    gulp.watch('_html/*.html' 				, ['htmlmin']);
});


gulp.task('serve', function(){
	var server = serverlive.static('./',8000);
	server.start();

	gulp.watch('assets/css/**/*.css' , function(file){
		serverlive.notify.apply(server, [file] );
	});

	gulp.watch('assets/js/**/*.js' , function(file){
		serverlive.notify.apply(server, [file] );
	});

	gulp.watch('assets/img/*' , function(file){
		serverlive.notify.apply(server, [file] );
	});

	gulp.watch('./*.html' , function(file){
		serverlive.notify.apply(server, [file] );
	});
});

gulp.task('lint' , function(){
	return gulp.src('assets/src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter(stylish));
});

gulp.task('less' , function(){
	return gulp.src('assets/src/less/**/*.less')
	.pipe(concat('styleLess.min.css'))
	.pipe(less())
	.pipe(gulp.dest('assets/css'));
});

