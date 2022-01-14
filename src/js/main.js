const projectSliderElement = document.querySelector('.project-slider')
const projectSliderWrpper = projectSliderElement.querySelector('.swiper-wrapper')
console.log(projectSliderElement)
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
  slidesPerView: 4,
  spaceBetween: 30,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
}

const projectSlider = new Swiper('.project-slider', projectSliderSettings);
const growthSlider = new Swiper('.growth-rates__slider', growthSliderSettings);

if (document.documentElement.clientWidth < 1140) {
  onProjectSlider(false)
}
if (document.documentElement.clientWidth > 1140) {
  onProjectSlider(true)
}

window.addEventListener('resize', () => {
  console.log('resize!')
  if (document.documentElement.clientWidth < 1140) {
    onProjectSlider(false)
  }
  if (document.documentElement.clientWidth > 1140) {
    onProjectSlider(true)
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
    projectSliderWrpper.classList.remove('swiper-wrapper')
    projectSlider.destroy(true, true)
  } else {
    projectSliderWrpper.classList.add('swiper-wrapper')
    projectSlider.init(projectSliderSettings)
  }
}