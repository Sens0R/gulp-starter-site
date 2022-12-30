/*
* 1. Select dropdown container element with data-dropdown attribute. Default behavior (no value) - click. Add "hover" value to make dropdown that activates on click.
* 2. Container element must have button element inside. This button opens dropdown. 
* 3. Select container element that holds dropdown content with data-dropdown-content. 
* 4. Active dropdown container element has 'active' class for CSS styling.

* EXAMPLE: 
* <div data-dropdown="hover">
*   <button type="button"></button>  
*   <div data-dropdown-content>
*     <a href="#"></a>
*     <a href="#"></a>
*   </div>
* </div>
*/

let touchDevice
if (window.matchMedia('(pointer: coarse)').matches) touchDevice = true

const dropdownsArr = document.querySelectorAll('[data-dropdown]')

window.matchMedia('(orientation: landscape)').onchange = () => {
	const activeDropdownsArr = document.querySelectorAll('[data-dropdown].active')
	activeDropdownsArr.forEach(activeDropdownEl => {
		const activeDropdownContent = activeDropdownEl.querySelector('[data-dropdown-content]')
		activeDropdownContent.style.maxHeight = activeDropdownContent.scrollHeight + 'px'
	})
}

export function dropdown() {
	dropdownsArr.forEach(dropdownEl => {
		const dropdownButton = dropdownEl.querySelector('button')
		const dropdownContent = dropdownEl.querySelector('[data-dropdown-content]')
		const parentContentEl = dropdownEl.closest('[data-dropdown-content]') //nested dropdown
		const dropdownContentLinksArr = dropdownContent.querySelectorAll(
			'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)

		dropdownButton.setAttribute('aria-expanded', 'false')

		if (touchDevice) dropdownContent.style.maxHeight = 0

		if (dropdownEl.dataset.dropdown === 'hover' && !touchDevice) {
			dropdownEl.addEventListener('mouseenter', toggle)
			dropdownEl.addEventListener('mouseleave', close)
		}

		dropdownButton.addEventListener('click', toggle)

		dropdownContentLinksArr.forEach((dropdownContentLink, i) => {
			const firstLink = dropdownContentLinksArr[0]
			const lastLink = dropdownContentLinksArr[dropdownContentLinksArr.length - 1]
			const nextLink = dropdownContentLinksArr[i + 1]
			const prevLink = dropdownContentLinksArr[i - 1]

			dropdownContentLink.addEventListener('keydown', e => {
				if (e.code === 'Home') {
					e.preventDefault()
					firstLink.focus()
				}

				if (e.code === 'End') {
					e.preventDefault()
					lastLink.focus()
				}

				if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
					e.preventDefault()
					if (nextLink) return nextLink.focus()
					firstLink.focus()
				}

				if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
					e.preventDefault()
					if (prevLink) return prevLink.focus()
					lastLink.focus()
				}
			})

			dropdownContentLink.addEventListener('click', () => {
				dropdownContent.classList.add('transition-stop')
				close()
			})

			checkBoundingBox()
		})

		function toggle() {
			dropdownContent.classList.remove('transition-stop')

			if (dropdownEl.classList.contains('active')) return close()
			if (touchDevice) dropdownContent.style.maxHeight = `${dropdownContent.scrollHeight}px`

			//nested dropdown
			if (parentContentEl & touchDevice) {
				parentContentEl.style.maxHeight = `${dropdownContent.scrollHeight + parentContentEl.scrollHeight}px`
				parentContentEl.style.overflow = 'visible'
			}

			dropdownEl.classList.add('active')
			document.addEventListener('keydown', closeWithEsc)
			dropdownButton.setAttribute('aria-expanded', 'true')

			setTimeout(() => {
				document.addEventListener('click', clickOutside)
			}, 1)
			dropdownButton.addEventListener('keydown', selectFirstLink)
			checkBoundingBox()
		}

		function close() {
			if (touchDevice) {
				dropdownContent.style.maxHeight = 0
				dropdownContent.style.overflow = null
			}

			document.removeEventListener('keydown', closeWithEsc)
			dropdownButton.setAttribute('aria-expanded', 'false')
			document.removeEventListener('click', clickOutside)
			dropdownButton.removeEventListener('keydown', selectFirstLink)
			dropdownEl.classList.remove('active')
		}

		function selectFirstLink(e) {
			if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
				e.preventDefault()
				dropdownContentLinksArr[0].focus()
			}
		}

		function clickOutside(e) {
			if (!dropdownContent.contains(e.target)) close()
		}

		function closeWithEsc(e) {
			if (e.code === 'Escape') {
				close()
				if (dropdownEl.contains(document.activeElement)) dropdownButton.focus()
			}
		}

		function checkBoundingBox() {
			let bounds = dropdownContent.getBoundingClientRect()

			if (bounds.right > window.innerWidth) {
				dropdownContent.style.right = '0'
				dropdownContent.style.left = 'inherit'
				dropdownContent.style.translate = '0'
			}

			if (bounds.left < 0) {
				dropdownContent.style.right = 'inherit'
				dropdownContent.style.left = '0'
				dropdownContent.style.translate = '0'
			}
		}
	})
}

function resetBoundingBox() {
	dropdownContent.style.right = null
	dropdownContent.style.left = null
	dropdownContent.style.translate = null
}
