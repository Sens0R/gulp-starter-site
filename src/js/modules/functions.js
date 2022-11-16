// detect touchscreen device
if (window.matchMedia('(pointer: coarse)').matches) {
  console.log('touchscreen')
}

// focus-check for debugging
document.addEventListener(
  'focusin',
  function () {
    console.log('focused: ', document.activeElement)
  },
  true
)
