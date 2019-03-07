const init = () => {
  renderDates()
  initiateSlideshows()
  window.addEventListener('resize', function (event) {
    resize()
  })
}

const resize = () => {
  const slideshows = document.querySelectorAll('.slideshow')

  slideshows.forEach(slideshow => {
    const width = slideshow.offsetWidth
    setSlideshowAspect(slideshow, (16 / 9))
    const slider = slideshow.children[0]
    const children = [].slice.call(slider.children)

    slider.style.width = width * children.length + 'px'
    children.forEach(child => {
      child.style.width = width + 'px'
    })
  })
}

const renderDates = () => {
  const dates = [
    { day: 'Måndag', from: '9:00', to: '17:30' },
    { day: 'Tisdag', from: '7:30', to: '11:00' },
    { day: 'Onsdag', from: '9:00', to: '17:30' },
    { day: 'Torsdag', from: '7:30', to: '11:00' },
    { day: 'Fredag', from: '', to: '' }
  ]

  const today = new Date().getDay() - 1

  const renderDate = (target) => {
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i]
      const element = document.createElement('p')
      if (date.from === '') {
        element.textContent = date.day + ': stängt'
      } else {
        element.textContent = date.day + ': ' + date.from + '-' + date.to
      }
      if (i === today) {
        element.style.backgroundColor = '#668198'
        element.style.color = '#fff'
      }
      target.appendChild(element)
    }
  }

  const targets = document.querySelectorAll('.openingHours')
  targets.forEach(target => { renderDate(target) })
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const setSlideshowAspect = (slideshow, aspect) => {
  slideshow.style.height = slideshow.offsetWidth / aspect + 'px'
}

const initiateSlideshows = () => {
  const parentWidth = document.querySelector('.slideshow').scrollWidth
  const populateSlideshow = (slideshow) => {
    const slider = slideshow.children[0]
    let width = 0
    const children = [].slice.call(slider.children)
    children.forEach((node) => {
      width += 1
      node.style.backgroundImage = 'url(' + node.dataset.image + ')'
      node.style.width = parentWidth + 'px'
    })
    slider.style.width = parentWidth * width + 'px'
  }

  const populateButtons = (slideshow) => {
    const container = document.createElement('div')
    container.classList.add('dotContainer')
    const id = guid()
    for (let i = 0; i < slideshow.children[0].children.length; i++) {
      const bullet = document.createElement('input')
      bullet.type = 'radio'
      bullet.name = id
      if (i === 0) {
        bullet.checked = true
      }
      bullet.addEventListener('click', () => {
        goToSlide(slideshow, i)
      })
      container.appendChild(bullet)
    }
    slideshow.appendChild(container)
  }

  const slideshows = document.querySelectorAll('.slideshow')
  slideshows.forEach((slideshow) => {
    setSlideshowAspect(slideshow, (16 / 9))
    populateSlideshow(slideshow)
    populateButtons(slideshow)
  })
  repeatSlideshows(slideshows)
}

const goToSlide = (slideshow, number) => {
  const width = slideshow.offsetWidth
  const fullWidth = width * slideshow.children[0].children.length

  slideshow.children[0].style.transform = 'translateX(' + -(number * width / fullWidth) * 100 + '%)'
}

const repeatSlideshows = (slideshows) => {
  slideshows.forEach((slideshow) => {
    const children = [].slice.call(slideshow.children[1].children)
    let current
    for (let i = 0; i < children.length; i++) {
      const element = children[i]
      if (element.checked) {
        current = i
      }
    }
    current += 1
    if (current === children.length) { current = 0 }
    children[current].click()
  })
  window.setTimeout(function () { repeatSlideshows(slideshows) }, 4000)
}

const sendEmail = () => {
  const name = document.querySelector('#name').value
  const phone = document.querySelector('#phone').value
  const msg = document.querySelector('#msg').value
  let endString = ''
  if (name) {
    endString = 'Med vänliga hälsningar ' + name
    if (phone) {
      endString += ' ' + phone
    }
  }
  window.location.href = 'mailto:rosendahl@telia.se?subject=' + '' + '&body=' + msg + '%0D%0A %0D%0A' + endString
}