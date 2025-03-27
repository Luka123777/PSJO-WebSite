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
    var buscador = document.getElementById("buscador");
    const articulos = document.querySelectorAll(".articulos1, .articulos2, .articulos3, .articulos4, .articulos5, .articulos6, .articulos7, .articulos8");
    const mensajeSinResultados = document.getElementById("mensaje-sin-resultados");

    function limpiarTexto(texto) {
        return texto.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
    }

    function filtrarArticulos() {
        const textoBusqueda = limpiarTexto(buscador.value); //Se recoje el texto del input
        let hayCoincidencias = false;
        let contadorResultados = 0;
        const limiteResultados = 8;

        articulos.forEach(function(item){
            const textoItem = limpiarTexto(item.textContent);

            if (textoItem.includes(textoBusqueda) && textoBusqueda !== "" 
                && contadorResultados <= limiteResultados) {
                item.style.display = "";
                hayCoincidencias = true;
                contadorResultados++;
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
    var buscador = document.getElementById("buscador");
    var openOffcanvas = document.querySelectorAll('#openOffcanvas1 , #openOffcanvas2');
    var offcanvasImprovise = document.getElementById('offcanvas');

    openOffcanvas.forEach(function(openOff){
        openOff.addEventListener('click', function(){
            offcanvasImprovise.classList.add("open");
            buscador.focus();
        })
    })  
    
    document.getElementById('closeOffcanvas').addEventListener('click', function(close){
        offcanvasImprovise.classList.remove("open");
    });

    var btnClose = document.getElementById('closeOffcanvas');

    const articulos1 = document.querySelectorAll(".articulos1");
    const articulos2 = document.querySelectorAll(".articulos2");
    const articulos3 = document.querySelectorAll(".articulos3");
    const articulos6 = document.querySelectorAll(".articulos6");
    const articulos7 = document.querySelectorAll(".articulos7");
    const articulos8 = document.querySelectorAll(".articulos8");


    var accordion1 = document.getElementById('accordion-open1');
    var accordion2 = document.getElementById('accordion-open2');
    var accordion3 = document.getElementById('accordion-open3');
    var accordion4 = document.getElementById('accordion-open4');
    var accordion5 = document.getElementById('accordion-open5'); 
    var accordion6 = document.getElementById('accordion-open6');
    var accordion7 = document.getElementById('accordion-open7');
    var accordion8 = document.getElementById('accordion-open8');
    
    var accordionOPEN1 = false
    var accordionOPEN2 = false
    var accordionOPEN3 = false
    var accordionOPEN4 = false
    var accordionOPEN5 = false
    var accordionOPEN6 = false
    var accordionOPEN7 = false
    var accordionOPEN8 = false

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
    }) 

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
    var CredoApostoles = document.querySelector('.CredoApostoles-ref');
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
            PadrerNuestroref.click();
            PadrerNuestroref.focus();
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
            AveMariaref.click();
            AveMariaref.focus();
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
            GloriaAlpadreref.click();
            GloriaAlpadreref.focus();
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
            laSalveref.click();
            laSalveref.focus();
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
            AngelCustodioref.click();
            AngelCustodioref.focus();
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
            AngelGuardaref.click();
            AngelGuardaref.focus();
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
            SagradaFamiliaref.click();
            SagradaFamiliaref.focus();
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
            Elcredo.click();
            Elcredo.focus();
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
            CredoApostoles.click();
            CredoApostoles.focus();
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
            reginaref.click();
            reginaref.focus();
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
            yoConfiezo.click();
            yoConfiezo.focus();
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
            actoContriccion.click();
            actoContriccion.focus();
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
            magnificat.click();
            magnificat.focus();
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
            SenorMisericordia.click();
            SenorMisericordia.focus();
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
            OracionManana.click();
            OracionManana.focus();
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
            SanJose.focus();
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
            GraciaArrepentimiento.click();
            GraciaArrepentimiento.focus();
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
            JesusCrusificado.click();
            JesusCrusificado.focus();
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
            QuedateConmigo.click();
            QuedateConmigo.focus();
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
            CoronillaDivinaMisericordia.click();
            CoronillaDivinaMisericordia.focus();
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
            SanMiguelArcangel.click();
            SanMiguelArcangel.focus();
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
            Angelus.click();
            Angelus.focus();
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
            LlagaHombroJesus.click();
            LlagaHombroJesus.focus();
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
            ConsagraciónVirgenMariaMaximiliano.click();
            ConsagraciónVirgenMaria.focus();
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
            SantaBirigida12anos.click();
            SantaBirigida12anos.focus();
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
            SantoRosario.click();
            SantoRosario.focus();
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
            SantaBirigida1anos.click();
            SantaBirigida1anos.focus();
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
            sietedoloresVirgen.click();
            sietedoloresVirgen.focus();
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
            EspirituSanto.click();
            EspirituSanto.focus();
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
            DivinoNinoJesus.click();
            DivinoNinoJesus.focus();
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
            AlmasPurgatorio.click();
            AlmasPurgatorio.focus();
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
            ConsagraciónVirgenMaria.click();
            ConsagraciónVirgenMaria.focus();
        },750);
    });

    //Especial-END
    //Especial-Guias-Coros
    const GuiaDeMisaS = document.querySelector('.GuiaMisa-refS');
    var  GuiaDeMisa = document.querySelector('#CardGuiaMisa-ref');
    const RitosInicialesS = document.querySelector('.RitosIniciales-refS');
    var RitosIniciales = document.querySelector('#CardCoroRitosIniciales-ref');
    const GloriaS = document.querySelector('.Gloria-refS');
    var Gloria = document.querySelector('#CardCorosGloria-ref');
    const SalmoResponsorialS = document.querySelector('.SalmoResponsorial-refS');
    var SalmoResponsorial = document.querySelector('#CardCorosSalmoResponsorial-ref');
    const OfertorioS = document.querySelector('.Ofertorio-refS');
    var Ofertorio = document.querySelector('#CardCorosOfertorio-ref');
    const SantoS = document.querySelector('.Santo-refS');
    var Santo = document.querySelector('#CardCorosSanto-ref');
    const ComunionS = document.querySelector('.Comunion-refS');
    var Comunion = document.querySelector('#CardCorosComunion-ref');
    const CorosFinalS = document.querySelector('.CorosFinal-refS');
    var CorosFinal = document.querySelector('#CardCorosFinal-ref');

    var accordionButton5 = document.getElementById('accordion-open5');
    accordionButton5.addEventListener('click', function(){
        if(accordionOPEN5 === false){
            accordionOPEN5 = true;
        } else if(accordionOPEN5 === true){
            accordionOPEN5 = false;
        }
    }) 

    GuiaDeMisaS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            GuiaDeMisa.scrollIntoView();
            
        },750);
    });

    RitosInicialesS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            RitosIniciales.scrollIntoView();
        },750);
    });
    GloriaS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            Gloria.scrollIntoView();
        },750);
    });
    SalmoResponsorialS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            SalmoResponsorial.scrollIntoView();
        },750);
    });
    OfertorioS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            Ofertorio.scrollIntoView();
        },750);
    });
    SantoS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            Santo.scrollIntoView();
        },750);
    });
    ComunionS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            Comunion.scrollIntoView();
        },750);
    });
    CorosFinalS.addEventListener('click', function(){     
        setTimeout(function(){
            btnClose.click();
        },500);
        
        if(!accordionOPEN5){
            setTimeout(function(){
                accordion5.click();
            },250);
        } 
        setTimeout(function(){                    
            CorosFinal.scrollIntoView();
        },750);
    });
});

//Especial-Guias-Coros END
// clicks para redireccionar correctamente los #ref(accordion 4) 
document.addEventListener('DOMContentLoaded', function(){
    var scrollright4 = document.querySelectorAll('.scroll4');
    var accordion4 = document.getElementById('accordion-open4');

    scrollright4.forEach(function(click4){
        click4.addEventListener('click', function(){            
            setTimeout(function(){
                accordion4.scrollIntoView({ behavior: "smooth" });
            },850);
        });
    });
});