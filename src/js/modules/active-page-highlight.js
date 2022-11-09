/*
* 1. Select navigation link container with data-page attribute. 
* 2. Class active-page will be added to that element. Use it for CSS styling.

* EXAMPLE: 
* <li data-nav-page>
*   <a href="portfolio.html">Portfolio</a>
* </li>
*/

const pagesArr = document.querySelectorAll('[data-nav-page]')
const currentPage = window.location.href

export function activePageHighlight() {
  pagesArr.forEach(page => {
    const pageLinkEl = page.querySelector('a')
    if (currentPage === pageLinkEl.href) {
      page.classList.add('active-page')
      pageLinkEl.setAttribute('aria-current', 'page')
    }
  })
}
