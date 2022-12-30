// DOM Elements
const body = document.body
const themeButtonsArr = document.querySelectorAll('[data-theme-toggler]')
const darkButton = document.querySelector('[data-theme-toggler="dark"]')
const lightButton = document.querySelector('[data-theme-toggler="light"]')
const systemButton = document.querySelector('[data-theme-toggler="system"]')
const themeMq = window.matchMedia('(prefers-color-scheme: dark)')
const darkTheme = localStorage.theme === 'dark'
const lightTheme = localStorage.theme === 'light'

export function themeToggle() {
	if (!lightTheme && !darkTheme) systemTheme()
	if (darkTheme) goDark()
	if (lightTheme) goLight()

	// Button Event Handlers
	darkButton.onclick = () => {
		localStorage.setItem('theme', 'dark')
		goDark()
		themeMq.onchange = null
	}

	lightButton.onclick = () => {
		localStorage.setItem('theme', 'light')
		goLight()
		themeMq.onchange = null
	}

	systemButton.onclick = () => {
		localStorage.setItem('theme', 'system')
		clearActiveThemeHighlight()
		systemButton.classList.add('active')
		systemTheme()
	}
}

function goDark() {
	body.setAttribute('data-theme', 'dark')
	clearActiveThemeHighlight()
	darkButton.classList.add('active')
}

function goLight() {
	body.setAttribute('data-theme', 'light')
	clearActiveThemeHighlight()
	lightButton.classList.add('active')
}

function systemTheme() {
	if (themeMq.matches) {
		body.setAttribute('data-theme', 'dark')
	} else {
		body.setAttribute('data-theme', 'light')
	}

	themeMq.onchange = e => {
		if (e.matches) {
			body.setAttribute('data-theme', 'dark')
		} else {
			body.setAttribute('data-theme', 'light')
		}
	}
}

function clearActiveThemeHighlight() {
	themeButtonsArr.forEach(themeButton => {
		themeButton.classList.remove('active')
	})
}
