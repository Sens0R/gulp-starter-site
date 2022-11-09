import './modules/swiper.js'
import 'particles.js'
//import { notification } from './modules/notification.js'
import { headroom } from './modules/headers.js'
import { accordion } from './modules/accordion.js'
import { tabs } from './modules/tabs.js'
import { activePageHighlight } from './modules/active-page-highlight.js'
import { dropdown } from './modules/dropdown.js'
import { hamburger } from './modules/hamburger.js'
import { animateOnScroll } from './modules/animate-on-scroll.js'
import { search } from './modules/search.js'
import { tooltip } from './modules/tooltip.js'
import { xl } from './modules/breakpoints.js'
import { dialog } from './modules/dialog.js'

if (document.location.pathname === '/' || document.location.pathname.indexOf('index') > -1) {
  particlesJS('banner__particles', {
    particles: {
      number: {
        value: 15,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#348acc',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
        polygon: {
          nb_sides: 3,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.6,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 300,
        color: '#348acc',
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'bottom',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 0.9,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
}

activePageHighlight()

animateOnScroll()

headroom()

hamburger()

dropdown()

search()

tooltip()

tabs()

accordion()

dialog()