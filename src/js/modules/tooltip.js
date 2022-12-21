/*
* 1. Select element for tooltip by adding data-tooltip attribute with anchor value (default value: bottom). Data-tooltip values: top, top-left, top-right bottom, bottom-left, bottom-right, left, right. Style their position in CSS. 
* 2. Specify tooltip text in aria-label attribute value. 
* 3. Selected element gets 'position: relative'. 
* 4. Tooltip element has 'tooltip' class for CSS styling.

* EXAMPLE: 
* <a href="#" data-tooltip="top-right" aria-label="Tooltip text"></a>
*/

let touchDevice
if (window.matchMedia('(pointer: coarse)').matches) touchDevice = true

const tooltipsArr = document.querySelectorAll('[data-tooltip]')

export function tooltip() {
  if (touchDevice) return
  tooltipsArr.forEach(tooltipTarget => {
    let tooltipEl
    const tooltipTargetHasValue = tooltipTarget.getAttribute('data-tooltip')
    createTooltip()

    if (!tooltipTargetHasValue) tooltipTarget.setAttribute('data-tooltip', 'bottom')

    tooltipTarget.addEventListener('mouseenter', () => {
      checkBoundingBox()
      tooltipEl.classList.add('active')
    })

    tooltipTarget.addEventListener('mouseleave', () => tooltipEl.classList.remove('active'))

    // add { focusVisible: true } option once it is supported and remove media query list
    tooltipTarget.addEventListener('focus', () => {
      tooltipEl.classList.add('active')
      document.addEventListener('keydown', closeWithEsc)
      checkBoundingBox()
    })

    tooltipTarget.addEventListener('blur', () => {
      tooltipEl.classList.remove('active')
      document.removeEventListener('keydown', closeWithEsc)
    })

    /* ====================   FUNCTIONS   ==================== */

    function createTooltip() {
      tooltipTarget.style.position = 'relative'
      const createTooltipEl = document.createElement('span')
      createTooltipEl.classList.add('tooltip')
      tooltipTarget.prepend(createTooltipEl)
      tooltipEl = tooltipTarget.firstElementChild
      const tooltipElAttrValue = tooltipTarget.getAttribute('aria-label')
      tooltipEl.textContent = tooltipElAttrValue
    }

    function closeWithEsc(e) {
      if (e.code === 'Escape') tooltipEl.classList.remove('active')
    }

    function checkBoundingBox() {
      let bounds = tooltipEl.getBoundingClientRect()
      const tooltipDirection = tooltipTarget.getAttribute('data-tooltip')

      // bottom > top
      if (bounds.bottom > window.innerHeight) {
        tooltipTarget.setAttribute('data-tooltip', 'top')
        if (bounds.left < 0) tooltipTarget.setAttribute('data-tooltip', 'top-left')
        if (bounds.right > window.innerWidth) tooltipTarget.setAttribute('data-tooltip', 'top-right')
        return
      }

      // top > bottom
      if (bounds.top < 0) {
        tooltipTarget.setAttribute('data-tooltip', 'bottom')
        if (bounds.left < 0) tooltipTarget.setAttribute('data-tooltip', 'bottom-left')
        if (bounds.right > window.innerWidth) tooltipTarget.setAttribute('data-tooltip', 'bottom-right')
        return
      }

      // right > left
      if (bounds.right > window.innerWidth) {
        if (tooltipDirection === 'top') tooltipTarget.setAttribute('data-tooltip', 'top-right')
        if (tooltipDirection === 'right') tooltipTarget.setAttribute('data-tooltip', 'left')
        if (tooltipDirection === 'bottom') tooltipTarget.setAttribute('data-tooltip', 'bottom-right')
        return
      }

      // left > right
      if (bounds.left < 0) {
        if (tooltipDirection === 'top') tooltipTarget.setAttribute('data-tooltip', 'top-left')
        if (tooltipDirection === 'left') tooltipTarget.setAttribute('data-tooltip', 'right')
        if (tooltipDirection === 'bottom') tooltipTarget.setAttribute('data-tooltip', 'bottom-left')
      }
    }
  })
}
