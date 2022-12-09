import fs from 'fs-extra'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
	// Ищем файлы шрифтов .otf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертируем в .ttf
			.pipe(
				fonter({
					formats: ['ttf'],
				})
			)
			// Выгружаем в исходную папку
			.pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
	)
}

export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return (
		app.gulp
			.src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'FONTS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// Конвертируем в .woff
			.pipe(
				fonter({
					formats: ['woff'],
				})
			)
			// Выгружаем в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
			// Ищем файлы шрифтов .ttf
			.pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
			// Конвертируем в .woff2
			.pipe(ttf2woff2())
			// Выгружаем в папку с результатом
			.pipe(app.gulp.dest(`${app.path.build.fonts}`))
	)
}

export const fontsStyle = () => {
	// Файлы стилей подключения шрифтов
	let fontsFile = `${app.path.srcFolder}/css/base/_fonts.scss`
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFile) {
			// Проверяем существует ли файл fonts.scss
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '', cb)
				let newFileOnly
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключение шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0]
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
						let fontStyle
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'thinitalic') {
							fontWeight = 100
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'extralightitalic') {
							fontWeight = 200
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'lightitalic') {
							fontWeight = 300
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'mediumitalic') {
							fontWeight = 500
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'semibolditalic') {
							fontWeight = 600
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'bolditalic') {
							fontWeight = 700
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'extrabolditalic' || fontWeight.toLowerCase() === 'heavyitalic') {
							fontWeight = 800
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900
							fontStyle = 'normal'
						} else if (fontWeight.toLowerCase() === 'blackitalic') {
							fontWeight = 900
							fontStyle = 'italic'
						} else if (fontWeight.toLowerCase() === 'italic') {
							fontWeight = 400
							fontStyle = 'italic'
						} else {
							fontWeight = 400
							fontStyle = 'normal'
						}
						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: "${fontName}";\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n\t}\r\n`,
							cb
						)
						newFileOnly = fontFileName
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!')
			}
		}
	})
	return app.gulp.src(`${app.path.srcFolder}`)
	function cb() {}
}
