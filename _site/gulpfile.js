const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cp = require("child_process");
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
const browserSync = require("browser-sync").create();

const paths = {
  styles: {
    src: "_sass/**/*.scss",
    dest: "css"
  }
};

function jekyllBuild() {
  return cp.spawn(jekyll, ["build"], { stdio: "inherit" });
}

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(
      sass({
        outputStyle: "compressed",
        onError: browserSync.notify
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: "_site"
    }
  });
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch(paths.styles.src, style);
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*",
      "/.portfolio/*",
      "./about/*",
      "./blog/*"
    ],
    gulp.series(jekyllBuild, browserSyncReload)
  );
}

// define complex tasks
const build = gulp.series(gulp.parallel(style, jekyllBuild));
const watch = gulp.parallel(watchFiles, browserSyncServe);

// export tasks
exports.style = style;
exports.build = build;
exports.watch = watch;
exports.default = build;
