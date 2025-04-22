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
                <p class="descriptionCard">${evento.descripcion} es un texto de marcador de posición utilizado en diseño y publicación. </p>
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

//Eliminar un card 
document.addEventListener('DOMContentLoaded', function(){
  document.addEventListener('click', function(e) {
    const boton = e.target.closest('.delete-btn');
    if (!boton) return; // si no hizo clic en un botón delete, salta
  
    const id = boton.dataset.id;
  
    fetch(`http://localhost:3001/eventos/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log('Evento eliminado');
      boton.closest('.cardEvent').remove();
      
    });
    
  });
})