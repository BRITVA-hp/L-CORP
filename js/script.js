document.addEventListener("DOMContentLoaded", () => {

    // (function() {
    //     var throttle = function(type, name, obj) {
    //         obj = obj || window;
    //         var running = false;
    //         var func = function() {
    //             if (running) { return; }
    //             running = true;
    //             requestAnimationFrame(function() {
    //                 obj.dispatchEvent(new CustomEvent(name));
    //                 running = false;
    //             });
    //         };
    //         obj.addEventListener(type, func);
    //     };
    //
    //     /* init - you can init any event */
    //     throttle("resize", "optimizedResize");
    // })();

    // handle event
    // window.addEventListener("optimizedResize", function() {
    //     console.log("Resource conscious resize callback!");
    // });

    const burger = document.querySelector('.header__burger')
    const menu = document.querySelector('.menu')
    const flash = document.querySelector('.menu__flash')
    const menuClose = document.querySelector('.menu__close')
    const menuContent = document.querySelector('.menu__content')

    let flashActive,
        menuClosed

    burger.addEventListener('click', () => {
        clearTimeout(menuClosed)
        menu.classList.add('menu--active')
        setTimeout(() => {
            menuContent.classList.add('menu__content--active')
        }, 1500)
        flashActive = setTimeout(() => {
            flash.classList.add('menu__flash--active')
        }, 2000)
    })

    menuClose.addEventListener('click', () => {
        clearTimeout(flashActive)
        menu.classList.remove('menu--active')
        menu.classList.add('menu--closed')
        flash.classList.remove('menu__flash--active')
        menuContent.classList.remove('menu__content--active')
        menuClosed = setTimeout(() => {
            menu.classList.remove('menu--closed')
        }, 1000)
    })

    const observer = lozad();
    observer.observe();

    //slider steps
    const steps = [
        {
            index: 0,
            img: 'img/index/steps/img1.png',
            title: '01',
            subtitle: 'Разработаем уникальный продающий сайт'
        },
        {
            index: 1,
            img: 'img/index/steps/img1.png',
            title: '02',
            subtitle: 'Второй текст'
        },
        {
            index: 2,
            img: 'img/index/steps/img1.png',
            title: '03',
            subtitle: 'Третий текст'
        },
        {
            index: 3,
            img: 'img/index/steps/img1.png',
            title: '04',
            subtitle: 'Четвёртый текст'
        },
        {
            index: 4,
            img: 'img/index/steps/img1.png',
            title: '05',
            subtitle: 'Пятый текст'
        }
    ]

    function sliderSteps(steps, containerSelector, btnPrevSelector, btnNextSelector) {
        const container = document.querySelector(containerSelector)
        const btnPrev = document.querySelector(btnPrevSelector)
        const btnNext = document.querySelector(btnNextSelector)
        if (container) {
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

                    for(let i=0; i<card.firstElementChild.lastElementChild.children.length; i++) {
                        card.firstElementChild.lastElementChild.children[i].classList.remove('steps__card__dot--active')
                    }
                    card.firstElementChild.lastElementChild.children[classes[cardIndex].data.index].classList.add('steps__card__dot--active')

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
                        <div class="steps__card__dots"></div>
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
            cards.forEach((card, cardIndex) => {
                steps.forEach(step => {
                    card.firstElementChild.lastElementChild.insertAdjacentHTML('beforeend', `<div class="steps__card__dot"></div>`)
                })
                card.firstElementChild.lastElementChild.children[classes[cardIndex].data.index].classList.add('steps__card__dot--active')
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
    }

    sliderSteps(steps, '.steps__field', '.steps__arrow--prev', '.steps__arrow--next')


    //slider
    function slider(window, field, cards, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass, progress, activeCard = false) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext),
            progress_ = document.querySelector(progress);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [],
            mouseMoveFlag = false;

        if (window_) {

            // считаем расстояние между карточками
            // общая длина всех карточек + расстояния между ними
            const lengthCardAndBetweenCards = cards_[cards_.length - 1].getBoundingClientRect().right - window_.getBoundingClientRect().left;
            // расстояние между карточками
            const betweenCards = (lengthCardAndBetweenCards - (cards_[0].clientWidth * cards_.length)) / (cards_.length -1);

            // считаем количество карточек, помещающихся в окне
            function numberIntegerVisibleCards() {
                return Math.floor((window_.clientWidth + betweenCards) / (cards_[0].clientWidth + betweenCards))
            }
            // считаем на какая часть карточки не помещается
            function partCard() {
                return (window_.clientWidth + betweenCards) / (cards_[0].clientWidth + betweenCards) - Math.trunc((window_.clientWidth + betweenCards) / (cards_[0].clientWidth + betweenCards))
            }
            // проверяем, показывается ли последняя карточка
            function lastCard() {
                if ( (sliderCounter + numberIntegerVisibleCards()) >= (cards_.length) && cards_.length >= numberIntegerVisibleCards()) {
                    sliderCounter = cards_.length - numberIntegerVisibleCards() - 1
                    return true
                }
                return false
            }

            // проверяем, больше ли у нас карточек, чем может поместиться в видимой части слайдера
            function checkNumCards() {
                if (cards_.length > numberIntegerVisibleCards()) {
                    return true
                }
                return false
            }

            //Устанавливаем ширину бегунка прогресс-бара
            if (progress_) {
                progress_.style.width = 100 / cards_.length + '%'
            }

            // Слайд следующий

            function slideNext() {
                if (!checkNumCards()) {
                    return
                }
                sliderCounter++;
                if (arrowNext_) arrowNext_.classList.remove(arrowClass);
                if (arrowPrev_) arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter >= cards_.length) {
                    sliderCounter = cards_.length - 1;
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }

                if (progress_) progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
                if (dotsWrap) dots_.forEach(item=> item.classList.remove(dotClassActive))
                if (lastCard()) {
                    field_.style.transform = `translateX(-${field_.scrollWidth - window_.clientWidth}px)`
                    sliderCounter = Math.ceil(cards_.length - numberIntegerVisibleCards() - partCard())
                    dots_[dots_.length - numberIntegerVisibleCards()].classList.add(dotClassActive)
                    console.log(sliderCounter)
                    return
                }
                if (dotsWrap) dots_[sliderCounter].classList.add(dotClassActive)
                field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;

            }

            // Слайд предыдущий

            function slidePrev() {
                if (!checkNumCards()) {
                    return
                }
                sliderCounter = Math.floor(sliderCounter)
                sliderCounter--;
                if (arrowNext_) arrowNext_.classList.remove(arrowClass);
                if (arrowPrev_) arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter <= 0) {
                    sliderCounter = 0;
                }
                if (sliderCounter == 0 && arrowPrev_) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if (dotsWrap) {
                    dots_.forEach((item, index)=> {
                        item.classList.remove(dotClassActive);
                        if (index == sliderCounter) {
                            item.classList.add(dotClassActive);
                        }
                    });
                }

                if (progress) {
                    progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
                }
                if (lastCard()) {
                    field_.style.transform = `translateX(-${field_.scrollWidth - window_.clientWidth - (cards_[0].scrollWidth + betweenCards)}px)`
                    sliderCounter = cards_.length - numberIntegerVisibleCards() - 1
                    return
                }
                field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
            }

            // Рендер точек

            if (dotsWrap) {
                const dotsWrap_ = document.querySelector(dotsWrap);

                cards_.forEach(() => {
                    const dot = document.createElement('div');
                    dot.classList.add(dotClass);
                    dotsWrap_.appendChild(dot);
                    dots_.push(dot);
                });
                dots_[0].classList.add(dotClassActive);
                dots_.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        sliderCounter = index;
                        arrowNext_.classList.remove(arrowClass);
                        arrowPrev_.classList.remove(arrowClass);
                        if (sliderCounter == 0) {
                            arrowPrev_.classList.add(arrowClass);
                        }
                        if ((sliderCounter + 1) == cards_.length) {
                            arrowNext_.classList.add(arrowClass);
                        }
                        dots_.forEach(item_ => {
                            item_.classList.remove(dotClassActive);
                        });
                        item.classList.add(dotClassActive);
                        field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
                    });
                });
            }

            // Переключение на стрелки
            if (arrowPrev_) {
                arrowPrev_.addEventListener('click', () => {
                    slidePrev();
                });
            }

            if (arrowNext_) {
                arrowNext_.addEventListener('click', () => {
                    slideNext();
                });
            }

            // Свайп слайдов тач-событиями

            window_.addEventListener('touchstart', (e) => {
                startPoint = e.changedTouches[0].pageX;
            });

            window_.addEventListener('touchmove', (e) => {
                swipeAction = e.changedTouches[0].pageX - startPoint;
                field_.style.transform = `translateX(${swipeAction + (-(cards_[0].scrollWidth + betweenCards) * sliderCounter)}px)`;
            });

            window_.addEventListener('touchend', (e) => {
                endPoint = e.changedTouches[0].pageX;
                if (Math.abs(startPoint - endPoint) > 50 && checkNumCards()) {
                    if (arrowNext_) arrowNext_.classList.remove(arrowClass);
                    if (arrowPrev_) arrowPrev_.classList.remove(arrowClass);
                    if (endPoint < startPoint) {
                        slideNext();
                    } else {
                        slidePrev();
                    }
                } else {
                    field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
                }
            });

            // Свайп слайдов маус-событиями
            window_.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startPoint = e.pageX;
                mouseMoveFlag = true;
            });
            window_.addEventListener('mousemove', (e) => {
                if (mouseMoveFlag) {
                    e.preventDefault();
                    swipeAction = e.pageX - startPoint;
                    field_.style.transform = `translateX(${swipeAction + (-(cards_[0].scrollWidth + betweenCards) * sliderCounter)}px)`;
                }
            });
            window_.addEventListener('mouseup', (e) => {
                mouseMoveFlag = false
                endPoint = e.pageX;
                if (Math.abs(startPoint - endPoint) > 50 && checkNumCards()) {
                    if (arrowNext_) arrowNext_.classList.remove(arrowClass);
                    if (arrowPrev_) arrowPrev_.classList.remove(arrowClass);
                    if (endPoint < startPoint) {
                        slideNext();
                    } else {
                        slidePrev();
                    }
                } else if(Math.abs(startPoint - endPoint) === 0) {
                    return
                }
                else {
                    field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
                }
            })
            window_.addEventListener('mouseleave', () => {
                if (mouseMoveFlag) {
                    field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
                }
                mouseMoveFlag = false
            })
        }
    }

    slider(
        '.reviews__window',
        '.reviews__field',
        '.reviews__card',
        '.reviews__dots',
        'reviews__dot',
        'reviews__dot--active',
        '.reviews__arrow--prev',
        '.reviews__arrow--next',
        'reviews__arrow--active',
        false
    );

    // ticker
    function ticker(fieldSelector, cardSelector, speed, right = true) {
        const field = document.querySelector(fieldSelector)
        const tickerCards = field.querySelectorAll(cardSelector)
        let transformValue = 0

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }

        let callback
        let run

        if (right) {
            callback = function(entries, observer) {
                entries.forEach(entry => {
                    // entry.time                   // a DOMHightResTimeStamp indicating when the intersection occurred.
                    // entry.rootBounds             // a DOMRectReadOnly for the intersection observer's root.
                    // entry.boundingClientRect     // a DOMRectReadOnly for the intersection observer's target.
                    // entry.intersectionRect       // a DOMRectReadOnly for the visible portion of the intersection observer's target.
                    // entry.intersectionRatio      // the number for the ratio of the intersectionRect to the boundingClientRect.
                    // entry.target                 // the Element whose intersection with the intersection root changed.
                    // entry.isIntersecting         // intersecting: true or false

                    if (!entry.isIntersecting && entry.boundingClientRect.left > 0) {
                        const width = entry.target.clientWidth
                        transformValue -=width
                        entry.target.remove()
                        field.style.transform = `translateX(${transformValue}px)`
                        field.prepend(entry.target)
                    }
                });
            };
            run = () => {
                transformValue += speed
                field.style.transform = 'translateX('  + transformValue  + 'px)'
                window.requestAnimationFrame(run)
            }
        } else {
            callback = function(entries, observer) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting && entry.boundingClientRect.left < 0) {
                        const width = entry.target.clientWidth
                        transformValue +=width
                        entry.target.remove()
                        field.style.transform = `translateX(${transformValue}px)`
                        field.append(entry.target)
                    }
                });
            };

            run = () => {
                transformValue -= speed
                field.style.transform = 'translateX('  + transformValue  + 'px)'
                window.requestAnimationFrame(run)
            }
        }

        const observerTicker = new IntersectionObserver(callback, options)
        tickerCards.forEach(el => {
            observerTicker.observe(el)
        })

        window.requestAnimationFrame(run)
    }

    ticker('.dev-main__row--ml', '.dev-main__card', 0.5)
    ticker('.dev-main__row--mr', '.dev-main__card', 0.5, false)

})