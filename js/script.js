document.addEventListener("DOMContentLoaded", () => {

    // const observer = lozad();
    // observer.observe();

    const steps = [
        {
            img: 'img/index/steps/img1.png',
            title: '01',
            subtitle: 'Разработаем уникальный продающий сайт'
        },
        {
            img: 'img/index/steps/img1.png',
            title: '02',
            subtitle: 'Второй текст'
        },
        {
            img: 'img/index/steps/img1.png',
            title: '03',
            subtitle: 'Третий текст'
        },
        {
            img: 'img/index/steps/img1.png',
            title: '04',
            subtitle: 'Четвёртый текст'
        },
        {
            img: 'img/index/steps/img1.png',
            title: '05',
            subtitle: 'Пятый текст'
        },
        {
            img: 'img/index/steps/img1.png',
            title: '06',
            subtitle: 'Шестой текст'
        }
    ]

    function sliderSteps(steps, containerSelector, btnPrevSelector, btnNextSelector) {
        const container = document.querySelector(containerSelector)
        const btnPrev = document.querySelector(btnPrevSelector)
        const btnNext = document.querySelector(btnNextSelector)
        let classes = [
          'steps__card--active',
          'steps__card--right',
          'steps__card--right-1',
          'steps__card--left-1',
          'steps__card--left',
        ]
        const cards = []
        if (steps.length < classes.length) {
            classes.splice(3,1)
            classes.splice(steps.length)
        }
        classes.forEach((cl, clIndex) => {
            const card = document.createElement('div')
            card.classList.add('steps__card')
            card.classList.add(cl)
            card.innerHTML =
                `
                    <div class="steps__card__screen">
                        <img class="steps__card__img" src="${clIndex === 3 ? steps[steps.length - 2].img : clIndex === 4 ? steps[steps.length - 1].img : steps[clIndex].img}" alt="step">
                    </div>
                    <div class="steps__card__lines">
                        <div class="steps__card__line"></div>
                        <div class="steps__card__line"></div>
                    </div>
                    <div class="steps__card__text">
                        <p class="steps__card__title">${clIndex === 3 ? steps[steps.length - 2].title : clIndex === 4 ? steps[steps.length - 1].title : steps[clIndex].title}</p>
                        <p class="steps__card__subtitle">${clIndex === 3 ? steps[steps.length - 2].subtitle : clIndex === 4 ? steps[steps.length - 1].subtitle : steps[clIndex].subtitle}</p>
                    </div>
                `
            container.appendChild(card)
            cards.push(card)
        })

        btnNext.addEventListener('click', () => {
            classes = classes.splice(-1).reverse().concat(classes)
            steps = steps.concat(steps.splice(0, 1))
            cards.forEach((card, cardIndex) => {
                classes.forEach(el => {
                    card.classList.remove(el)
                })
                card.classList.add(classes[cardIndex])
                card.querySelector('img').src = steps[cardIndex].img
                card.querySelector('.steps__card__title').textContent = `${steps[cardIndex].title}`
                card.querySelector('img').src = steps[cardIndex].img
            })
            console.log(steps)
        })
        btnPrev.addEventListener('click', () => {
            classes = classes.splice(-1).reverse().concat(classes)
            cards.forEach((card, cardIndex) => {
                classes.forEach(el => {
                    card.classList.remove(el)
                })
                card.classList.add(classes[cardIndex])
            })
        })
    }
    sliderSteps(steps, '.steps__field', '.steps__arrow--prev', '.steps__arrow--next')

})