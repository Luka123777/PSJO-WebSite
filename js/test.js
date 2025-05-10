async function cargarEventos() {
  try {
    // Hacemos el fetch y esperamos la respuesta
    const respuesta = await fetch('http://localhost:3001/eventos');
    const data = await respuesta.json(); // Convertimos la respuesta a JSON

    // Iteramos sobre los eventos obtenidos
    data.forEach(evento => {
      const div = document.createElement('div');
      div.classList.add('cardEvent', 'cardItem', 'rounded', 'border-3');

      // Calculamos las fechas para verificar si el evento ya pasó
      const fechaEvento = new Date(evento.fecha_evento);
      const fechaHoy = new Date();
      fechaEvento.setHours(0, 0, 0, 0);
      fechaHoy.setHours(0, 0, 0, 0);

      const eventoFinalizado = fechaHoy > fechaEvento;

      // Construimos el contenido HTML de la tarjeta
      div.innerHTML = `
        <div class="img-content">
            <img src="${evento.images}" alt="" class="img-fluid">
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
      `;
      container.appendChild(div);
    });

    // Se ejecuta al terminar de cargar los eventos
    items = document.querySelectorAll('.cardEvent');
    showPage(currentPage);
  } catch (error) {
    // Manejamos cualquier error que ocurra durante el fetch o el procesamiento
    console.error('Error al cargar eventos:', error);
  }
}

// Llamamos a la función para cargar los eventos
cargarEventos();