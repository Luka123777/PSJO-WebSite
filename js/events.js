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
  
  // document.getElementById("mostrarEventos").addEventListener("click", () => {
  //   fetch("http://localhost:3001/eventos") // Llamada a la API
  //   .then(response => response.json()) // Convertimos la respuesta a JSON
  //   .then(data => {
  //     const container = document.getElementById("eventosContainer");
  //     container.innerHTML = ""; // Limpiar antes de agregar nuevos eventos

  //     if (data.length === 0) {
  //         container.innerHTML = "<p>No hay eventos disponibles.</p>";
  //         return;
  //     }

  //     // Crear elementos para cada evento
  //     data.forEach(evento => {
  //         let eventoDiv = document.createElement("div");
  //         eventoDiv.classList.add("evento"); 

  //         let fechaAmigable = new Date(evento.fecha).toLocaleDateString("es-ES", {
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric"
  //         });

  //         eventoDiv.innerHTML = `
  //             <h3>${evento.titulo}</h3>
  //             <p><strong>Fecha:</strong> ${fechaAmigable}</p>
  //             <p>${evento.descripcion}</p>
  //             <hr>
  //         `;

  //         container.appendChild(eventoDiv);
  //     });
  //   })
  //   .catch(error => console.error("Error al obtener los eventos:", error));
  // });

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
  
    // Obtener datos
    fetch('http://localhost:3001/eventos') //Asincrono
      .then(response => response.json())
      .then(data => {
        data.forEach(evento => {
          const div = document.createElement('div');
          div.classList.add('cardEvent', 'cardItem', 'rounded', 'border-3');
  
          div.innerHTML = `
            <div class="img-content">
                <img src="/images/Events/bg-events-_1_.webp" alt="" class="img-fluid rounded-end">
            </div>
            <div class="text-content">
                <h3 class="tituloCard">${evento.titulo}</h3>
                <p class="descriptionCard">${evento.descripcion} es un texto de marcador de posición utilizado en diseño y publicación. </p>
                <p class="dateCard">
                    <span><strong>Fecha del evento: </strong>${new Date(evento.fecha_evento).toLocaleDateString()}</span>
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