var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    plumber         = require('gulp-plumber'),
    browserSync     = require('browser-sync'),
    critical        = require('critical'),
    svgSprite       = require('gulp-svg-sprite'),
    cp              = require('child_process');


    config                  = {
        shape               : {
            dimension       : {         // Set maximum dimensions
                maxWidth    : 64,
                maxHeight   : 64
            },
            spacing         : {         // Add padding
                padding     : 5
            }
        },
        mode                : {
            symbol          : true      // Activate the «symbol» mode
        }
    };


gulp.task('svg', function() {
    gulp.src('_assets/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('images'))
    .pipe(gulp.dest('_includes'));

});

gulp.task('css', function() {
    gulp.src('./css/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

// gulp.task('js', function() {
//     gulp.src('./scripts/**.js')
//     .pipe(concat('scripts.js'))
//     .pipe(gulp.dest('js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('js'))
//     .pipe(gulp.dest('_site/js'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

gulp.task('critical-css', function() {
    critical.generate({
        // Your base directory
        base: '_site/',
        // HTML source file
        src: 'index.html',
        // CSS output file
        dest: 'css/critical.min.css',
        // Viewport width
        width: 1200,
        // Viewport height
        height: 900,
        // Minify critical-path CSS
        minify: true
    });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./_sass/**/*.scss', ['css']);
  // Watch .js files
  //gulp.watch('./scripts/**/*.js', ['js']);
  // Watch .html files and posts
  gulp.watch(['**/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', function() {
    gulp.start('css', 'browser-sync', 'watch');
});