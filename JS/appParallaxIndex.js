let background = document.getElementById('background')
let middelEnd = document.getElementById('middelEnd')
let middelStart = document.getElementById('middelStart')
let frontEnd = document.getElementById('frontEnd')
let frontStart = document.getElementById('frontStart')
let lastName = document.getElementById('lastName')
let firstName = document.getElementById('firstName')
let navBar = document.querySelector('nav')

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    background.style.top = value * 0.40 + "px"
    middelEnd.style.top = value * 0.35 + "px"
    middelStart.style.top = value * 0.30 + "px"
    frontEnd.style.top = value * 0.17 + "px"
    frontStart.style.top = value * 0.08 + "px"
    lastName.style.marginBotton = value * 2 + "px"
    firstName.style.marginBotton = value * 2 + "px"  
})