const details = document.querySelectorAll('details')
const themeTogle = document.querySelector('.theme-toggle')
details.forEach((el) => {
  summary = el.querySelector('summary')
  summary.addEventListener('click', () => {
    console.log(el.hasAttribute('open'))
    if (!el.hasAttribute('open')) {
      el.classList.add('open')
    } else {
      el.classList.remove('open')
    }
  })
})

themeTogle.addEventListener('click', () => {
  console.log('ok!')
  document.body.classList.toggle('light')
  document.body.classList.toggle('dark')
})