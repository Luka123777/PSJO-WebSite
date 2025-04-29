//offcanvas part
document.addEventListener('DOMContentLoaded', () => {
    var openOffcanvasEvent = document.getElementById('openOffcanvasEvents');
    var offcanvasImprovise = document.getElementById('offcanvas');

    document.getElementById('closeOffcanvas').addEventListener('click', function(close){
        offcanvasImprovise.classList.remove("open");
    });

   openOffcanvasEvent.addEventListener('click', function(){
        offcanvasImprovise.classList.add("open");
   })
});
//SweetAlert para el boton de search
let aviso = document.querySelectorAll('.sweet');
const originalOverflow = document.body.style.overflow;

aviso.forEach(function(search){
  search.addEventListener('click', function(){
    Swal.fire({
      title: '¡Hola!',
      text: 'Probando SweetAlert2 sin movimiento',
      scrollbarPadding: false,
      didOpen: () => {
        document.body.style.overflow = originalOverflow || 'auto';
        document.body.style.paddingRight = '0px';
      },
      willClose: () => {
        document.body.style.overflow = originalOverflow || 'auto';
      }
    });
  })
})

////PARTE DE BASE DE DATOS FETCH////

  document.addEventListener('DOMContentLoaded', () => {
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
      // Esto devuelve la fecha ya traducida al español
      const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

      // Reemplazamos "de" por "del" para el toque final
      return fechaFormateada.replace(' de ', ' del ').replace(' de ', ' de ');
    };

    //Eventos inexistentes
      function hayEventos(eventos){
        return Array.isArray(eventos) && eventos.length > 0;
      }

    // Obtener datos
    fetch('http://localhost:3001/eventos') //Asincrono
      .then(response => response.json())
      .then(data => {
        data.forEach(evento => {
        const div = document.createElement('div');
        div.classList.add('cardEvent', 'cardItem', 'rounded', 'border-3');

        const fechaEvento = new Date(evento.fecha_evento);
        const fechaHoy = new Date();
        fechaEvento.setHours(0, 0, 0, 0);
        fechaHoy.setHours(0, 0, 0, 0);

        const eventoFinalizado = fechaHoy > fechaEvento;
            //EXPLICAAAAAAR
          div.innerHTML = `
            <div class="img-content">
                <img src="/images/Events/bg-events-_1_.webp" alt="" class="img-fluid">
                <button type="button" class="btn btn-primary delete-btn" data-id="${evento.id}">
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
            
          `
          ;
  
          container.appendChild(div);
        });
  
        // Se ejecuta una vez el fetch terminado
        items = document.querySelectorAll('.cardEvent');
        showPage(currentPage);
      })
    .catch(error => console.error('Error al cargar eventos:', error));
  });

  fetch('http://localhost:3001/users')
  .then(response => response.json())
  .then(data => {

    let admin_user = data[0].nombre;
    let admin_senha = data[0].senha;
   

    document.addEventListener('click', function(e) {
      const boton = e.target.closest('.delete-btn');
      if (!boton) return;
    
      const id = boton.dataset.id;
    
      Swal.fire({
        title: '¿Seguro que quieres eliminar el card?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        scrollbarPadding: false,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        didOpen: () => {
          document.body.style.overflow = originalOverflow || 'auto';
          document.body.style.paddingRight = '0px';
        },
        willClose: () => {
          document.body.style.overflow = originalOverflow || 'auto';
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
              document.body.style.overflow = originalOverflow || 'auto';
              document.body.style.paddingRight = '0px';
            },
            willClose: () => {
              document.body.style.overflow = originalOverflow || 'auto';
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
                    document.body.style.overflow = originalOverflow || 'auto';
                    document.body.style.paddingRight = '0px';
                  },
                  willClose: () => {
                    document.body.style.overflow = originalOverflow || 'auto';
                  }
                });
                fetch(`http://localhost:3001/eventos/${id}`, {
                  method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                  boton.closest('.cardEvent').remove();
                  showPage(currentPage);
                });
              } else {
                Swal.fire({
                  title:'Error',
                  text: 'Usuario o contraseña incorrectos.',
                  icon: 'error',
                  scrollbarPadding: false,
                  didOpen: () => {
                    document.body.style.overflow = originalOverflow || 'auto';
                    document.body.style.paddingRight = '0px';
                  },
                  willClose: () => {
                    document.body.style.overflow = originalOverflow || 'auto';
                  }
                });
              }
            }
          });
        }
      });
    });
  })

//Eliminar un event

