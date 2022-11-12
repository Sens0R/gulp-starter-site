import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

//Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//Импорт задач
import { reset } from './gulp/tasks/reset.js';
import { copy, copyRegularSvg } from './gulp/tasks/copy.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images, thumbnail } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { spriteMono, spriteMulti } from './gulp/tasks/svgSprites.js';

//Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.thumbnail, thumbnail);
  gulp.watch(path.watch.svgSpriteMono, spriteMono);
  gulp.watch(path.watch.svgSpriteMulti, spriteMulti);
  // Пример автозагрузки на FTP gulp.watch(path.watch.images, gulp.series(images, ftp))
}

// Последовательная сценарии
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Параллельные сценарии
const imageTasks = gulp.parallel(images, thumbnail);
const svgSprites = gulp.parallel(spriteMono, spriteMulti, copyRegularSvg);

// Основной сценарий
const mainTasks = gulp.series(gulp.parallel(html, scss, js, svgSprites));

// Построение сценариев выполнения задач
const dev = gulp.series(copy, mainTasks, gulp.parallel(watcher, server));
const devReset = gulp.series(reset, copy, fonts, gulp.parallel(mainTasks, imageTasks), gulp.parallel(watcher, server));
const build = gulp.series(reset, copy, fonts, gulp.parallel(mainTasks, imageTasks));


// Экспорт сценариев
export { dev };
export { build };
export { devReset };

// Выполнение сценария по умолчанию
gulp.task('default', dev);
