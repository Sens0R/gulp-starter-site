/* 
* 1. Select button(can be more than one) that opens dialog element with data-dialog-open attribute.
* 2. Select dialog element with data-dialog attribute.
* 3. Select button(can be more than one) that closes dialog element with data-dialog-close attribute.
* 4. All elements among dialog instance selected with data attributes should have same unique attribute value. This will allow to distinguish multiple different dialog instances. See example below. 

* OPTIONAL:
* 1. Select submit form button element inside dialog with data-dialog-submit attribute.
* 2. Set focus on element with data-dialog-focus attribute. Default focus: first focusable element.

* EXAMPLE: 
* <button data-dialog-open="1" type="button">Open dialog</button>
* <dialog data-dialog="1">
*   <p data-dialog-focus="1"></p>
*   <form action="" method="dialog">
*     <label>
*       <input type="text"/>
*     </label>
*     <button data-dialog-submit="1" type="submit">Submit</button>
*     <button data-dialog-close="1" type="reset">Close</button>   
*   </form>
* </dialog>
*/

const openButtonsArr = document.querySelectorAll('[data-dialog-open]')
const activeDialogs = []
const activeBackdrops = []
const topLevelOpenButtons = []
let topLevelDialog
let topLevelBackdrop
let topLevelOpenBtn

document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeDialog()
    topLevelOpenBtn.focus()
    topLevelOpenButtons.pop()
    topLevelOpenBtn = topLevelOpenButtons.at(-1)
  }
})

// add dialog label
export function dialog() {
  openButtonsArr.forEach(openBtnEl => {
    const openButtonElAttrValue = openBtnEl.dataset.dialogOpen
    const dialogEl = document.querySelector(`[data-dialog="${openButtonElAttrValue}"]`)
    const submitBtnEl = document.querySelector(`[data-dialog-submit="${openButtonElAttrValue}"]`)
    const closeButtonsArr = document.querySelectorAll(`[data-dialog-close="${openButtonElAttrValue}"]`)

    const createBackdrop = document.createElement('div')
    createBackdrop.classList.add('dialog-backdrop')
    dialogEl.before(createBackdrop)
    const backdrop = dialogEl.previousElementSibling
    backdrop.addEventListener('click', closeDialog)

    openBtnEl.addEventListener('click', () => {
      dialogEl.classList.add('active')
      backdrop.classList.add('active')

      topLevelOpenButtons.push(openBtnEl)
      topLevelOpenBtn = topLevelOpenButtons.at(-1)
      activeDialogs.push(dialogEl)
      topLevelDialog = activeDialogs.at(-1)
      activeBackdrops.push(backdrop)
      topLevelBackdrop = activeBackdrops.at(-1)
    })

    closeButtonsArr.forEach(closeBtnEl => {
      closeBtnEl.addEventListener('click', closeDialog)
      closeBtnEl.addEventListener('keydown', e => setFocus(openBtnEl, e))
    })

    if (submitBtnEl)
      submitBtnEl.addEventListener('click', () => {
        // add submit button functionality here
      })

    /* ====================   A11Y   ==================== */

    const manualFocusEl = document.querySelector(`[data-dialog-focus="${openButtonElAttrValue}"]`)
    const focusableElArr = Array.from(
      dialogEl.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    )

    const firstFocusableEl = focusableElArr.at(0)
    const lastFocusableEl = focusableElArr.at(-1)

    dialogEl.setAttribute('role', 'dialog')
    dialogEl.setAttribute('aria-modal', 'true')

    if (manualFocusEl) openBtnEl.addEventListener('keydown', e => setFocus(manualFocusEl, e))
    if (!manualFocusEl) openBtnEl.addEventListener('keydown', e => setFocus(firstFocusableEl, e))

    focusTrap()

    /* ====================   FUNCTIONS   ==================== */

    function setFocus(focusableElement, e) {
      if (e.code === 'Enter' || e.code === 'Space')
        dialogEl.addEventListener('transitionend', () => focusableElement.focus(), { once: true })
    }

    function focusTrap() {
      firstFocusableEl.addEventListener('keydown', e => {
        if (e.code === 'Tab' && e.shiftKey && document.activeElement === firstFocusableEl) {
          e.preventDefault()
          lastFocusableEl.focus()
        }
      })

      lastFocusableEl.addEventListener('keydown', e => {
        if (e.code === 'Tab' && !e.shiftKey && document.activeElement === lastFocusableEl) {
          e.preventDefault()
          firstFocusableEl.focus()
        }
      })
    }
  })
}

function closeDialog() {
  if (activeDialogs.length === 0 || activeBackdrops.length === 0) return

  topLevelDialog.classList.remove('active')
  topLevelBackdrop.classList.remove('active')

  activeDialogs.pop()
  topLevelDialog = activeDialogs.at(-1)
  activeBackdrops.pop()
  topLevelBackdrop = activeBackdrops.at(-1)
}
