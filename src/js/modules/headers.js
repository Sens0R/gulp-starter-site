import Headroom from 'headroom.js'

export function headroom() {
  var header = document.querySelector('.header-sticky-wrapper')
  //header.classList.add('slide-down')
  const headroom = new Headroom(header, {
    offset: {
      up: 0,
      down: 0,
    },
    tolerance: {
      up: 10,
      down: 0,
    },
    // css classes to apply
    classes: {
      // when element is initialized
      initial: 'headroom',
      // when scrolling up
      pinned: 'headroom_pinned',
      // when scrolling down
      unpinned: 'headroom_unpinned',
      // when above offset
      top: 'headroom_top',
      // when below offset
      notTop: 'headroom_not-top',
      // when at bottom of scroll area
      bottom: 'headroom_bottom',
      // when not at bottom of scroll area
      notBottom: 'headroom_not-bottom',
      // when frozen method has been called
      frozen: 'headroom_frozen',
    },
  })

  headroom.init()
}

export function fixedHeader() {
  const header = document.querySelector('header')

  document.addEventListener('scroll', () => {
    if (scrollY === 0) return header.classList.remove('header-top')

    header.classList.add('header-top')
  })
}
