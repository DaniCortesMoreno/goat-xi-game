# ⚽ Goat-XI — Web App Football Simulation & Draft

**Goat-XI** es una aplicación web interactiva de simulación de fútbol desarrollada con una arquitectura desacoplada (**Headless CMS**). El sistema combina una interfaz reactiva en el frontend con una base de datos histórica alojada en WordPress, permitiendo a los usuarios configurar tácticas, realizar drafts de jugadores históricos de LaLiga y simular partidos mediante un algoritmo estadístico.

---

## 🚀 Características Principales

- **Draft Interactivo de Jugadores:** Elección aleatoria de futbolistas de distintas épocas y equipos de LaLiga (por ejemplo, comparar a un jugador del Valencia 2001 con uno del Deportivo de La Coruña 2002).
- **Gestión Táctica:** Configuración dinámica de la formación antes de iniciar el draft (modos ofensivo, defensivo, etc.).
- **Algoritmo de Simulación:** Cálculo probabilístico de resultados, goles y eventos en base a las valoraciones medias de los 11 titulares frente a 19 equipos rivales históricos.
- **Arquitectura Desacoplada:** Frontend ligero conectado mediante API REST a un panel de administración en WordPress.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React.js, JavaScript (ES6+), Vite.
- **Backend (Headless CMS):** WordPress alojado en servidor de producción (Hostinger).
- **API & Datos:** WordPress REST API para la entrega de datos de jugadores, medias por temporada y escudos.
- **Estilos & UI:** CSS3 responsive / Componentes interactivos.

---

## ⚙️ Arquitectura del Sistema

┌─────────────────────────┐          REST API          ┌─────────────────────────┐
│     React Frontend      │  ◄──────────────────────►  │  WordPress Headless CMS │
│ (Draft, Tácticas, UI)   │    (Peticiones HTTP)       │ (Base de datos jug.)    │
└─────────────────────────┘                            └─────────────────────────┘