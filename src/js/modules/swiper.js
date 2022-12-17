import Swiper, { Navigation, Pagination, Keyboard, Autoplay, A11y } from 'swiper'

const swiper = new Swiper('[data-swiper]', {
	modules: [Navigation, Pagination, Keyboard, Autoplay, A11y],
	direction: 'horizontal',
	a11y: true,

	autoplay: {
		delay: 6000,
	},

	keyboard: {
		enabled: true,
		onlyVisible: true,
		pageUpDown: true,
	},

	pagination: {
		el: '[data-swiper-pagination]',
		clickable: true,
	},

	navigation: {
		nextEl: '[data-swiper-next]',
		prevEl: '[data-swiper-prev]',
	},

	// responsive breakpoints 	sm: 640px, md: 768px, lg: 1024px, xl: 1280px, xxl: 1536px
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 30,
	breakpoints: {
		640: {
			slidesPerView: 2,
			slidesPerGroup: 2,
		},

		1024: {
			slidesPerView: 3,
			slidesPerGroup: 3,
		},

		1280: {
			slidesPerView: 4,
			slidesPerGroup: 4,
		},
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
