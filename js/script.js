var swiper = new Swiper(".mySwiper",{
    autoplay: {
        delay: 2500, // Time between slides in milliseconds
        disableOnInteraction: false, // Keep autoplay running even after user interaction

    },
    speed:1000,
    parallax:true,
    slidesPerView:1,
    lazy:true,
    preloadImages:false,
    centeredSlides:true,
    spaceBetween:60,
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev'
    },
    breakpoints: {
        991:{
            slidesPerView:3,
            loop:true,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Hace que los bullets sean clicables
    }
      
});

//Ocultar el header al desplazar el scroll de la pagina hacia abajo.
//Aparecer el header antes de llegar al inicio de la pagina.
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var triggerPoint = document.documentElement.getAttribute('data-trigger-point') || 160; // Distance from the top to trigger the header
    if (window.scrollY <= triggerPoint) {
        header.style.top = '0';
    } else {
        header.style.top = '-12vh'; // Adjust based on your header height
    }
});

//Esto hace que cuando la pagina se actualice el header no se muestre
window.onload = function() {
    // Solo desplaza hacia arriba si no hay un hash en la URL
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
};

//Ocultar el submenu al dar click sobre una superficie que no sean los links o el resto del menu

document.addEventListener('click', function(event) {
    var isClickInsideMenu = document.getElementById('menu').contains(event.target);
    var isClickInsideNavbar = document.getElementById('navbar').contains(event.target);
    var isClickInsideMenuIcon = document.getElementById('menu-icon').contains(event.target);

    if (!isClickInsideMenu && !isClickInsideNavbar && !isClickInsideMenuIcon) {
        document.getElementById('menu').checked = false;
    }
});

//Ocultar navbar cuando se da click a un link del navbar

document.querySelectorAll('#navbar .a-js-close').forEach(function(link){
    link.addEventListener('click', function() {
        document.getElementById('menu').checked = false;
    });
});

//Validacion de formulario.

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Galeria de imagenes

const fulImgBox = document.getElementById("fulImgBox")
const fulImg = document.getElementById("fulImg")
const close = document.getElementById("btnClose")
const GalleryImage = document.querySelectorAll(".Open-imagen")

GalleryImage.forEach(img =>{ //por que no se pone()?
    img.addEventListener('click',()=>{
        fulImgBox.style.display = "flex"
        fulImg.src = img.src 
    })
})

close.addEventListener('click', ()=>{
    fulImgBox.style.display = "none";
})