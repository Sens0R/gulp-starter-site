export function animateOnScroll() {
  const animationObserver = new IntersectionObserver(entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        entry.target.addEventListener('transitionend', () => entry.target.removeAttribute('data-animate'), {
          once: true,
        })
      }
    })
  )

  const animations = document.querySelectorAll('[data-animate]')

  animations.forEach(animation => {
    animationObserver.observe(animation)
  })
}
