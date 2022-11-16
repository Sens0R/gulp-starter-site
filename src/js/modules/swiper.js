import Swiper, { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper'

const swiperShop = new Swiper('.slider', {
  modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],

  pagination: {
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'slider__bullet_active',
    el: '.slider__pagination',
    clickable: true,
  },

  //loop: true,
  a11y: true,

  autoplay: {
    delay: 6000,
  },

  navigation: {
    nextEl: '.slider__btn_next',
    prevEl: '.slider__btn_prev',
    disabledClass: 'slider__btn_disabled',
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

  direction: 'horizontal',

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
})

/* ====================   INTERSECTION OBSERVERS ==================== */

const swiperElArr = document.querySelectorAll('.swiper')

const shopObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      entry.isIntersecting ? swiperShop.autoplay.start() : swiperShop.autoplay.stop()
    }),
  {
    threshold: 0.75,
  }
)

swiperElArr.forEach(swiperEl => {
  if (swiperEl) shopObserver.observe(swiperEl)
})
