/** 
* 1. Select button/s that opens dialog with DATA-DIALOG-OPEN attribute.
* 2. Select dialog with DATA-DIALOG attribute.
* 3. For multiple dialogs button/s and dialog data attributes should have identical unique attribute value. For single dialog you can leave blank attribute value.
* 4. Select button/s inside dialog that closes dialog with DATA-DIALOG-CLOSE attribute.

* OPTIONAL:
* 1. Use DATA-DIALOG-LABEL and/or DATA-DIALOG-DESC attributes on element for all needed aria-labelledby and aria-describedby functionality. 
* 2. Set focus on ANY element with DATA-DIALOG-FOCUS attribute. Default focus: first focusable element.
* 3. Select submit form button element inside dialog with DATA-DIALOG-SUBMIT attribute, add functionality in javascript.

* EXAMPLE: 
* <button data-dialog-open="two" type="button">Open dialog</button>
* <div data-dialog="two">
*   <p data-dialog-focus data-dialog-label>Dialog title</p>
*   <p data-dialog-desc>This is dialog example</p>
*   <button data-dialog-submit type="submit">Submit</button>
*   <button data-dialog-close type="button">Close</button>   
* </div>
*/

const openButtonsArr = document.querySelectorAll('[data-dialog-open]')
const activeDialogs = []
const activeBackdrops = []
const topLevelOpenButtons = []
let topLevelDialog
let topLevelBackdrop
let topLevelOpenbutton

document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeDialog()
    topLevelOpenbutton.focus()
    topLevelOpenButtons.pop()
    topLevelOpenbutton = topLevelOpenButtons.at(-1)
  }
})

// add dialog label
export function dialog() {
  openButtonsArr.forEach(openbuttonEl => {
    const openButtonElAttrValue = openbuttonEl.dataset.dialogOpen
    const dialogEl = document.querySelector(`[data-dialog="${openButtonElAttrValue}"]`)
    const submitbuttonEl = dialogEl.querySelector(`[data-dialog-submit]`)
    const closeButtonsArr = dialogEl.querySelectorAll(`[data-dialog-close]`)
    const labelEl = dialogEl.querySelector(`[data-dialog-label]`)
    const descEl = dialogEl.querySelector(`[data-dialog-desc]`)
    const manualFocusEl = dialogEl.querySelector(`[data-dialog-focus]`)
    const focusableElArr = Array.from(
      dialogEl.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    )
    const firstFocusableEl = focusableElArr.at(0)
    const lastFocusableEl = focusableElArr.at(-1)

    const createBackdrop = document.createElement('div')
    createBackdrop.classList.add('dialog-backdrop')
    dialogEl.before(createBackdrop)
    const backdrop = dialogEl.previousElementSibling
    backdrop.addEventListener('click', closeDialog)

    openbuttonEl.addEventListener('click', () => {
      topLevelOpenButtons.push(openbuttonEl)
      topLevelOpenbutton = topLevelOpenButtons.at(-1)

      activeDialogs.push(dialogEl)
      topLevelDialog = activeDialogs.at(-1)
      topLevelDialog.classList.add('active')

      activeBackdrops.push(backdrop)
      topLevelBackdrop = activeBackdrops.at(-1)
      topLevelBackdrop.classList.add('active')

      if (manualFocusEl) dialogEl.addEventListener('transitionend', () => manualFocusEl.focus(), { once: true })
    })

    closeButtonsArr.forEach(closebuttonEl => {
      closebuttonEl.addEventListener('click', () => {
        closeDialog()
        topLevelOpenbutton.focus()
        topLevelOpenButtons.pop()
        topLevelOpenbutton = topLevelOpenButtons.at(-1)
      })
    })

    if (submitbuttonEl)
      submitbuttonEl.addEventListener('click', () => {
        // add submit button functionality here
      })

    /* ====================   A11Y   ==================== */

    // aria
    dialogEl.setAttribute('role', 'dialog')
    dialogEl.setAttribute('aria-modal', 'true')

    if (labelEl) {
      const labelElId = `dialog-label${openButtonElAttrValue}`
      labelEl.id = labelElId
      dialogEl.setAttribute('aria-labelledby', labelElId)
    }

    if (descEl) {
      const descElId = `dialog-desc${openButtonElAttrValue}`
      descEl.id = descElId
      dialogEl.setAttribute('aria-describedby', descElId)
    }

    // focus

    if (!manualFocusEl) openbuttonEl.addEventListener('keydown', e => setFocus(firstFocusableEl, e))

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
