document.addEventListener("DOMContentLoaded", () => {

    const observer = lozad();
    observer.observe();

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
            {
                class: 'steps__card--active',
                index: 0,
                update: function() {
                    this.data = steps[0]
                }
            },
            {
                class: 'steps__card--right',
                index: 1,
                update: function() {
                    this.data = steps[1]
                }
            },
            {
                class: 'steps__card--right-1',
                index: 2,
                update: function() {
                    this.data = steps[2]
                }
            },
            {
                class: 'steps__card--left-1',
                index: -2,
                update: function() {
                    this.data = steps[steps.length - 2]
                }
            },
            {
                class: 'steps__card--left',
                index: -1,
                update: function() {
                    this.data = steps[steps.length - 1]
                }
            }
        ]
        const cards = []
        const updateCards = () => {
            classes.forEach(cl => cl.update())
            cards.forEach((card, cardIndex) => {
                classes.forEach(el => {
                    card.classList.remove(el.class)
                })
                card.setAttribute('data-index', classes[cardIndex].index)
                card.classList.add(classes[cardIndex].class)
                card.firstElementChild.firstElementChild.src = classes[cardIndex].data.img
                card.lastElementChild.firstElementChild.textContent = classes[cardIndex].data.title
                card.lastElementChild.lastElementChild.textContent = classes[cardIndex].data.subtitle
            })
        }
        if (steps.length < classes.length) {
            classes.splice(3,1)
            classes.splice(steps.length)
        }
        classes.forEach((cl, clIndex) => {
            cl.update()
            const card = document.createElement('div')
            card.classList.add('steps__card')
            card.classList.add(cl.class)
            card.setAttribute('data-index', cl.index)
            card.innerHTML =
                `
                    <div class="steps__card__screen">
                        <img class="steps__card__img" src="${cl.data.img}" alt="step">
                    </div>
                    <div class="steps__card__lines">
                        <div class="steps__card__line"></div>
                        <div class="steps__card__line"></div>
                    </div>
                    <div class="steps__card__text">
                        <p class="steps__card__title">${cl.data.title}</p>
                        <p class="steps__card__subtitle">${cl.data.subtitle}</p>
                    </div>
                `
            container.appendChild(card)
            cards.push(card)
        })

        btnNext.addEventListener('click', () => {
            classes = classes.splice(-1).concat(classes)
            steps = steps.concat(steps.splice(0, 1))
            updateCards()
        })
        btnPrev.addEventListener('click', () => {
            classes = classes.concat(classes.splice(0, 1))
            steps = steps.splice(-1).concat(steps)
            updateCards()
        })

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const index = card.getAttribute('data-index')
                if (index > 0) {
                    classes = classes.splice(-index).concat(classes)
                    steps = steps.concat(steps.splice(0, index))
                    updateCards()
                } else if (index < 0) {
                    classes = classes.concat(classes.splice(0, -index))
                    steps = steps.splice(index).concat(steps)
                    updateCards()
                }
            })
        })
    }
    sliderSteps(steps, '.steps__field', '.steps__arrow--prev', '.steps__arrow--next')

})