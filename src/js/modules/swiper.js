import Swiper, { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper'

const swiper = new Swiper('[data-swiper]', {
  modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],
  direction: 'horizontal',
  //loop: true,
  a11y: true,
  autoplay: {
    delay: 6000,
  },

  pagination: {
    bulletClass: 'swiper__bullet',
    bulletActiveClass: 'swiper__bullet_active',
    el: '[data-swiper-pagination]', // pagination selector
    clickable: true,
  },

  navigation: {
    nextEl: '[data-swiper-next]', // next btn selector
    prevEl: '[data-swiper-prev]', // prev btn selector
    disabledClass: 'swiper__btn_disabled',
  },

  // responsive breakpoints
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    576: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
      speed: 500,
    },

    /*     768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
      speed: 800,
    }, */

    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
      speed: 800,
    },

    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,
      speed: 2000,
    },
  },
 
  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
})

/* ====================   INTERSECTION OBSERVERS ==================== */

const autoplaySwipers = document.querySelectorAll('[data-swiper-autoplay]')

const swiperAutoplayObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      entry.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop()
    }),
  {
    threshold: 0.75,
  }
)

autoplaySwipers.forEach(swiperInstance => {
  if (swiperInstance) swiperAutoplayObserver.observe(swiperInstance)
})
