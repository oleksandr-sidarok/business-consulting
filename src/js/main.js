const projectSliderElement = document.querySelector('.project-slider')
const teamSliderElement = document.querySelector('.team__slider')
const projectSliderWrapper = projectSliderElement.querySelector('.swiper-wrapper')
const teamSliderWrapper = teamSliderElement.querySelector('.swiper-wrapper')

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

const teamSliderSettings = {
  direction: 'horizontal',
  loop: false,
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
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
}

const growthSlider = new Swiper('.growth-rates__slider', growthSliderSettings);

const teamSlider = new Swiper('.team__slider', teamSliderSettings);

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