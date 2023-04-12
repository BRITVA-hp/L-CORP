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
    function slider(settings) {
        const window_ = document.querySelector(settings.windowSelector),
            field_ = document.querySelector(settings.fieldSelector),
            cards_ = document.querySelectorAll(settings.cardSelector),
            arrowPrev_ = document.querySelector(settings.buttonPrevSelector),
            arrowNext_ = document.querySelector(settings.buttonNextSelector),
            progress_ = document.querySelector(settings.progressSelector),
            dotsWrap_ = document.querySelector(settings.dotsWrapSelector);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [],
            mouseMoveFlag = false,
            moveLastCardFlag = false

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
                field_.style.transform = '';
                return false
            }

            //Устанавливаем ширину бегунка прогресс-бара
            if (progress_) {
                progress_.style.width = 100 / cards_.length + '%'
            }

            // Слайд следующий

            function slideNext(dots = false) {
                if (!checkNumCards()) {
                    return
                }
                if(!dots) sliderCounter++;
                if (arrowNext_) arrowNext_.classList.remove(settings.buttonActiveClass);
                if (arrowPrev_) arrowPrev_.classList.remove(settings.buttonActiveClass);
                if (sliderCounter >= cards_.length) {
                    sliderCounter = cards_.length - 1;
                }
                if ((sliderCounter + 1) === cards_.length) {
                    arrowNext_.classList.add(settings.buttonActiveClass);
                }
                if (progress_) progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
                if (dotsWrap_) dots_.forEach(item => item.classList.remove(settings.dotActiveClass))
                if (lastCard()) {
                    field_.style.transform = `translateX(-${field_.scrollWidth - window_.clientWidth}px)`
                    sliderCounter = Math.ceil(cards_.length - numberIntegerVisibleCards() - partCard())
                    dots_[dots_.length - 1].classList.add(settings.dotActiveClass)
                    console.log(1)
                    return
                }
                if (dotsWrap_) dots_[sliderCounter].classList.add(settings.dotActiveClass)
                field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;

            }

            // Слайд предыдущий

            function slidePrev(dots = false) {
                if (!checkNumCards()) {
                    return
                }
                sliderCounter = Math.floor(sliderCounter)
                if(!dots) sliderCounter--;
                if (arrowNext_) arrowNext_.classList.remove(settings.buttonActiveClass);
                if (arrowPrev_) arrowPrev_.classList.remove(settings.buttonActiveClass);
                if (sliderCounter <= 0) {
                    sliderCounter = 0;
                }
                if (sliderCounter === 0 && arrowPrev_) {
                    arrowPrev_.classList.add(settings.buttonActiveClass);
                }
                if (dotsWrap_) {
                    dots_.forEach((item, index)=> {
                        item.classList.remove(settings.dotActiveClass);
                    });
                    dots_[sliderCounter].classList.add(settings.dotActiveClass);
                }

                if (progress_) {
                    progress_.style.left = (100 / cards_.length) * sliderCounter + '%'
                }
                field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
            }

            // Рендер точек

            if (dotsWrap_) {

                cards_.forEach(() => {
                    const dot = document.createElement('div');
                    dot.classList.add(settings.dotClass);
                    dotsWrap_.appendChild(dot);
                    dots_.push(dot);
                });
                dots_[0].classList.add(settings.dotActiveClass);
                dots_.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        if (!checkNumCards()) {
                            return
                        }
                        if (index > sliderCounter) {
                            sliderCounter = index;
                            slideNext(true)
                            return
                        }
                        if (index < sliderCounter) {
                            sliderCounter = index;
                            slidePrev(true)
                        }
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
                if (lastCard()) moveLastCardFlag = true
            });

            window_.addEventListener('touchmove', (e) => {
                swipeAction = e.changedTouches[0].pageX - startPoint;
                if (moveLastCardFlag) {
                    field_.style.transform = `translateX(${swipeAction + -(field_.clientWidth - document.documentElement.clientWidth)}px)`;
                } else {
                    field_.style.transform = `translateX(${swipeAction + (-(cards_[0].scrollWidth + betweenCards) * sliderCounter)}px)`;
                }
            });

            window_.addEventListener('touchend', (e) => {
                moveLastCardFlag = false
                endPoint = e.changedTouches[0].pageX;
                if (Math.abs(startPoint - endPoint) > 50 && checkNumCards()) {
                    if (arrowNext_) arrowNext_.classList.remove(settings.buttonActiveClass);
                    if (arrowPrev_) arrowPrev_.classList.remove(settings.buttonActiveClass);
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
                    if (arrowNext_) arrowNext_.classList.remove(settings.buttonActiveClass);
                    if (arrowPrev_) arrowPrev_.classList.remove(settings.buttonActiveClass);
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

    slider({
        windowSelector: '.reviews__window',
        fieldSelector: '.reviews__field',
        cardSelector: '.reviews__card',
        dotsWrapSelector: '.reviews__dots',
        dotClass: 'reviews__dot',
        dotActiveClass: 'reviews__dot--active',
        buttonPrevSelector: '.reviews__arrow--prev',
        buttonNextSelector: '.reviews__arrow--next',
        buttonActiveClass: 'reviews__arrow--active',
    });

    // ticker
    function ticker(windowSelector, fieldSelector, cardSelector, speed, right = true) {
        const _window = document.querySelector(windowSelector)
        const field = document.querySelector(fieldSelector)

        if (_window) {
            const tickerCards = field.querySelectorAll(cardSelector)
            let transformValue = 0


            const options = {
                root: _window,
                rootMargin: '0px',
                threshold: 0
            }

            let callback

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
            }

            const observerTicker = new IntersectionObserver(callback, options)
            tickerCards.forEach(el => {
                observerTicker.observe(el)
            })

            const run = () => {
                if (document.documentElement.clientWidth < 575) {
                    right ? transformValue += speed : transformValue -= speed
                    field.style.transform = 'translateX('  + transformValue  + 'px)'
                }
                window.requestAnimationFrame(run)
            }

            window.requestAnimationFrame(run)
        }
    }

    ticker('.dev-main__window', '.dev-main__row--ml', '.dev-main__card', 0.5)
    ticker('.dev-main__window', '.dev-main__row--mr', '.dev-main__card', 0.5, false)

    //dev-price slider
    function devPriceSlider() {
        const btnPrev = document.querySelector('.dev-price__arrow--prev')
        const btnNext = document.querySelector('.dev-price__arrow--next')
        const field = document.querySelector('.dev-price__field')
        const _window = document.querySelector('.dev-price__window')
        const cards = document.querySelectorAll('.dev-price__card-wrap')
        const dotsWrap = document.querySelector('.dev-price__dots')

        if (_window) {
            const dots = []
            let counter = 0,
                translate = 0,
                startPoint,
                swipeAction,
                endPoint,
                timeStart,
                timeFinish,
                animFlag = true,
                mouseMoveFlag = false

            const activeCard = (touch = false) => {
                cards.forEach(card => {
                    card.classList.remove('dev-price__card-wrap--active')
                })
                cards[counter].classList.add('dev-price__card-wrap--active')
                const right = cards[counter].getBoundingClientRect().right - _window.getBoundingClientRect().right
                const left = cards[counter].getBoundingClientRect().left - _window.getBoundingClientRect().left
                if (right > 0) {
                    translate += -right - 20
                }
                if (left < 0) {
                    translate += -left + 20
                }
                field.style.transform = `translateX(${translate}px)`
            }

            const activeDot = () => {
                dots.forEach(dot => {
                    dot.classList.remove('dev-price__dot--active')
                })
                dots[counter].classList.add('dev-price__dot--active')
            }

            // создаём пагинацию
            cards.forEach(card => {
                const dot = document.createElement('div')
                dot.classList.add('dev-price__dot')
                dotsWrap.appendChild(dot)
                dots.push(dot)
            })
            dots[counter].classList.add('dev-price__dot--active')
            dots.forEach((dot, dotIndex) => {
                dot.addEventListener('click', () => {
                    counter = dotIndex
                    activeCard()
                    activeDot()
                })
            })

            cards.forEach((card, cardIndex) => {
                card.addEventListener('click', (e) => {
                    // e.stopImmediatePropagation()
                    // e.stopPropagation()
                    counter = cardIndex
                    activeCard()
                    activeDot()
                })
            })

            // следующий слайд при нажатии на стрелку
            btnNext.addEventListener('click', () => {
                counter++
                if (counter >= cards.length) counter = cards.length - 1

                activeCard()
                activeDot()

            })

            // предыдущий слайд при нажатии на стрелку
            btnPrev.addEventListener('click', () => {
                counter--
                if (counter < 0) counter = 0

                activeCard()
                activeDot()
            })

            function animate({duration, right = true, distance}) {

                let start = performance.now();

                requestAnimationFrame(function animate(time) {
                    // timeFraction изменяется от 0 до 1
                    let timeFraction = (time - start) / duration;
                    if (timeFraction > 1) timeFraction = 1;
                    let progress = Math.pow(timeFraction, 1/2) * distance
                    if (right) progress = -progress
                    field.style.transform = `translateX(${translate + progress}px)`
                    if (timeFraction < 1 && animFlag && field.getBoundingClientRect().left < 0 && field.getBoundingClientRect().right > document.documentElement.clientWidth) {
                        requestAnimationFrame(animate);
                    }
                    if (timeFraction >= 1 || !animFlag) {
                        translate += progress
                    }
                    if (field.getBoundingClientRect().left > 0) {
                        field.style.transform = ''
                        translate = 0
                    }
                    if (field.getBoundingClientRect().right < document.documentElement.clientWidth) {
                        translate = -(field.clientWidth - document.documentElement.clientWidth)
                        field.style.transform = `translateX(${translate}px)`
                    }

                });
            }

            function touchMouseUp() {
                timeFinish = performance.now()
                const time = (timeFinish - timeStart)/1000
                const V0 = Math.abs(swipeAction/time)
                const a = 5000
                const t = Math.abs(V0/a)
                const S = (V0*t) + (a*t*t)/2
                // console.log(t)
                // console.log(S)
                if (field.getBoundingClientRect().left > 0) {
                    field.style.transform = ''
                    translate = 0
                    swipeAction = 0
                    return
                }
                if (field.getBoundingClientRect().right < document.documentElement.clientWidth) {
                    translate = -(field.clientWidth - document.documentElement.clientWidth)
                    field.style.transform = `translateX(${translate}px)`
                    swipeAction = 0
                    return
                }
                translate += swipeAction
                if (swipeAction < 0) animate({duration: 1500, distance: S})
                if (swipeAction > 0) animate({duration: 1500, right: false, distance: S})
                swipeAction = 0
            }

            // Свайп слайдов тач-событиями

            _window.addEventListener('touchstart', (e) => {
                startPoint = e.changedTouches[0].pageX;
                timeStart = performance.now()
                animFlag = false
            });

            _window.addEventListener('touchmove', (e) => {
                swipeAction = e.changedTouches[0].pageX - startPoint;
                animFlag = true
                const run = () => {
                    field.style.transform = `translateX(${translate + swipeAction}px)`
                }
                window.requestAnimationFrame(run)
            });

            _window.addEventListener('touchend', (e) => {
                touchMouseUp()
                // endPoint = e.changedTouches[0].pageX;
            });

            // Свайп слайдов mouse-событиями

            _window.addEventListener('mousedown', (e) => {
                e.preventDefault()
                startPoint = e.pageX;
                timeStart = performance.now()
                animFlag = false
                mouseMoveFlag = true
            });

            _window.addEventListener('mousemove', (e) => {
                e.preventDefault()
                if(mouseMoveFlag) {
                    swipeAction = e.pageX - startPoint;
                    animFlag = true
                    const run = () => {
                        field.style.transform = `translateX(${translate + swipeAction}px)`
                    }
                    window.requestAnimationFrame(run)
                }
            });

            _window.addEventListener('mouseup', (e) => {
                e.preventDefault()
                touchMouseUp()
                mouseMoveFlag = false
            });

            _window.addEventListener('mouseleave', () => {
                // if (mouseMoveFlag) {
                //     field_.style.transform = `translateX(-${(cards_[0].scrollWidth + betweenCards) * sliderCounter}px)`;
                // }
                mouseMoveFlag = false
                if (field.getBoundingClientRect().left > 0) {
                    field.style.transform = ''
                    translate = 0
                    swipeAction = 0
                    return
                }
                if (field.getBoundingClientRect().right < document.documentElement.clientWidth) {
                    translate = -(field.clientWidth - document.documentElement.clientWidth)
                    field.style.transform = `translateX(${translate}px)`
                    swipeAction = 0
                }
            })
        }
    }

    devPriceSlider()


})