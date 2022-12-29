const body = document.body
const themeMq = window.matchMedia('(prefers-color-scheme: dark)')
const storageTheme = localStorage.getItem('theme')

if (!storageTheme || localStorage.theme === 'system') {
	if (themeMq.matches) {
		body.setAttribute('data-theme', 'dark')
	} else {
		body.setAttribute('data-theme', 'light')
	}
}

if (localStorage.theme === 'dark') body.setAttribute('data-theme', 'dark')
if (localStorage.theme === 'light') body.setAttribute('data-theme', 'light')
