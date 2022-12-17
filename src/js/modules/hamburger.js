const defaultOptions = {
  mainElement: '[data-hamburger]',
  togglerOpen: '[data-hamburger-button="open"]',
  togglerClose: '[data-hamburger-button="close"]',
  aria: 'navigation',
  breakpoint: 1200,
}

/*  ---------------------- RUN  -------------------------- */

export function hamburger(userOptions) {
  let options = defaultOptions
  let mainElement

  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement))

  if (userOptions) options = { ...defaultOptions, ...userOptions }
  // destructor
  let { togglerOpen, togglerClose, aria, breakpoint } = options

  const createBackdrop = document.createElement('div')
  createBackdrop.classList.add('navigation__backdrop')
  mainElement.after(createBackdrop)
  const backdrop = document.querySelector('.navigation__backdrop')

  togglerOpen = document.querySelector(togglerOpen)
  togglerClose = document.querySelector(togglerClose)

  if (aria) {
    mainElement.id = aria
    togglerOpen.setAttribute('aria-label', `Open ${aria}`)
    togglerOpen.setAttribute('aria-controls', aria)
    togglerOpen.setAttribute('aria-haspopup', 'dialog')
    togglerClose.setAttribute('aria-label', `Close ${aria}`)
  }

  const focusableElements = Array.from(
    mainElement.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  )

  const firstFocusableElement = focusableElements.at(0)
  const lastFocusableElement = focusableElements.at(-1)

  mainElement.classList.add('transition-stop')
  togglerOpen.addEventListener('click', open)
  togglerClose.addEventListener('click', close)
  backdrop.addEventListener('click', close)
  togglerOpen.addEventListener('keydown', focusTrap)

  // media
  if (breakpoint) {
    const watchBreakpoint = window.matchMedia(`(max-width: ${breakpoint}px)`)
    watchBreakpoint.onchange = e => {
      if (mainElement.classList.contains('active') && !e.matches) {
        mainElement.classList.add('transition-stop')
        backdrop.remove()
        close()
        return
      }

      mainElement.after(createBackdrop)
    }
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    document.addEventListener('keydown', closeWithEsc)
    mainElement.classList.add('active')
    mainElement.setAttribute('aria-modal', 'true')
    mainElement.setAttribute('role', 'dialog')
    mainElement.classList.remove('transition-stop')
    backdrop.classList.add('active')
  }

  function close() {
    document.removeEventListener('keydown', closeWithEsc)
    mainElement.classList.remove('active')
    mainElement.removeAttribute('aria-modal')
    mainElement.removeAttribute('role')
    mainElement.addEventListener('transitionend', () => mainElement.classList.add('transition-stop'), { once: true })
    backdrop.classList.remove('active')
  }

  function focusTrap() {
    mainElement.addEventListener('transitionend', () => firstFocusableElement.focus(), {
      once: true,
    })

    mainElement.addEventListener('keydown', e => {
      if (e.code === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault()
          lastFocusableElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }
    })
  }

  function closeWithEsc(e) {
    if (e.code === 'Escape') {
      close()
      togglerOpen.focus()
    }
  }
}
