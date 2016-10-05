"use strict";

const gulp         = require('gulp'),
      path         = require('path'),
      babelify     = require('babelify'),
      buffer       = require('vinyl-buffer'),
      gutil        = require('gulp-util'),
      watchify     = require('watchify'),
      server       = require('browser-sync'),
      sass         = require('gulp-ruby-sass'),
      browserify   = require('browserify'),
      autoprefixer = require('gulp-autoprefixer'),
      chalk        = require('chalk'),
      notifier     = require('node-notifier'),
      rename       = require('gulp-rename'),
      sourcemaps   = require('gulp-sourcemaps'),
      source       = require('vinyl-source-stream'),
      esdoc        = require('gulp-esdoc');


var config = {
  js: {
    src:"src/js/index.js",
    watch:"src/js/**/*",
    outputDir:"bin/",
    outputFile:"bundle.js"
  },
  html: {
    src:["src/*.html","src/manifest.json"],
    watch:["src/*.html","src/manifest.json"],
    outputDir:"bin/"
  },
  css: {
    src:"src/scss/style.scss",
    watch:"src/scss/**/*",
    outputDir:"bin"
  },
  assets: {
    src:["src/assets/**/*.{png,gif,jpg,webp,svg,otf,ttf,eot,woff,woff2,ico,json,js}"],
    watch:["src/assets/**/*.{png,gif,jpg,webp,svg,otf,ttf,eot,woff,woff2,ico,json,js}"],
    outputDir:"bin/assets"
  },
  docs: {
    src: 'src/js/Engine/',
    outputDir:"docs/"
  }
}

var serverOptions = {
  server: {
    baseDir:'./bin',
    index:'index.html'
  },
  open:true,
  browser:'chrome',
  ghostMode: {
   clicks:false,
   forms:false,
   scroll:false
  }
}

function errorReport(err){
  notifier.notify({title:"Build error",message:err.message});
  gutil.log(chalk.red(err.name) + ": " + chalk.blue(err.message));
  this.emit('end');
}

function bundle(bundler){

  bundler
    .bundle()
    .on('error', errorReport)
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.outputDir))
    .on('end',() => server.reload(config.js.outputFile))
}

gulp.task('js', () => {
  var bundler = browserify(config.js.src,watchify.args)
    .plugin(watchify, {ignoreWatch:['**/node_modules/**']})
    .transform(babelify, {presets:['es2015']});

    bundle(bundler);

    bundler.on('update', () => bundle(bundler));
})


gulp.task('html', () => {
    return gulp.src(config.html.src)
           .pipe(gulp.dest(config.html.outputDir))
           .on('end', () => server.reload());
});

gulp.task('assets', () => {
    return gulp.src(config.assets.src)
           .pipe(gulp.dest(config.assets.outputDir))
           .on('end',() => server.reload());
});

gulp.task('styles', () => {
    return sass(config.css.src,{
                compass:false,
                style:"compressed"})
           .pipe(autoprefixer({
                browsers:['> 0.2%'],
                cascade:false
           }))
           .pipe(gulp.dest(config.css.outputDir))
           .on('end', () => server.reload('style.css'));
}); 

gulp.task('docs', () => {
  return gulp.src(config.docs.src)
         .pipe(esdoc({destination:config.docs.outputDir}));
})

gulp.task('watch', () => {
    gulp.watch(config.css.watch,['styles']);
    gulp.watch(config.assets.watch,['assets']);
    gulp.watch(config.html.watch,['html']);
});

gulp.task('server', () => {
    return server(serverOptions)
});

gulp.task('compile',['html','assets','js','styles']);
gulp.task('default',['compile','server','watch']);