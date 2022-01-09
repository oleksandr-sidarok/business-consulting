const details = document.querySelectorAll('details')
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