const projectSliderElement = document.querySelector('.project-slider')
const projectSliderWrapper = projectSliderElement.querySelector('.swiper-wrapper')
const headerElement = document.querySelector('.header')

const projectSliderSettings = {
  direction: 'horizontal',
  loop: false,
  allowTouchMove: false,
  navigation: {
    nextEl: '.project-button-next',
    prevEl: '.project-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  }
}

const growthSliderSettings = {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 4.5,
  spaceBetween: 30,
  autoHeight: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 40
    },
    1140: {
      slidesPerView: 4.5,
      spaceBetween: 30
    }
  }
}

const otherProjectsSliderSettings = {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 3,
  autoHeight: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.other-projects__button-next',
    prevEl: '.other-projects__button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.25,
      spaceBetween: 30
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 40
    },
    1140: {
      slidesPerView: 1,
      spaceBetween: 50
    }
  }
}

const teamSliderSettings = {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 4.5,
  spaceBetween: 30,
  autoHeight: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.1,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30
    },
    1140: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
}

const testimonialsSliderSettings = {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 4.5,
  spaceBetween: 30,
  autoHeight: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.25,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2.5,
      spaceBetween: 30
    },
    1140: {
      slidesPerView: 3.25,
      spaceBetween: 30
    }
  }
}

const growthSlider = new Swiper('.growth-rates__slider', growthSliderSettings);

const teamSlider = new Swiper('.team__slider', teamSliderSettings);

const testimonialsSlider = new Swiper('.testimonials__slider', testimonialsSliderSettings);

const otherProjectsSlider = new Swiper('.other-projects__slider', otherProjectsSliderSettings);

const projectSlider = new Swiper('.project-slider', projectSliderSettings);

if (document.documentElement.clientWidth < 1140) {
  onProjectSlider(false)
  onTeamSlider(true)
}
if (document.documentElement.clientWidth >= 1140) {
  onProjectSlider(true)
  onTeamSlider(false)
}

window.addEventListener('resize', () => {
  console.log('resize!')
  if (document.documentElement.clientWidth < 1140) {
    onProjectSlider(false)
    onTeamSlider(true)
  }
  if (document.documentElement.clientWidth >= 1140) {
    onProjectSlider(true)
    onTeamSlider(false)
  }
})

window.addEventListener('scroll', () => {
  let scrollPosition = window.pageYOffset
  setTimeout(() => {
    if ((scrollPosition - window.pageYOffset) > 200) {
      headerElement.classList.add('fixed')
    }
    if ((window.pageYOffset - scrollPosition) > 200) {
      headerElement.classList.remove('fixed')
    }
    if (window.pageYOffset < 100) {
      headerElement.classList.remove('fixed')
    }
  }, 200)
})

// Animation back text
const backTextArray = document.querySelectorAll('.back-text-block__line')
let padding = 0
window.addEventListener('scroll', () => {
  let scrollPosition = window.pageYOffset
  setTimeout(() => {
    if ((scrollPosition - window.pageYOffset) > 1) {
      padding -= 7
      backTextArray.forEach((element, index) => {
        if (index % 2 === 0) {
          element.style = `padding-left: ${padding}px`
        } else {
          element.style = `padding-right: ${padding}px`
        }
      })
    }
    if ((window.pageYOffset - scrollPosition) > 1) {
      padding += 7
      backTextArray.forEach((element, index) => {
        if (index % 2 === 0) {
          element.style = `padding-left: ${padding}px`
        } else {
          element.style = `padding-right: ${padding}px`
        }
      })
    }
  }, 100)
})

const details = document.querySelectorAll('details')
const themeTogle = document.querySelector('.theme-toggle')
const burgerBtn = document.querySelector('.burger')
const navList = document.querySelector('.nav__list')
const navCloseBtn = document.querySelector('.nav__close')

details.forEach((el) => {
  summary = el.querySelector('summary')
  summary.addEventListener('click', () => {
    if (!el.hasAttribute('open')) {
      el.classList.add('open')
    } else {
      el.classList.remove('open')
    }
  })
})

themeTogle.addEventListener('click', () => {
  document.body.classList.toggle('light')
  document.body.classList.toggle('dark')
})

burgerBtn.addEventListener('click', () => {
  navList.classList.remove('hiden')
})

navCloseBtn.addEventListener('click', () => {
  navList.classList.add('hiden')
})


// Scroll
const navLinksArray = document.querySelectorAll('.nav__link')

navLinksArray.forEach((navLinkElement) => {
  navLinkElement.addEventListener('click', (e) => {
    e.preventDefault()
    if (navLinkElement.dataset.goto && document.querySelector(navLinkElement.dataset.goto)) {
      const gotoBlock = document.querySelector(navLinkElement.dataset.goto)
      let gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset
      if (headerElement.classList.contains('fixed')) {
        gotoBlockValue -= headerElement.offsetHeight
      }
      window.scrollTo ({
        top: gotoBlockValue,
        behavior: "smooth"
      });
    }
  })
})

// Button coontact me
const contactButton = document.querySelector('.btn-contact')
contactButton.addEventListener('click', () => {
  window.location.href = './contact.html';
})

function onProjectSlider (bool) {
  if (!bool) {
    projectSliderWrapper.classList.remove('swiper-wrapper')
    projectSlider.destroy(true, true)
  } else {
    projectSliderWrapper.classList.add('swiper-wrapper')
    projectSlider.init(projectSliderSettings)
  }
}

function onTeamSlider (bool) {
  if (!bool) {
    teamSlider.slideTo(3, 30)
    teamSlider.disable()
  } else {
    teamSlider.slideTo(1, 30)
    teamSlider.enable()
  }
}

function onScroll (e) {
  const navLink = e.target;
  if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
      const gotoBlock = document.querySelector(navLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

      window.scrollTo ({
          top: gotoBlockValue,
          behavior: "smooth"
      });
      e.preventDefault();
  }
}