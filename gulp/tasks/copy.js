export const copy = () => {
  return app.gulp
    .src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));
};

export const copyRegularSvg = () => {
  return app.gulp
    .src(app.path.src.svg)
    .pipe(app.gulp.dest(app.path.build.svg));
};
