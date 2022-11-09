export function search() {
  const searchInstances = document.querySelectorAll('form[role="search"]')

  searchInstances.forEach(searchInstance => {
    const searchInput = searchInstance.querySelector('input[type="search"')
    const submitBtn = searchInstance.querySelector('button[type="submit"]')
    submitBtn.setAttribute('disabled', '')

    searchInput.addEventListener('input', () => {
      if (searchInput.value) return submitBtn.removeAttribute('disabled', '')
      submitBtn.setAttribute('disabled', '')
    })
  })
}
