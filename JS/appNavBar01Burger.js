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

//---------------------------------------------------------------
// function getScroll(event)
// {
//      // gestion de event et calcul du scroll
//      var e = event || window.event;
//      var delta = (- e.detail / 3) || (e.wheelDelta / 120);
 
//      // empêche l'action par défaut du scroll
//      if(e.preventDefault)
//      {
//           e.preventDefault();
//      }
//      else // pour IE
//      {
//           e.returnValue = false;
//      }
// }
 
 
// // détection du scroll sur le div
// if(document.addEventListener)
// {
//      document.getElementById('scroll').addEventListener('DOMMouseScroll', getScroll, false);
//      document.getElementById('scroll').addEventListener('mousewheel', getScroll, false);
// }
// else if (document.attachEvent) // pour IE
// {
//      document.getElementById('scroll').attachEvent('onmousewheel', getScroll);
// }
// else {
//     document.getElementById('scroll').onDOMMouseScroll = getScroll;
//     document.getElementById('scroll').onmousewheel = getScroll;
// }
//---------------------------------------------------------------