// 🔐 Claves de API
const clientId = "fYGGj20Afgl8oTdYjLnysXbsUGZS7mGdFCjKv2PEaGyc5Lsqn8";
const clientSecret = "fYGGj20Afgl8oTdYjLnysXbsUGZS7mGdFCjKv2PEaGyc5Lsqn8";

let accessToken = "";
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const qInput = document.getElementById("q");
const buscarBtn = document.getElementById("boton");
const resultsSection = document.getElementById("results");
const mascotasContainer = document.getElementById("mascotas-container");
const favoritosContainer = document.getElementById("favoritos-container");
const favoritesSection = document.getElementById("favorites");
const detalleSection = document.getElementById("details-view");
const detalleMascota = document.getElementById("detalle-mascota");

document.getElementById("ver-resultados").addEventListener("click", () => {
  resultsSection.style.display = "block";
  favoritesSection.style.display = "none";
  detalleSection.style.display = "none";
});

document.getElementById("ver-favoritos").addEventListener("click", () => {
  resultsSection.style.display = "none";
  favoritesSection.style.display = "block";
  detalleSection.style.display = "none";
  mostrarFavoritos();
});

document.getElementById("volver").addEventListener("click", () => {
  detalleSection.style.display = "none";
  resultsSection.style.display = "block";
});

// Obtener token de acceso
async function obtenerToken() {
  try {
    const res = await fetch("https://api.petfinder.com/v2/oauth2/ fYGGj20Afgl8oTdYjLnysXbsUGZS7mGdFCjKv2PEaGyc5Lsqn8", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });

    if (!res.ok) throw new Error("Error al obtener token");

    const data = await res.json();
    accessToken = data.access_token;
    console.log("Token obtenido:", accessToken);
    obtenerMascotas(); // mostrar mascotas
  } catch (error) {
    console.error("Fallo al obtener token:", error);
    mascotasContainer.innerHTML = "<p style='color:red'>Error al conectar con la API. Verifica las claves.</p>";
  }
}


// Buscar mascotas
buscarBtn.addEventListener("click", () => {
  const query = qInput.value.trim();
  if (query) {
    buscarMascotas(query);
  }
});

async function buscarMascotas(query) {
  mascotasContainer.innerHTML = "Cargando...";
  const res = await fetch(`https://api.petfinder.com/v2/animals?type=${query}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await res.json();
  renderMascotas(data.animals);
}

// Mostrar mascotas iniciales (por defecto: perros)
async function obtenerMascotas() {
  mascotasContainer.innerHTML = "Cargando...";
  const res = await fetch("https://api.petfinder.com/v2/animals?type=dog", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await res.json();
  renderMascotas(data.animals);
}

// Renderizar tarjetas
function renderMascotas(mascotas) {
  mascotasContainer.innerHTML = "";
  mascotas.forEach(mascota => {
    const card = document.createElement("div");
    card.className = "mascota-card";
    card.innerHTML = `
      <button class="favorito-btn" data-id="${mascota.id}">
        ${favoritos.includes(mascota.id) ? "❤️" : "🤍"}
      </button>
      <img src="${mascota.photos[0]?.medium || './storage/img/logomascota.png'}" alt="${mascota.name}">
      <h3>${mascota.name}</h3>
      <p>${mascota.species} - ${mascota.breeds.primary || "Sin raza"}</p>
      <p>${mascota.age} - ${mascota.contact.address.city || "Sin ciudad"}</p>
      <button class="detalle-btn" data-id="${mascota.id}">Ver detalles</button>
    `;
    mascotasContainer.appendChild(card);
  });
  agregarEventos();
}

function agregarEventos() {
  document.querySelectorAll(".favorito-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      if (favoritos.includes(id)) {
        favoritos = favoritos.filter(f => f !== id);
        btn.textContent = "🤍";
      } else {
        favoritos.push(id);
        btn.textContent = "❤️";
      }
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });
  });

  document.querySelectorAll(".detalle-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      mostrarDetalle(data.animal);
    });
  });
}

function mostrarFavoritos() {
  favoritosContainer.innerHTML = "";
  favoritos.forEach(async id => {
    const res = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await res.json();
    const mascota = data.animal;
    const card = document.createElement("div");
    card.className = "mascota-card";
    card.innerHTML = `
      <img src="${mascota.photos[0]?.medium || './storage/img/logomascota.png'}" alt="${mascota.name}">
      <h3>${mascota.name}</h3>
      <p>${mascota.species} - ${mascota.breeds.primary || "Sin raza"}</p>
      <p>${mascota.age} - ${mascota.contact.address.city || "Sin ciudad"}</p>
    `;
    favoritosContainer.appendChild(card);
  });
}

function mostrarDetalle(mascota) {
  detalleSection.style.display = "block";
  resultsSection.style.display = "none";
  favoritesSection.style.display = "none";

  detalleMascota.innerHTML = `
    <img src="${mascota.photos[0]?.medium || './storage/img/logomascota.png'}" alt="${mascota.name}">
    <h2>${mascota.name}</h2>
    <p><strong>Especie:</strong> ${mascota.species}</p>
    <p><strong>Raza:</strong> ${mascota.breeds.primary || "Sin raza"}</p>
    <p><strong>Edad:</strong> ${mascota.age}</p>
    <p><strong>Tamaño:</strong> ${mascota.size}</p>
    <p><strong>Ubicación:</strong> ${mascota.contact.address.city || ""}, ${mascota.contact.address.state || ""}</p>
    <p><strong>Contacto:</strong> <a href="${mascota.url}" target="_blank">Ver en Petfinder</a></p>
  `;
}

// Iniciar aplicación
obtenerToken();
