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
//Popover links

document.addEventListener("DOMContentLoaded", function(){
    var link = document.getElementById("popover-link");

    var popover = tippy(link, {
        content: "Descargando...",
        trigger: "manual",
        interactive: true,
        placement: "right",
    }); 

    link.addEventListener("click", function(event){
        popover.show();

        setTimeout(function (){
            popover.hide();
        }, 2000);
    });
});

document.addEventListener("DOMContentLoaded", function(){
    var links = document.querySelectorAll(".popover-link2");

    links.forEach(function(link){
        var popover = tippy(link, {
            content: "Descargando...",
            trigger: "manual",
            interactive: true,
            placement: "bottom",
        });
        link.addEventListener("click", function(event){
            popover.show();
    
            setTimeout(function (){
                popover.hide();
            }, 2000);
        });
    });  
});

document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador");
    const articulos = document.querySelectorAll(".articulos1, .articulos2, .articulos3, .articulos4, .articulos5, .articulos6, .articulos7, .articulos8");

    const mensajeSinResultados = document.getElementById("mensaje-sin-resultados");

    function limpiarTexto(texto) {
        return texto.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
    }

    function filtrarArticulos() {
        const textoBusqueda = limpiarTexto(buscador.value);
        let hayCoincidencias = false;

        articulos.forEach(function(item){
            const textoItem = limpiarTexto(item.textContent);
            if (textoItem.includes(textoBusqueda) && textoBusqueda !== "") {
                item.style.display = "";
                hayCoincidencias = true;
            } else {
                item.style.display = "none";
            }
        });

        if (hayCoincidencias) {
            mensajeSinResultados.style.display = "none"; 
        } else {
            if (textoBusqueda) {
                mensajeSinResultados.style.display = "block"; 
            } else {
                mensajeSinResultados.style.display = "none"; 
            }
        }
    }

    articulos.forEach(item => item.style.display = "none");
    mensajeSinResultados.style.display = "none";
    buscador.addEventListener("keyup", filtrarArticulos);
});

// Cuando se preciona un link del search

document.addEventListener('DOMContentLoaded', function(){
    var openOffcanvas = document.querySelectorAll('#openOffcanvas1 , #openOffcanvas2');
    var offcanvasImprovise = document.getElementById('offcanvas');

    openOffcanvas.forEach(function(openOff){
        openOff.addEventListener('click', function(){
            offcanvasImprovise.classList.add("open");
        })
    })  
    
    document.getElementById('closeOffcanvas').addEventListener('click', function(close){
        offcanvasImprovise.classList.remove("open");
    });

    var btnClose = document.getElementById('closeOffcanvas');

    const articulos1 = document.querySelectorAll(".articulos1");
    const articulos2 = document.querySelectorAll(".articulos2");
    const articulos3 = document.querySelectorAll(".articulos3");
    const articulos4 = document.querySelectorAll(".articulos4");
    const articulos5 = document.querySelectorAll(".articulos5");
    const articulos6 = document.querySelectorAll(".articulos6");
    const articulos7 = document.querySelectorAll(".articulos7");
    const articulos8 = document.querySelectorAll(".articulos8");


    var accordion1 = document.getElementById('accordion-open1');
    var accordion2 = document.getElementById('accordion-open2');
    var accordion3 = document.getElementById('accordion-open3');
    var accordion4 = document.getElementById('accordion-open4');
    var accordion5 = document.getElementById('accordion-open5'); //original
    var accordion6 = document.getElementById('accordion-open6');
    var accordion7 = document.getElementById('accordion-open7');
    var accordion8 = document.getElementById('accordion-open8');
    
    var accordionOPEN = false; //ejemplo
    var accordionOPEN1 = false
    var accordionOPEN2 = false
    var accordionOPEN3 = false
    var accordionOPEN4 = false
    var accordionOPEN5 = false
    var accordionOPEN6 = false
    var accordionOPEN7 = false
    var accordionOPEN8 = false

    // var accordionsButtons = document.querySelectorAll(
    //     '#accordion-open1, #accordion-open2, #accordion-open3, #accordion-open4, #accordion-open5, #accordion-open6, #accordion-open7, #accordion-open8'
    // ); 

    articulos1.forEach(function(autoclick){   
        autoclick.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);

        if(accordionOPEN1 === false){
            setTimeout(function(){
                accordion2.click();
            },250);
        }
        setTimeout(function(){
            accordion1.scrollIntoView({ behavior: "smooth" });
           },750);
        });
    });
    var accordionButton1 = document.getElementById('accordion-open1');
    accordionButton1.addEventListener('click', function(){
        if(accordionOPEN1 === false){
            accordionOPEN1 = true;
        } else if(accordionOPEN1 === true){
            accordionOPEN1 = false;
        }

        // console.log("[" + new Date().toLocaleTimeString() + "] Estado de accordionOPEN:", accordionOPEN1);
    }) 

    articulos2.forEach(function(autoclick){   
        autoclick.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);

        if(accordionOPEN2 === false){
            setTimeout(function(){
                accordion2.click();
            },250);
        }
        setTimeout(function(){
            accordion2.scrollIntoView({ behavior: "smooth" });
           },750);
        });
    });
    
    var accordionButton2 = document.getElementById('accordion-open2');
    accordionButton2.addEventListener('click', function(){
        if(accordionOPEN2 === false){
            accordionOPEN2 = true;
        } else if(accordionOPEN2 === true){
            accordionOPEN2 = false;
        }

        // console.log("[" + new Date().toLocaleTimeString() + "] Estado de accordionOPEN:", accordionOPEN2);
    }) 

    //NECESITO COMPLETAR ESTA PORQUERIA  //Lo complete...

    articulos3.forEach(function(autoclick){   
        autoclick.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);

        if(accordionOPEN3 === false){
            setTimeout(function(){
                accordion3.click();
            },250);
        }
        setTimeout(function(){
            accordion3.scrollIntoView({ behavior: "smooth" });
           },750);
        });
    });
    
    var accordionButton3 = document.getElementById('accordion-open3');
    accordionButton3.addEventListener('click', function(){
        if(accordionOPEN3 === false){
            accordionOPEN3 = true;
        } else if(accordionOPEN3 === true){
            accordionOPEN3 = false;
        }

        console.log("[" + new Date().toLocaleTimeString() + "] Estado de accordionOPEN:", accordionOPEN3);
    }) 

    //Especial
    const PadrerNuestrorefS = document.querySelector('.PadrerNuestro-refS');
    var PadrerNuestroref = document.querySelector('.PadrerNuestro-ref');
    const AveMariarefS = document.querySelector('.AveMaria-refS');
    var AveMariaref = document.querySelector('.AveMaria-ref');
    const GloriaAlpadrerefS = document.querySelector('.GloriaAlpadre-refS');
    var GloriaAlpadreref = document.querySelector('.GloriaAlpadre-ref');
    const laSalverefS = document.querySelector('.laSalve-refS');
    var laSalveref = document.querySelector('.laSalve-ref');
    const AngelCustodiorefS = document.querySelector('.AngelCustodio-refS');
    var AngelCustodioref = document.querySelector('.AngelCustodio-ref');
    const AngelGuardarefS = document.querySelector('.AngelGuarda-refS');
    var AngelGuardaref = document.querySelector('.AngelGuarda-ref');
    const SagradaFamiliarefS = document.querySelector('.SagradaFamilia-refS');
    var SagradaFamiliaref = document.querySelector('.SagradaFamilia-ref');
    const ElcredoS = document.querySelector('.Elcredo-refS');
    var Elcredo = document.querySelector('.Elcredo-ref');
    const CredoApostolesS = document.querySelector('.CredoApostoles-refS');
    var CredoApostoles = document.querySelector('.CredoApostoles-refS');
    const reginarefS = document.querySelector('.regina-refS');
    var reginaref = document.querySelector('.regina-ref');
    const yoConfiezoS = document.querySelector('.yoConfiezo-refS');
    var yoConfiezo = document.querySelector('.yoConfiezo-ref');
    const actoContriccionS = document.querySelector('.actoContriccion-refS');
    var actoContriccion = document.querySelector('.actoContriccion-ref');
    const magnificatS = document.querySelector('.magnificat-refS');
    var magnificat = document.querySelector('.magnificat-ref');
    const SenorMisericordiaS = document.querySelector('.SenorMisericordia-refS');
    var SenorMisericordia = document.querySelector('.SenorMisericordia-ref');
    const OracionMananaS = document.querySelector('.OracionManana-refS');
    var OracionManana = document.querySelector('.OracionManana-ref');
    const SanJoseS = document.querySelector('.SanJose-refS');
    var SanJose = document.querySelector('.SanJose-ref');
    const GraciaArrepentimientoS = document.querySelector('.GraciaArrepentimiento-refS');
    var GraciaArrepentimiento = document.querySelector('.GraciaArrepentimiento-ref');
    const JesusCrusificadoS = document.querySelector('.JesusCrusificado-refS');
    var JesusCrusificado = document.querySelector('.JesusCrusificado-ref');
    const QuedateConmigoS = document.querySelector('.QuedateConmigo-refS');
    var QuedateConmigo = document.querySelector('.QuedateConmigo-ref');
    const CoronillaDivinaMisericordiaS = document.querySelector('.CoronillaDivinaMisericordia-refS');
    var CoronillaDivinaMisericordia = document.querySelector('.CoronillaDivinaMisericordia-ref');
    const SanMiguelArcangelS = document.querySelector('.SanMiguelArcangel-refS');
    var SanMiguelArcangel = document.querySelector('.SanMiguelArcangel-ref');
    const AngelusS = document.querySelector('.Angelus-refS');
    var Angelus = document.querySelector('.Angelus-ref');
    const LlagaHombroJesusS = document.querySelector('.LlagaHombroJesus-refS');
    var LlagaHombroJesus = document.querySelector('.LlagaHombroJesus-ref');
    const ConsagraciónVirgenMariaMaximilianoS= document.querySelector('.ConsagraciónVirgenMariaMaximiliano-refS');
    var ConsagraciónVirgenMariaMaximiliano = document.querySelector('.ConsagraciónVirgenMariaMaximiliano-ref');
    const SantaBirigida12anosS = document.querySelector('.SantaBirigida12anos-refS');
    var SantaBirigida12anos = document.querySelector('.SantaBirigida12anos-ref');
    const SantoRosarioS = document.querySelector('.SantoRosario-refS');
    var SantoRosario = document.querySelector('.SantoRosario-ref');
    const SantaBirigida1anosS = document.querySelector('.SantaBirigida1anos-refS');
    var SantaBirigida1anos = document.querySelector('.SantaBirigida1anos-ref');
    const sietedoloresVirgenS = document.querySelector('.sietedoloresVirgen-refS');
    var sietedoloresVirgen = document.querySelector('.sietedoloresVirgen-ref');
    const EspirituSantoS = document.querySelector('.EspirituSanto-refS');
    var EspirituSanto = document.querySelector('.EspirituSanto-ref');
    const DivinoNinoJesusS = document.querySelector('.DivinoNinoJesus-refS');
    var DivinoNinoJesus = document.querySelector('.DivinoNinoJesus-ref');
    const AlmasPurgatorioS = document.querySelector('.AlmasPurgatorio-refS');
    var AlmasPurgatorio = document.querySelector('.AlmasPurgatorio-ref');
    const ConsagraciónVirgenMariaS = document.querySelector('.ConsagraciónVirgen-Maria-refS');
    var ConsagraciónVirgenMaria = document.querySelector('.ConsagraciónVirgen-Maria-ref');

    PadrerNuestrorefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            PadrerNuestroref.click();
        },750);
    });

    var accordionButton4 = document.getElementById('accordion-open4');
    accordionButton4.addEventListener('click', function(){
        if(accordionOPEN4 === false){
            accordionOPEN4 = true;
        } else if(accordionOPEN4 === true){
            accordionOPEN4 = false;
        }
    }) 
    AveMariarefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            AveMariaref.click();
        },750);
    });

   
    GloriaAlpadrerefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            GloriaAlpadreref.click();
        },750);
    });

    
    laSalverefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            laSalveref.click();
        },750);
    });


    AngelCustodiorefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            AngelCustodioref.click();
        },750);
    });


    AngelGuardarefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            AngelGuardaref.click();
        },750);
    });
    SagradaFamiliarefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SagradaFamiliaref.click();
        },750);
    });
    ElcredoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            Elcredo.click();
        },750);
    });
    CredoApostolesS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            CredoApostoles.click();
        },750);
    });
    reginarefS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            reginaref.click();
        },750);
    });
    yoConfiezoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            yoConfiezo.click();
        },750);
    });
    actoContriccionS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            actoContriccion.click();
        },750);
    });
    magnificatS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            magnificat.click();
        },750);
    });
    SenorMisericordiaS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SenorMisericordia.click();
        },750);
    });
    OracionMananaS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            OracionManana.click();
        },750);
    });
    SanJoseS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SanJose.click();
        },750);
    });
    GraciaArrepentimientoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            GraciaArrepentimiento.click();
        },750);
    });
    JesusCrusificadoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            JesusCrusificado.click();
        },750);
    });
    QuedateConmigoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            QuedateConmigo.click();
        },750);
    });
    CoronillaDivinaMisericordiaS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            CoronillaDivinaMisericordia.click();
        },750);
    });
    SanMiguelArcangelS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SanMiguelArcangel.click();
        },750);
    });
    AngelusS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            Angelus.click();
        },750);
    });
    LlagaHombroJesusS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            LlagaHombroJesus.click();
        },750);
    });

    ConsagraciónVirgenMariaMaximilianoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            ConsagraciónVirgenMariaMaximiliano.click();
        },750);
    });
    SantaBirigida12anosS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SantaBirigida12anos.click();
        },750);
    });
    SantoRosarioS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SantoRosario.click();
        },750);
    });
    SantaBirigida1anosS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            SantaBirigida1anos.click();
        },750);
    });
    sietedoloresVirgenS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            sietedoloresVirgen.click();
        },750);
    });
    EspirituSantoS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            EspirituSanto.click();
        },750);
    });

    DivinoNinoJesusS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            DivinoNinoJesus.click();
        },750);
    });
    AlmasPurgatorioS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            AlmasPurgatorio.click();
        },750);
    });
    ConsagraciónVirgenMariaS.addEventListener('click', function(){        
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN4){
            setTimeout(function(){
                accordion4.click();
            },250);
        }
        
        setTimeout(function(){
            accordion4.scrollIntoView({ behavior: "smooth" });
        },1000);
        
        setTimeout(function(){                    
            ConsagraciónVirgenMaria.click();
        },750);
    });

    //Especial-END

    articulos5.forEach(function(autoclick){   
        accordionOPEN = false;

        autoclick.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);

        if(!accordionOPEN){
            setTimeout(function(){
                accordion5.click();
            },250);
        }
        setTimeout(function(){
            accordion5.scrollIntoView({ behavior: "smooth" });
           },750);
        });
    });
});