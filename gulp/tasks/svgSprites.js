import svgSprite from 'gulp-svg-sprite';

export const spriteMono = () => {
  return app.gulp
    .src(app.path.src.svgSpriteMono, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: `../icons/sprite-mono.svg`,
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};

export const spriteMulti = () => {
  return app.gulp
    .src(app.path.src.svgSpriteMulti, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: `../icons/sprite-multi.svg`,
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name'],
                    },
                  },
                  {
                    removeUselessStrokeAndFill: false,
                  },
                  {
                    inlineStyles: true,
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`))
    .pipe(app.plugins.browsersync.stream()); // test auto-update sprites
};
