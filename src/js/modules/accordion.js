/*
* 1. Select accordion container element with data-accordion attribute. 
* 2. If you have multiple accordions add any unique value to data-accordion attribute. Example: data-accordion="two", data-accordion="secondary". Value is used for accordion headers and corresponding panels ID's. 
* 3. Select accordion header element by adding data-accordion-button attribute.
* 4. Select corresponding content (accordion panel) by adding data-accordion-content attribute.
* 5. Active accordion button (accordion header) and corresponding content (accordion panel) have 'active' class for CSS styling.

* EXAMPLE: 
* <div data-accordion="faq" class="accordion">
*   <div class="accordion__item">
*     <h2 class="accordion__header">
*       <button data-accordion-button class="accordion__button "type="button"> Accordion header-button       
*         <svg aria-hidden="true" class="accordion__icon">
*           <use href="images/icons/sprite-mono.svg#arrow"></use>
*         </svg>         
*       </button>
*     </h2>
*     <section data-accordion-content class="accordion__content">       
*     </section>
*   </div>
* </div>
*/

const accordionsArr = document.querySelectorAll('[data-accordion]')

window.matchMedia('(orientation: landscape)').onchange = () => {
  accordionsArr.forEach(accordion => {
    const activeContentsArr = accordion.querySelectorAll('[data-accordion-content].active')
    activeContentsArr.forEach(activeContent => (activeContent.style.maxHeight = `${activeContent.scrollHeight}px`))
  })
}

export function accordion() {
  accordionsArr.forEach(accordion => {
    const buttonsArr = accordion.querySelectorAll('[data-accordion-button]')
    const contentsArr = accordion.querySelectorAll('[data-accordion-content]')
    const accordionAttrValue = accordion.dataset.accordion

    buttonsArr.forEach((button, buttonNum) => {
      const firstButton = buttonsArr[0]
      const lastButton = buttonsArr[buttonsArr.length - 1]
      const nextButton = buttonsArr[buttonNum + 1]
      const prevButton = buttonsArr[buttonNum - 1]

      button.id = `accordion-${accordionAttrValue}-header-${buttonNum + 1}`
      button.setAttribute('aria-controls', `accordion-${accordionAttrValue}-panel-${buttonNum + 1}`)
      button.setAttribute('aria-expanded', 'false')

      const content = contentsArr[buttonNum]
      content.id = `accordion-${accordionAttrValue}-panel-${buttonNum + 1}`
      content.setAttribute('aria-labelledby', `${button.id}`)

      button.addEventListener('click', toggler)
      button.addEventListener('keydown', e => {
        if (e.code === 'Home') {
          e.preventDefault()
          if (firstButton) firstButton.focus()
        }

        if (e.code === 'End') {
          e.preventDefault()
          if (lastButton) lastButton.focus()
        }

        if (e.code === 'ArrowDown') {
          e.preventDefault()
          if (!nextButton) return firstButton.focus()
          nextButton.focus()
        }

        if (e.code === 'ArrowUp') {
          e.preventDefault()
          if (!prevButton) return lastButton.focus()
          prevButton.focus()
        }
      })

      function toggler() {
        if (button.classList.contains('active')) {
          button.classList.remove('active')
          button.setAttribute('aria-expanded', 'false')
          content.classList.remove('active')
          content.style.maxHeight = null
          return
        }

        button.classList.add('active')
        button.setAttribute('aria-expanded', 'true')
        content.classList.add('active')
        content.style.maxHeight = `${content.scrollHeight}px`
      }
    })
  })
}
