class Carousel {

    /**
     * callbacks type
     * @moveCallbacks moveCallbacks
     * @param {number} index
     */
    
    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slidesToScroll=1] Nombres d'éléments à faire défiler 
     * @param {Object} [options.slidesVisible=1] Nombres d'éléments visible dans le slide 
     * @param {boolean} [options.loop=false] doit-t-on boucler en fin de carousel 
    */
   constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = true
        this.currentItem = 0
        this.moveCallbacks = []

        // Modiffication du DOM
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item           
        });
        this.setStyle()
        this.createNavigation()
        
        // Evenements
        this.moveCallbacks.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key ==='Right') {
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key ==='Left') {
                this.prev()
            }
        })
    }

    /**
     * Applique les bonnes dimensions aux élémentsdu carousel 
     */
    setStyle () {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
    }

    /**
     * Les bouttons de navigation
     */
    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === true){
            return
        }
        this.onMove(index => {
            if (index === 0){
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }

    /**Fonction next pour passer à l'image suivante  */
    next () {
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }
    
    /**Fonction previous pour revenir à l'image précédente*/
    prev () {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }
    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    gotoItem (index) {
        if(index < 0) {
            if (this.options.loop) {
                index = this.items.length - this.slidesVisible
            } else {
                return
            }
        } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem) {
            if (this.options.loop){
                index = 0
            } else {
                return
            }
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    /**
     * 
     * @param {moveCallbacks} cb 
     */
    onMove(cb) {
        this.moveCallbacks.push(cb)

    }

    onWindowResize () {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
     * 
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /**
     * @returns {number}
     */
    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    /**
     * @returns {number}
     */
    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

new Carousel(document.querySelector('#carousel1'), {
    slidesVisible: 3,
    slidesToScroll: 2,
    loop: true
})
new Carousel(document.querySelector('#carousel2'), {
    slidesVisible: 3,
    slidesToScroll: 2,
    loop: true
})
new Carousel(document.querySelector('#carousel3'), {
    slidesVisible: 3,
    slidesToScroll: 2,
    loop: true
})
new Carousel(document.querySelector('#carousel4'), {
    slidesVisible: 3,
    slidesToScroll: 3,
    loop: true
})

// document.addEventListener('DOMContentLoaded', function () {
//     new Carousel(document.querySelector('#carousel1'), {
//         slidesVisible: 3
//     })
//     console.log('test00')
// })






