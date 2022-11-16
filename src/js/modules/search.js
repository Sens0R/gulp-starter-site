export function search() {
  const searchInstances = document.querySelectorAll('form[role="search"]')

  searchInstances.forEach((searchInstance, searchNum) => {
    const searchInput = searchInstance.querySelector('input[type="search"')
    const searchLabel = searchInstance.querySelector('label')
    const submitBtn = searchInstance.querySelector('button[type="submit"]')

    submitBtn.setAttribute('disabled', '')
    searchLabel.setAttribute('for', `search-${searchNum + 1}`)
    
    searchInput.id = `search-${searchNum + 1}`
    searchInput.addEventListener('input', () => {
      if (searchInput.value) return submitBtn.removeAttribute('disabled', '')
      submitBtn.setAttribute('disabled', '')
    })
  })
}
