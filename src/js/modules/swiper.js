import Swiper, {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  A11y,
} from 'swiper';

const swiperShop = new Swiper('.swiper.swiper-shop', {
  modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],
  pagination: {
    el: '.swiper-pagination-shop',
    clickable: true,
  },
  loop: true,

  a11y: true,

  autoplay: {
    delay: 6000,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right-shop',
    prevEl: '.swiper-btn--left-shop',
  },

  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >=  575.98px
    575.98: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 10,
      speed: 500,
    },

    // when window width is >= 767.98px
    1199.98: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,
      speed: 2000,
    },
  },

  direction: 'horizontal',

  pagination: {
    el: '.swiper-pagination-shop',
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});

const swiperTestimonials = new Swiper('.swiper.swiper-testimonials', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],
  // Optional parameters
  direction: 'horizontal',
  grabCursor: true,
  loop: true,

  autoplay: {
    delay: 6000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-testimonials',
    clickable: true,
  },

  // Responsive breakpoints
  breakpoints: {
    1199.98: {
      speed: 1000,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn--right-testimonials',
    prevEl: '.swiper-btn--left-testimonials',
  },

  keyboard: {
    enabled: true,
    onlyVisible: true,
    pageUpDown: true,
  },
});

/* ====================   INTERSECTION OBSERVERS ==================== */

const swiperShopEl = document.querySelector('.swiper-shop');
const swiperTestimonialsEl = document.querySelector('.swiper-testimonials');

const shopObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.isIntersecting
        ? swiperShop.autoplay.start()
        : swiperShop.autoplay.stop();
    }),
  {
    threshold: 0.75,
  }
);

if (swiperShopEl) shopObserver.observe(swiperShopEl);

const testimonialsObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.isIntersecting
        ? swiperTestimonials.autoplay.start()
        : swiperTestimonials.autoplay.stop();
    }),
  {
    threshold: 0.75,
  }
);

if (swiperTestimonialsEl) testimonialsObserver.observe(swiperTestimonialsEl);
