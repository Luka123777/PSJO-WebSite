//Paginacion de eventos

document.addEventListener('DOMContentLoaded', () => {
  const itemsPerPage = 3;
  let currentPage = 1;

  const items = document.querySelectorAll('.cardEvent');
  const pageIndicator = document.getElementById('page-indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });

    pageIndicator.textContent = `Página ${page}`;
  }

  function nextPage() {
    const maxPage = Math.ceil(items.length / itemsPerPage);
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

  // Mostrar la primera página al cargar
  showPage(currentPage);
});

document.getElementById("mostrarEventos").addEventListener("click", () => {
    fetch("http://localhost:3001/eventos") // Llamada a la API
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            const container = document.getElementById("eventosContainer");
            container.innerHTML = ""; // Limpiar antes de agregar nuevos eventos

            if (data.length === 0) {
                container.innerHTML = "<p>No hay eventos disponibles.</p>";
                return;
            }

            // Crear elementos para cada evento
            data.forEach(evento => {
                let eventoDiv = document.createElement("div");
                eventoDiv.classList.add("evento"); 

                let fechaAmigable = new Date(evento.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                eventoDiv.innerHTML = `
                    <h3>${evento.titulo}</h3>
                    <p><strong>Fecha:</strong> ${fechaAmigable}</p>
                    <p>${evento.descripcion}</p>
                    <hr>
                `;

                container.appendChild(eventoDiv);
            });
        })
        .catch(error => console.error("Error al obtener los eventos:", error));
});