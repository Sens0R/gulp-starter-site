import Headroom from 'headroom.js'

export function headroom() {
	var header = document.querySelector('[data-header]')
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
			initial: 'header',
			// when scrolling up
			pinned: 'header--pinned',
			// when scrolling down
			unpinned: 'header--unpinned',
			// when above offset
			top: 'header--top',
			// when below offset
			notTop: 'header--not-top',
			// when at bottom of scroll area
			bottom: 'header--bottom',
			// when not at bottom of scroll area
			notBottom: 'header--not-bottom',
			// when frozen method has been called
			frozen: 'header--frozen',
		},
	})

	headroom.init()
}

