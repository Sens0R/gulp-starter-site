//Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    svg: `${buildFolder}/images/icons/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    files: `${srcFolder}/files/**/*.*`,
    js: `${srcFolder}/js/app.js`,
    themeJs: `${srcFolder}/js/theme-load.js`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    thumbnail: `${srcFolder}/assets/thumbnail/**/*.{jpg,jpeg,png,gif,webp}`,
    scss: `${srcFolder}/css/style.scss`,
    html: `${srcFolder}/*.html`,
    svg: `${srcFolder}/assets/svgicons/regular/*.svg`,
    svgSpriteMono: `${srcFolder}/assets/svgicons/mono/**/*.svg`,
    svgSpriteMulti: `${srcFolder}/assets/svgicons/multi/**/*.svg`,
  },
  watch: {
    files: `${srcFolder}/files/**/*.*`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/css/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    thumbnail: `${srcFolder}/assets/thumbnail/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    svg: `${srcFolder}/assets/svgicons/regular/*.svg`,
    svgSpriteMono: `${srcFolder}/assets/svgicons/mono/**/*.svg`,
    svgSpriteMulti: `${srcFolder}/assets/svgicons/multi/**/*.svg`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
