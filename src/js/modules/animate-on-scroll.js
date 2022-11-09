export function animateOnScroll() {
  const sectionObserver = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        entry.target.addEventListener('transitionend', () => entry.target.removeAttribute('data-animate'), {
          once: true,
        })
      }
    })
  )

  const sections = document.querySelectorAll('[data-animate]')

  sections.forEach(section => {
    sectionObserver.observe(section)
  })
}
