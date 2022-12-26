/* 
* 1. Select tab container element (tabbed interface) with data-tabs attribute.
* 2. If you have multiple tabbed interfaces add any unique value to data-tabs attribute. Example: data-tabs="two", data-tabs="secondary". Value is used for tab and corresponding tablist ID's. 
* 3. Select element that holds tabs (tablist) by adding role="tablist" attribute. Tabs in tablist element should have html button tag.
* 4. Select elements that contain the corresponding content (tabpanel) by adding role="tabpanel" attribute.
* 5. Activate one tab and corresponding content (tabpanel) to that tab by adding active class.
* 6. Active tab and corresponding content (tabpanel) have 'active' class for CSS styling.

*  OPTIONAL A11Y IMPROVEMENTS:
* 1. Add data-tashadow-manual attribute to tab container element (tabbed interface) if you need manual tab selection (activating tab with * enter or space key). Default behavior: tab is automatically selected when receives focus.
* 2. Add aria-orientation="vertical" attribute to tab container element (tabbed interface) if you have vertically ordered tabs in tablist. This will change tab keyboard selection to ArrowUp and ArrowDown. Default behavior: ArrowLeft and ArrowRight. 

* EXAMPLE: 
* <div data-tabs>
*   <div role="tablist">
*    <button class="active"></button>
*     <button></button>
*   </div>
*   <div role="tabpanel" class="active"></div>
*   <div role="tabpanel"></div>
* </div> 
*/

const tabbedInterfacesArr = document.querySelectorAll('[data-tabs]')

export function tabs() {
  tabbedInterfacesArr.forEach(tabbedInterface => {
    const tabbedInterfaceAttrValue = tabbedInterface.dataset.tabs
    const tablistEl = tabbedInterface.querySelector('[role="tablist"]')
    const tablistArr = Array.from(tablistEl.querySelectorAll('button'))
    const tabPanelsArr = tabbedInterface.querySelectorAll('[role="tabpanel"')

    const firstTabEl = tablistArr.at(0)
    const lastTabEl = tablistArr.at(-1)

    const interfaceIsManual = tabbedInterface.hasAttribute('data-tashadow-manual')
    const tablistIsVertical = tabbedInterface.hasAttribute('aria-orientation', 'vertical')

    tabPanelsArr.forEach((tabPanel, tabPanelNum) => {
      tabPanel.id = `tabpanel-${tabbedInterfaceAttrValue}-${tabPanelNum + 1}`
      tabPanel.setAttribute('aria-labelledby', `tab-${tabbedInterfaceAttrValue}-${tabPanelNum + 1}`)
      tabPanel.setAttribute('tabindex', '0')
    })

    tablistArr.forEach((tab, tabNum) => {
      const nextTabEl = tab.nextElementSibling
      const prevTabEl = tab.previousElementSibling

      tab.id = `tab-${tabbedInterfaceAttrValue}-${tabNum + 1}`
      tab.setAttribute('aria-controls', `tabpanel-${tabbedInterfaceAttrValue}-${tabNum + 1}`)
      tab.setAttribute('role', 'tab')

      if (!tab.classList.contains('active')) {
        tab.setAttribute('aria-selected', 'false')
        tab.setAttribute('tabindex', '-1')
      } else tab.setAttribute('aria-selected', 'true')

      tab.addEventListener('click', () => {
        tabPanelsArr.forEach(tabPanel => tabPanel.classList.remove('active'))

        tablistArr.forEach(tab => {
          tab.setAttribute('aria-selected', 'false')
          tab.setAttribute('tabindex', '-1')
          tab.classList.remove('active')
        })

        tab.classList.add('active')
        tab.setAttribute('aria-selected', 'true')
        tab.removeAttribute('tabindex')

        const connectedTabPanelId = tab.getAttribute('aria-controls')
        const connectedTabPanelEl = document.getElementById(connectedTabPanelId)
        connectedTabPanelEl.classList.add('active')
      })

      tab.addEventListener('keydown', e => {
        if (e.code === 'Home') {
          e.preventDefault()
          activateTab(firstTabEl)
        }

        if (e.code === 'End') {
          e.preventDefault()
          activateTab(lastTabEl)
        }

        if (!tablistIsVertical) {
          if (e.code === 'ArrowRight') nextTab()
          if (e.code === 'ArrowLeft') prevTab()
          return
        }

        if (e.code === 'ArrowDown') {
          e.preventDefault()
          nextTab()
        }

        if (e.code === 'ArrowUp') {
          e.preventDefault()
          prevTab()
        }
      })

      function nextTab() {
        if (nextTabEl && interfaceIsManual) return nextTabEl.focus()
        if (!nextTabEl && interfaceIsManual) return firstTabEl.focus()
        if (nextTabEl) return activateTab(nextTabEl)
        activateTab(firstTabEl)
      }

      function prevTab() {
        if (prevTabEl && interfaceIsManual) return prevTabEl.focus()
        if (!prevTabEl && interfaceIsManual) return lastTabEl.focus()
        if (prevTabEl) return activateTab(prevTabEl)
        activateTab(lastTabEl)
      }
    })
  })
}

function activateTab(tabElement) {
  tabElement.focus()
  tabElement.click()
}
