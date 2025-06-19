// Detectar si estamos en el formulario o en el index
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("formularioCarga.html")) {
    inicializarFormulario();
  } else if (path.includes("index.html")) {
    renderizarArticulos();
  }
});

// Obtener artículos del Blog desde localStorage
function obtenerArticulos() {
  return JSON.parse(localStorage.getItem("articulos")) || [];
}

// Guardar los artículos del Blog en localStorage
function guardarArticulos(articulos) {
  localStorage.setItem("articulos", JSON.stringify(articulos));
}

// Inicializar formulario
function inicializarFormulario() {
  const form = document.getElementById("blogForm");
  const mensaje = document.getElementById("mensaje-exito");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const contenido = document.getElementById("contenido").value.trim();

    if (!titulo || !contenido) return;

    const nuevoArticulo = {
      titulo,
      contenido,
      fecha: new Date().toLocaleDateString("es-AR"),
    };

    const articulos = obtenerArticulos();
    articulos.unshift(nuevoArticulo); // Agrega al inicio
    guardarArticulos(articulos);

    mensaje.style.display = "block";
    form.reset();

    // Redirigir automáticamente al blog después de 1.5 segundos
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

// Renderizar artículos en el index
function renderizarArticulos() {
  const listaArticulos = document.getElementById("lista-articulos");
  const articulos = obtenerArticulos();

  if (!listaArticulos) return;

  listaArticulos.innerHTML = "";

  articulos.forEach((articulo) => {
    const div = document.createElement("div");
    div.className = "blog-container";

    div.innerHTML = `
      <h2>${articulo.titulo}</h2>
      <p>${articulo.contenido}</p>
      <div class="blog-footer">
        <p>Fecha de Publicación: ${articulo.fecha || "Fecha no disponible"}</p>
        <button disabled>leer completo</button>
      </div>
    `;

    listaArticulos.appendChild(div);
  });
}
