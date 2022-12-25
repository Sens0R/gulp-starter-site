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




document
	.querySelector('[data-theme-toggler="light"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'light'))
document
	.querySelector('[data-theme-toggler="dark"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'dark'))
document
	.querySelector('[data-theme-toggler="light-1"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'light-1'))
document
	.querySelector('[data-theme-toggler="dark-1"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'dark-1'))
document
	.querySelector('[data-theme-toggler="light-2"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'light-2'))
document
	.querySelector('[data-theme-toggler="dark-2"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'dark-2'))
document
	.querySelector('[data-theme-toggler="light-3"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'light-3'))
document
	.querySelector('[data-theme-toggler="dark-3"]')
	.addEventListener('click', () => document.body.setAttribute('data-theme', 'dark-3'))

