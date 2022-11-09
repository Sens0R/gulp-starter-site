if (window.matchMedia('(pointer: coarse)').matches) {
  console.log('touchscreen')
}

// REFRESH SITE ON TOP
export function refreshSiteOnTOp() {
  history.scrollRestoration = 'manual'
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }
}

// focus-check for debugging
document.addEventListener(
  'focusin',
  function () {
    console.log('focused: ', document.activeElement)
  },
  true
)
