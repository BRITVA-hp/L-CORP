document.addEventListener("DOMContentLoaded", () => {

    function dropdown(dropdownMenuActiveClass) {
        const dropdown = document.querySelector('[data-dropdown]')
        const dropdownTrigger = dropdown.querySelector('[data-dropdown-trigger]')
        const items = dropdown.querySelectorAll('[data-dropdown-item]')
        const input = dropdown.querySelector('[data-dropdown-input]')

        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            dropdown.classList.toggle(dropdownMenuActiveClass)
        })

        items.forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.textContent
                dropdown.classList.remove(dropdownMenuActiveClass)
            })
        })

    }
    dropdown('modal-quiz__dropdown--active')

    function loading(elemsSelector, elActiveClass) {
        const elems = document.querySelectorAll(elemsSelector)

        elems.forEach((el, elIndex) => {
            setTimeout(() => {
                el.classList.add(elActiveClass)
            }, (elIndex + 1) * 2000)
        })
    }

    loading('.loading__progress__elem', 'loading__progress__elem--active')

})