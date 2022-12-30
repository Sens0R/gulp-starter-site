/*
* 1. Select navigation link container with data-page attribute. 

* EXAMPLE: 
* <a data-nav-page href="portfolio.html">Portfolio</a>
*/

const pagesArr = document.querySelectorAll('[data-nav-page]')
const currentPage = window.location.href

export function activePageHighlight() {
	pagesArr.forEach(page => {
		if (currentPage === page.href) {
			page.setAttribute('aria-current', 'page')
		}
	})
}
