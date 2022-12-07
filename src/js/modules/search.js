export function search() {
  const searchInstances = document.querySelectorAll('form[role="search"]')

  searchInstances.forEach((searchInstance, searchNum) => {
    const searchInput = searchInstance.querySelector('input[type="search"')
    const searchLabel = searchInstance.querySelector('label')
    const submitbutton = searchInstance.querySelector('button[type="submit"]')

    submitbutton.setAttribute('disabled', '')
    searchLabel.setAttribute('for', `search-${searchNum + 1}`)
    
    searchInput.id = `search-${searchNum + 1}`
    searchInput.addEventListener('input', () => {
      if (searchInput.value) return submitbutton.removeAttribute('disabled', '')
      submitbutton.setAttribute('disabled', '')
    })
  })
}
