export function search() {
	const searchInstances = document.querySelectorAll('form[role="search"]')

	searchInstances.forEach(searchInstance => {
		const searchInput = searchInstance.querySelector('input[type="search"')
		const submitButton = searchInstance.querySelector('button[type="submit"]')
		submitButton.setAttribute('disabled', '')

		searchInput.addEventListener('input', () => {
			if (searchInput.value) return submitButton.removeAttribute('disabled', '')
			submitButton.setAttribute('disabled', '')
		})
	})
}
