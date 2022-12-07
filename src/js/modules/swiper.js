import Swiper, { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper'

const swiper = new Swiper('[data-swiper]', {
	modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],
	direction: 'horizontal',
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
		nextEl: '[data-swiper-next]', // next button selector
		prevEl: '[data-swiper-prev]', // prev button selector
		disabledClass: 'swiper__button_disabled',
	},

	// responsive breakpoints 576 768 992 1200
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 30,
	breakpoints: {
		576: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			speed: 500,
		},

		992: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			speed: 800,
		},

		1200: {
			slidesPerView: 4,
			slidesPerGroup: 4,
			speed: 2000,
		},
	},

	keyboard: {
		enabled: true,
		onlyVisible: true,
		pageUpDown: true,
	},
})

/* ====================   ONLY VISIBLE AUTOPLAY ==================== */
// TODO 

const autoplayObserver = new IntersectionObserver(
	entries =>
		entries.forEach(entry => {
			entry.isIntersecting ? swiper.autoplay.start() : swiper.autoplay.stop()
		}),
	{
		threshold: 0.75,
	}
)


