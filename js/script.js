// import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
// import 'bootstrap'; // Importa los componentes JS de Bootstrap

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
    var triggerPoint = document.documentElement.getAttribute('data-trigger-point') || 25; // Distance from the top to trigger the header
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
    close.addEventListener('click', ()=>{
        fulImgBox.style.display = "none";
    });
})

//Reprodcutor dinamico de iframes

document.addEventListener("DOMContentLoaded", function () {
    const videoLinks = document.querySelectorAll(".video-link");
    const player = document.getElementById("youtube-player");
    const titleElement = document.getElementById("video-title");
  
    videoLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        const videoId = this.dataset.videoId;
        const videoTitle = this.dataset.videoTitle || "Sin título"; 
  
            if (videoId) {
            player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    

            titleElement.textContent = videoTitle;
    
            document.querySelectorAll(".list-group-item").forEach(item => {
                item.classList.remove("active");
            });
    
            this.closest(".list-group-item").classList.add("active");
            }
      });
    });
});

window.onload = function () {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: "#navbar-example",
      offset: 50
    });
    console.log("ScrollSpy reinicializado después de la carga completa");
  };
  

 