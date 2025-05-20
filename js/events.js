document.addEventListener('DOMContentLoaded', () => {
  //offcanvas part
  var openOffcanvasEvent = document.getElementById('openOffcanvasEvents');
  var offcanvasImprovise = document.getElementById('offcanvas');

  document.getElementById('closeOffcanvas').addEventListener('click', function(close){
      offcanvasImprovise.classList.remove("open");
  });

  openOffcanvasEvent.addEventListener('click', function(){
      offcanvasImprovise.classList.add("open");
  });

  //Modal bootstrap para el boton de search
  const lista = document.getElementById('eventResultados');
  let ItemShow = document.querySelector('.ItemShow-container');
  async function buscarTitulo(){
    const inputContent = document.getElementById('dataEventSearch').value.trim();

    if(!inputContent) return;

    let response = await fetch(`http://localhost:3001/eventos/titulo?nombre=${encodeURIComponent(inputContent)}`);
    //? = Empieza el query param
    //nombre = clave
    //${encodeURIComponent(inputContent)} = valor
    let datosJson = await response.json();

    mostrarResultados(datosJson);
  };

  function MostrarEventoBuscado(dataEvent){
    const div = document.createElement('div');
    div.classList.add('cardmodalEvent', 'cardItem', 'rounded', 'border-3');

    const fechadataEvent = new Date(dataEvent.fecha_evento);
    const fechaHoy = new Date();
    fechadataEvent.setHours(0, 0, 0, 0);
    fechaHoy.setHours(0, 0, 0, 0);

    const eventoFinalizado = fechaHoy > fechadataEvent;

    div.innerHTML = `
          <div class="img-content">
              <img src="${dataEvent.images}" alt="" class="img-fluid">
          </div>
          <div class="text-content">
              <h3 class="tituloCard">${dataEvent.titulo}</h3>
              <p class="descriptionCard">${dataEvent.descripcion}</p>
              <p class="dateCard">
                  <span><strong>Fecha del evento: </strong>${formatearFecha(dataEvent.fecha_evento)} - ${dataEvent.hora_evento.slice(0,5)}</span>
                  <span class="event-ended rounded" style="display: ${eventoFinalizado ? 'block' : 'none'};"><strong>¡EVENTO FINALIZADO!</strong></span>
                  </p>
          </div>
          
        `;
        ItemShow.appendChild(div);

  }
  function mostrarResultados(eventos){
    lista.innerHTML = '';

    if (eventos.length === 0){
      lista.innerHTML = '<li class="list-group-item fw-semibold fst-italic">No se encontraron eventos <i class="bi bi-emoji-frown-fill"></i> </li>'
      return;
    }
    eventos.forEach(evento => {
      const item = document.createElement('a');
      item.classList.add('list-group-item');

      item.textContent = evento.titulo;
      lista.appendChild(item); 

      item.addEventListener('click', function(){
        lista.innerHTML = ""
        eventoDatos = evento;
        MostrarEventoBuscado(eventoDatos);

      })
    })
  }
  let buttonSearch = document.querySelector('#eventSearch');
  buttonSearch.addEventListener('click', function(){
    lista.innerHTML = ""
    ItemShow.innerHTML = ""
    buscarTitulo();
  });

  //PARTE DE BASE DE DATOS FETCH////
  //get events
  async function RecargarEventos(){
    try{
      let response = await fetch('http://localhost:3001/eventos');
      let eventoDatos = await response.json();
      eventoDatos.reverse();

      container.innerHTML = '';

      //Eventos inexistentes
      if(eventoDatos.length === 0){
        let SinDatos = document.createElement('div');
        SinDatos.classList.add('SinEvento', 'rounded')
        SinDatos.innerHTML = 'Sin eventos... por el momento <i class="bi bi-emoji-laughing-fill"></i>';

        container.appendChild(SinDatos)
      }

      eventoDatos.forEach(evento =>{
        const div = document.createElement('div');
        div.classList.add('cardEvent', 'cardItem', 'rounded', 'border-3');

        const fechaEvento = new Date(evento.fecha_evento);
        const fechaHoy = new Date();
        fechaEvento.setHours(0, 0, 0, 0);
        fechaHoy.setHours(0, 0, 0, 0);

        const eventoFinalizado = fechaHoy > fechaEvento;

        div.innerHTML = `
          <div class="img-content">
              <img src="${evento.images}" alt="" class="img-fluid">
              <button type="button" class="btn btn-primary delete-btn" data-id="${evento.id}" data-images="${evento.images}">
                <i class="bi bi-trash"></i> 
              </button>
          </div>
          <div class="text-content">
              <h3 class="tituloCard">${evento.titulo}</h3>
              <p class="descriptionCard">${evento.descripcion}</p>
              <p class="dateCard">
                  <span><strong>Fecha del evento: </strong>${formatearFecha(evento.fecha_evento)} - ${evento.hora_evento.slice(0,5)}</span>
                  <span class="event-ended rounded" style="display: ${eventoFinalizado ? 'block' : 'none'};"><strong>¡EVENTO FINALIZADO!</strong></span>
              </p>
          </div>
          
        `;
        container.appendChild(div);
      })
      items = document.querySelectorAll('.cardEvent');
      showPage(currentPage);

    } catch(error){
      console.error('Error al recargar eventos', error);
    };
  };
  
  //Boton para test y parte de test:
  // let testButton = document.querySelector('#test');
  //   testButton.addEventListener('click', ()=>{
    
  // });

  const itemsPerPage = 3;
  let currentPage = 1;
  let items = [];

  const container = document.getElementById('eventosCreados');
  const pageIndicator = document.getElementById('page-indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function showPage(page) {
    const start = (page - 1) * itemsPerPage; //0
    const end = start + itemsPerPage; //3

    items.forEach((item, index) => {
      item.style.display = index >= start && index < end ? 'flex' : 'none';
    });
    pageIndicator.textContent = `Página ${page}`;

    if(page === 1){
      prevBtn.disabled = true; 
    } else if( page !== 1){
      prevBtn.disabled = false;
    }

    const maxPage = Math.ceil(items.length / itemsPerPage);
    if (page === maxPage) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }

  }

  function nextPage() {
    const maxPage = Math.ceil(items.length / itemsPerPage); //2
    if (currentPage < maxPage) {
      currentPage++;
      showPage(currentPage);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  }

  prevBtn.addEventListener('click', prevPage);
  nextBtn.addEventListener('click', nextPage);

  //Evento finalizado

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const opciones = {
      weekday: 'long',    // día de la semana
      day: 'numeric',     // día del mes
      month: 'long',      // mes completo
      year: 'numeric'     // año
    };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    return fechaFormateada.replace(' de ', ' del ').replace(' de ', ' de ');
  };

  // Obtener datos
  RecargarEventos();

  //get admins
  fetch('http://localhost:3001/users')
  .then(response => response.json())
  .then(data => {

    let admin_user = data[0].nombre;
    let admin_senha = data[0].senha;
    
    //Autenticacion para eliminar un evento
    document.addEventListener('click', function(e) {
      const boton = e.target.closest('.delete-btn');    
      const id = boton.dataset.id;
      const imagesDataDelete = boton.dataset.images;
    
      Swal.fire({
        title: '¿Seguro que quieres eliminar el card?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        scrollbarPadding: false,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        didOpen: () => {
          // document.body.style.overflow = originalOverflow || 'auto';
          // document.body.style.paddingRight = '0px';
        },
        willClose: () => {
          // document.body.style.overflow = originalOverflow || 'auto';
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Autenticación requerida',
            html: `
              <input type="text" id="username" class="swal2-input" placeholder="Usuario">
              <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
            `,
            icon: 'info',
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            scrollbarPadding: false,
            didOpen: () => {
              // document.body.style.overflow = originalOverflow || 'auto';
              // document.body.style.paddingRight = '0px';
            },
            willClose: () => {
              // document.body.style.overflow = originalOverflow || 'auto';
            },
            preConfirm: () => {
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              
              if (!username || !password) {
                Swal.showValidationMessage('Por favor completa ambos campos');
              }
    
              return { username, password};
            }
          }).then((loginResult) => {
            if (loginResult.isConfirmed) {
              const username = loginResult.value.username;
              const password = loginResult.value.password;
    
              if (username === admin_user && password === admin_senha) {
                Swal.fire({
                  title:'Eliminado',
                  text: 'El evento ha sido eliminado.',
                  icon: 'success',
                  scrollbarPadding: false,
                  didOpen: () => {
                    // document.body.style.overflow = originalOverflow || 'auto';
                    // document.body.style.paddingRight = '0px';
                    RecargarEventos();
                  },
                  willClose: () => {
                    // document.body.style.overflow = originalOverflow || 'auto';
                  }
                });
                //Elimina un evento seleccionado
                fetch(`http://localhost:3001/eventos/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ imagesDataDelete })
                })
                .then(res => res.json())
                .then(data => {
                  RecargarEventos();
                });
              } else {
                Swal.fire({
                  title:'Error',
                  text: 'Usuario o contraseña incorrectos.',
                  icon: 'error',
                  scrollbarPadding: false,
                  didOpen: () => {
                    // document.body.style.overflow = originalOverflow || 'auto';
                    // document.body.style.paddingRight = '0px';
                  },
                  willClose: () => {
                    // document.body.style.overflow = originalOverflow || 'auto';
                  }
                });
              }
            }
          });
        }
      });
    });
  })
  //create events
  //Evita que redirija la pagina haciendo un AJAX
  let formulary = document.querySelector('#NewEventContent');
  formulary.addEventListener('submit', async function (e) {
    e.preventDefault(); 
    function eventoCreadoExito(){
      localStorage.setItem('eventoExito', 'true');
    }
    function eventoCreadoSinExito(){
      localStorage.setItem('eventoFail', 'false');
    }

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3001/eventos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        eventoCreadoExito();
        form.reset();

      } else {
        eventoCreadoSinExito();
      }
    } catch (error) {
      console.error(error);
    }
  });

  //Avisos de exito o fail de la creacion de un evento
  if(localStorage.getItem('eventoFail') === 'false'){
    console.log("Evento creado sin exito");
    localStorage.removeItem('eventoFail');
  
    Swal.fire({
      title:'Error al crear el evento',
      text: 'Asegúrate de que todos los campos del formulario estén correctos.',
      icon: 'error',
      scrollbarPadding: false,
      // didOpen: () => {
      //   document.body.style.overflow = originalOverflow || 'auto';
      //   document.body.style.paddingRight = '0px';
      // },
      // willClose: () => {
      //   document.body.style.overflow = originalOverflow || 'auto';
      // }
    });
  } else if(localStorage.getItem("eventoExito") === "true"){
    localStorage.removeItem("eventoExito"); 
  
    Swal.fire({
      title:'Evento creado con éxito',
      icon: 'success',
      scrollbarPadding: false,
      // didOpen: () => {
      //   document.body.style.overflow = originalOverflow || 'auto';
      //   document.body.style.paddingRight = '0px';
      // },
      // willClose: () => {
      //   document.body.style.overflow = originalOverflow || 'auto';
      // }
    });
  };
});