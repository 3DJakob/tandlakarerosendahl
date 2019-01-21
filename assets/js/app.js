const init = () => {
    renderDates()
}

const renderDates = () => {
    const dates = [
      { day: 'Måndag', from: '8:00', to: '17:00' },
      { day: 'Tisdag', from: '8:00', to: '16:00' },
      { day: 'Onsdag', from: '8:00', to: '16:00' },
      { day: 'Torsdag', from: '8:00', to: '12:00' },
      { day: 'Fredag', from: '8:00', to: '12:00' }
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