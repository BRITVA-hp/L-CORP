document.addEventListener("DOMContentLoaded", () => {

    const observer = lozad();
    observer.observe();

    const steps = [
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Разработаем уникальный продающий сайт'
        },
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Второй текст'
        },
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Третий текст'
        },
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Четвёртый текст'
        },
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Пятый текст'
        },
        {
            img: 'img/index/steps/img1.png',
            subtitle: 'Шестой текст'
        }
    ]

    function sliderSteps(steps, containerSelector, btnPrevSelector, btnNextSelector) {
        const container = document.querySelector(containerSelector)
        const btnPrev = document.querySelector(btnPrevSelector)
        const btnNext = document.querySelector(btnNextSelector)
        const arr = []
        const template = `
            <div class="steps__card">
                <div class="steps__card__screen">
                    <img class="steps__card__img" src="img/index/steps/img1.png" alt="step">
                </div>
                <div class="steps__card__lines">
                    <div class="steps__card__line"></div>
                    <div class="steps__card__line"></div>
                </div>
                <div class="steps__card__text">
                    <p class="steps__card__title">04</p>
                    <p class="steps__card__subtitle">Разработаем уникальный продающий сайт</p>
                </div>
            </div>
        `
        let styles = [
          '',
          'transform: matrix(0.96, -0.27, -0.01, 1, 0, 0); width: 157px; height: 162px; position: absolute; right: 90px; top: 80px',
          'transform: matrix(0.71, -0.71, -0.02, 1, 0, 0); width: 80px; height: 162px; position: absolute; right: 0; top: 0',
          'transform: matrix(0.97, 0.26, -0.01, 1, 0, 0); width: 157px; height: 162px; position: absolute; left: 90px; top: 80px',
          'transform: matrix(0.71, 0.71, 0, 1, 0, 0); width: 80px; height: 162px; position: absolute; left: 0; top: 0'
        ]

        if (steps.length < styles.length) styles.splice(steps.length)
        styles.forEach(el => {
            container.insertAdjacentHTML('beforeend', `
                <div class="steps__card" style="${el}">
                    <div class="steps__card__screen">
                        <img class="steps__card__img" src="img/index/steps/img1.png" alt="step">
                    </div>
                    <div class="steps__card__lines">
                        <div class="steps__card__line"></div>
                        <div class="steps__card__line"></div>
                    </div>
                    <div class="steps__card__text">
                        <p class="steps__card__title">04</p>
                        <p class="steps__card__subtitle">Разработаем уникальный продающий сайт</p>
                    </div>
                </div>
            `)
        })
    }
    sliderSteps(steps, '.steps__field')

})