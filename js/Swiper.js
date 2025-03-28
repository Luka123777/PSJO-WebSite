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