// DOM Elements
const body = document.body
const themeButtonsArr = document.querySelectorAll('[data-theme-toggler]')
const darkButton = document.querySelector('[data-theme-toggler="dark"]')
const lightButton = document.querySelector('[data-theme-toggler="light"]')
const systemButton = document.querySelector('[data-theme-toggler="system"]')
const themeMq = window.matchMedia('(prefers-color-scheme: dark)')
const storageTheme = localStorage.getItem('theme')
const darkTheme = localStorage.theme === 'dark'
const lightTheme = localStorage.theme === 'light'
const systemTheme = localStorage.theme === 'system'

export function themeToggle() {
	console.log(themeMq)
	if (!storageTheme || systemTheme) {
		systemThemeLoad()
		systemThemeWatch()
	}

	if (darkTheme) goDark()
	if (lightTheme) goLight()

	// Button Event Handlers
	darkButton.onclick = () => {
		localStorage.setItem('theme', 'dark')
		goDark()
	}

	lightButton.onclick = () => {
		localStorage.setItem('theme', 'light')
		goLight()
	}

	systemButton.onclick = () => {
		localStorage.setItem('theme', 'system')
		clearActiveThemes()
		systemButton.classList.add('active')
		systemThemeLoad()
		systemThemeWatch()
	}
}

function goDark() {
	body.setAttribute('data-theme', 'dark')
	clearActiveThemes()
	darkButton.classList.add('active')
}

function goLight() {
	body.setAttribute('data-theme', 'light')
	clearActiveThemes()
	lightButton.classList.add('active')
}

function systemThemeLoad() {
	if (themeMq.matches) {
		body.setAttribute('data-theme', 'dark')
	} else {
		body.setAttribute('data-theme', 'light')
	}
}

function systemThemeWatch() {
	themeMq.onchange = e => {
		if (e.matches) {
			body.setAttribute('data-theme', 'dark')
		} else {
			body.setAttribute('data-theme', 'light')
		}
	}
}

function clearActiveThemes() {
	themeButtonsArr.forEach(themeButton => {
		themeButton.classList.remove('active')
	})
}
