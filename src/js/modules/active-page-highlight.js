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
    if (currentPage === page.href) {
      page.classList.add('active-page')
      page.setAttribute('aria-current', 'page')
    }
  })
}
