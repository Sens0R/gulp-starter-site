import './modules/swiper.js'
import { headroom } from './modules/headers.js'
import { accordion } from './modules/accordion.js'
import { tabs } from './modules/tabs.js'
import { activePageHighlight } from './modules/active-page-highlight.js'
import { dropdown } from './modules/dropdown.js'
import { hamburger } from './modules/hamburger.js'
import { animateOnScroll } from './modules/animate-on-scroll.js'
import { search } from './modules/search.js'
import { tooltip } from './modules/tooltip.js'
import { dialog } from './modules/dialog.js'

activePageHighlight()
animateOnScroll()
headroom()
hamburger()
dropdown()
search()
tooltip()
tabs()
accordion()
dialog()

/* // function to set a given theme/color-scheme
function setTheme(themeName) {
	localStorage.setItem('theme', themeName)
	document.documentElement.className = themeName
}

// function to toggle between light and dark theme
function toggleTheme() {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-light')
	} else {
		setTheme('theme-dark')
	}
}

// Immediately invoked function to set the theme on initial load
;(function () {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-dark')
	} else {
		setTheme('theme-light')
	}
})() */

document
	.querySelector('[data-theme-toggler="light"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'light'))
document
	.querySelector('[data-theme-toggler="dark"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'dark'))
document
	.querySelector('[data-theme-toggler="purple"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'purple'))
document
	.querySelector('[data-theme-toggler="purple-dark"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'purple-dark'))
document
	.querySelector('[data-theme-toggler="blue-purple"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'blue-purple'))
