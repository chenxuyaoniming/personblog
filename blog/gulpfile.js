var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
// var imagemin = require('gulp-imagemin');
// var concat = require('gulp-concat'); 
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var babel = require("gulp-babel");
// var clean = require("gulp-clean-css")


gulp.task('copy-index',function(){
	gulp.src('index.html').pipe(gulp.dest('dist')).pipe(connect.reload());
});
//子网页
gulp.task('copy-html',function(){
	gulp.src('html/*.html').pipe(gulp.dest('dist/html'))
});
//压缩样式
gulp.task('ConCss',function(){
	return gulp.src('css/*.css')
	.pipe(clean())
	.pipe(gulp.dest('dist/css'))
});
//JS
gulp.task('copy-js',function(){
	gulp.src('js/*.js').pipe(gulp.dest('dist/js'))
});
//压缩转码 -- js文件
 gulp.task('ConJs',function(){ 
	 return gulp.src("js/*.js")       
	.pipe(babel({'presets':['es2015']})) 
	.pipe(uglify())
	.pipe(gulp.dest('DIST/js'));

 }) 

//scss转换css
gulp.task('scss',function(){
	gulp.src('public/stylesheets/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/stylesheets/'))
	.pipe(connect.reload())
})
//监听scss
gulp.task('watchScss',function(){
	gulp.watch('public/stylesheets/*.scss',['scss'])
})




//全部执行
gulp.task('build',['copy-js','copy-css','copy-html','copy-img','copy-index'],function(){
	console.log('success')
})
//创建服务器
gulp.task('server',function(){
	connect.server(
		{root:'dist',
		 livereload:true
		})
})

gulp.task('watch',function(){
	gulp.watch('index.html',['copy-index']);
	gulp.watch('html/*.html'),['copy-html'];
	gulp.watch('css/*.css',['copy-css']);
	gulp.watch('js/*.js',['copy-js']);	
})
//打开服务器并实时修改文件
gulp.task('default',['server','watch'])
