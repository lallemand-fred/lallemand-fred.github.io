let navigation = document.querySelector('.navigation')

document.querySelector('.toggle').onclick = function (){
        this.classList.toggle('active')
        navigation.classList.toggle('active')
}


const scroller = window.document.querySelector('#grid')

const body = document.body

let lastScroll = 0;

scroller.addEventListener('scroll', (e) => {
    
    const currentScroll = `scrollTop:${scroller.scrollTop}`

    if(currentScroll <= 0) {
        body.classList.remove("navigation")
    }
    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
        navigation.style.visibility = "hidden"
        navigation.classList.remove('active')
    }
    
    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
        navigation.style.visibility = "visible"
    }
    lastScroll = currentScroll
    
})

