import { disablePageScroll, enablePageScroll } from 'scroll-lock'

/* 
* 1. Select button(can be more than one) that opens dialog element with data-dialog-btn-open attribute.
* 2. Select dialog element with data-dialog attribute.
* 3. Select button(can be more than one) that closes dialog element with data-dialog-btn-close attribute.
* 4. All elements among dialog instance selected with data attributes should have same unique attribute value. This will allow to distinguish multiple different dialog instances. See example below. 

* OPTIONAL:
* 1. Select submit form button element inside dialog with data-dialog-btn-submit attribute.
* 2. Set focus on element with data-dialog-focus attribute. Default focus: first focusable element.

* EXAMPLE: 
* <button data-dialog-btn-open="1" type="button">Open dialog</button>
* <dialog data-dialog="1">
*   <p data-dialog-focus="1"></p>
*   <form action="" method="dialog">
*     <label>
*       <input type="text"/>
*     </label>
*     <button data-dialog-btn-submit="1" type="submit">Submit</button>
*     <button data-dialog-btn-close="1" type="reset">Close</button>   
*   </form>
* </dialog>
*/

const openButtonsArr = document.querySelectorAll('[data-dialog-btn-open]')

export function dialog() {
  openButtonsArr.forEach(openBtnEl => {
    const openButtonElAttrValue = openBtnEl.dataset.dialogBtnOpen
    const dialogEl = document.querySelector(`[data-dialog="${openButtonElAttrValue}"]`)
    const submitBtnEl = document.querySelector(`[data-dialog-btn-submit="${openButtonElAttrValue}"]`)
    const closeButtonsArr = document.querySelectorAll(`[data-dialog-btn-close="${openButtonElAttrValue}"]`)
    const manualFocusEl = document.querySelector(`[data-dialog-focus="${openButtonElAttrValue}"]`)

    const focusableElements = Array.from(
      dialogEl.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    )

    const firstFocusableEl = focusableElements.at(0)
    const lastFocusableEl = focusableElements.at(-1)

    dialogEl.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        e.preventDefault()
        closeDialog()
      }

      if (e.code === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusableEl) {
          e.preventDefault()
          lastFocusableEl.focus()
        }

        if (!e.shiftKey && document.activeElement === lastFocusableEl) {
          e.preventDefault()
          firstFocusableEl.focus()
        }
      }
    })

    openBtnEl.addEventListener('click', () => {
      dialogEl.showModal()
      dialogEl.classList.add('fade-in')
      disablePageScroll(dialogEl)

      if (manualFocusEl) {
        manualFocusEl.setAttribute('tabindex', '-1')
        manualFocusEl.focus()
      }
    })

    dialogEl.addEventListener('close', () => {
      dialogEl.classList.remove('fade-in')
      dialogEl.setAttribute('aria-hidden', 'true')
      enablePageScroll(dialogEl)
    })

    closeButtonsArr.forEach(closeBtnEl => closeBtnEl.addEventListener('click', closeDialog))

    if (submitBtnEl) submitBtnEl.addEventListener('click', () => {
      // add submit button functionality here
    })

    dialogEl.addEventListener('click', event => {
      if (event.target.nodeName === 'DIALOG') closeDialog()
    })

    function closeDialog() {
      dialogEl.classList.add('fade-out')
      dialogEl.addEventListener(
        'animationend',
        () => {
          dialogEl.classList.remove('fade-out')
          dialogEl.close()
        },
        { once: true }
      )
    }
  })
}
