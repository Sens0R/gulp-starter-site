// DOM Elements
const body = document.body
const themeButtonsArr = document.querySelectorAll('[data-theme-toggler]')
const darkButton = document.querySelector('[data-theme-toggler="dark"]')
const lightButton = document.querySelector('[data-theme-toggler="light"]')
const systemButton = document.querySelector('[data-theme-toggler="system"]')
const themeMq = window.matchMedia('(prefers-color-scheme: dark)')
const storageTheme = localStorage.getItem('theme')

export function themeToggle() {
	localStorage.setItem('theme', 'system')
	body.setAttribute('data-theme', storageTheme)

	if (localStorage.theme === 'system') {
		console.log('system theme startup')
		systemTheme()
	}

	// Button Event Handlers
	darkButton.onclick = () => {
		body.setAttribute('data-theme', 'dark')
		localStorage.setItem('theme', 'dark')
		clearActiveThemes()
		darkButton.classList.add('active')
		console.log('onclick dark')
	}

	lightButton.onclick = () => {
		body.setAttribute('data-theme', 'light')
		localStorage.setItem('theme', 'light')
		clearActiveThemes()
		lightButton.classList.add('active')
		console.log('onclick light')
	}

	systemButton.onclick = () => {
		localStorage.setItem('theme', 'system')
		clearActiveThemes()
		systemButton.classList.add('active')
		systemTheme()
	}
}

function systemTheme() {
	if (themeMq.matches) {
		body.setAttribute('data-theme', 'dark')
		console.log('dark')
	} else {
		body.setAttribute('data-theme', 'light')
		console.log('light')
	}

	themeMq.onchange = e => {
		if (!localStorage.theme === 'system') return

		if (e.matches) {
			body.setAttribute('data-theme', 'dark')
			console.log('onchange dark')
		} else {
			body.setAttribute('data-theme', 'light')
			console.log('onchange light')
		}
	}
}

function clearActiveThemes() {
	themeButtonsArr.forEach(themeButton => {
		themeButton.classList.remove('active')
	})
}
