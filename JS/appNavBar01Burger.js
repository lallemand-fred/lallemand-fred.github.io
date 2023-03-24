let navigation = document.querySelector('.navigation');

document.querySelector('.toggle').onclick = function (){
        this.classList.toggle('active');
        navigation.classList.toggle('active');
}

//-----------------------------------------------------------------------------

const body = document.body;
let lastScroll = 0;


window.addEventListener('scroll', () => {

    const currentScroll = window.pageYOffset
    
    if(currentScroll <= 0) {
        body.classList.remove("scroll-up")
    }

    if (currentScroll < lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }

    if (currentScroll > lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentScroll;
})
//-------------------------------------------------------------------------------
// let stars = document.getElementById('stars')
// let moon = document.getElementById('moon')
// let mountains_behind = document.getElementById('mountains_behind')
// let text = document.getElementById('text')
// let btn = document.getElementById('btn')
// let mountains_front = document.getElementById('mountains_front')
// let header = document.querySelector('header')

// window.addEventListener('scroll', function(){
//     let value = window.scrollY
//     stars.style.left = value * 0.25 + 'px'
//     moon.style.top = value * 0.85 + 'px'
//     mountains_behind.style.top = value * 0.5 + 'px'
//     mountains_front.style.top = value * 0 + 'px'
//     text.style.marginRight = value * 3 + 'px'
//     text.style.marginTop = value * 0.5 + 'px'
//     btn.style.marginTop = value * 1.5 + 'px'
//     header.style.top = value * 0.7 + 'px'
// })