🧢 Hood & Diamond
📖 Descripción

Hood & Diamond es un e-commerce desarrollado como proyecto final del curso de Backend 1.

La aplicación permite:

Visualizar un catálogo de gorras deportivas.
Filtrar productos por categoría.
Consultar el detalle de cada producto.
Administrar un carrito de compras.
Actualizar el stock en tiempo real mediante MongoDB Atlas.
Finalizar la compra mediante un proceso de Checkout.

El proyecto fue desarrollado bajo una arquitectura Full Stack, utilizando React para el frontend y Node.js + Express para el backend.

🚀 Tecnologías utilizadas
Frontend
React
JavaScript (ES6)
React Router DOM
Bootstrap 5
SweetAlert2
React Icons
CSS3
Backend
Node.js
Express
MongoDB Atlas
Mongoose
CORS
Dotenv
✨ Funcionalidades
Catálogo de productos.
Filtrado por categorías.
Vista detallada de cada producto.
Carrito de compras.
Incremento y disminución de cantidades.
Eliminación de productos.
Actualización automática del stock.
Persistencia de datos en MongoDB Atlas.
Checkout de compra.
API REST para administrar productos.
📂 Estructura del proyecto
Hood-Diamond
│
├── backend
│   ├── models
│   ├── server.js
│   ├── productos.json
│   ├── package.json
│   └── .env
│
├── public
│
├── src
│   ├── components
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│
├── package.json
└── README.md
⚙️ Instalación
Clonar el repositorio
git clone https://github.com/CJRO77/proyectofinal-coder89705-backend1.git
Instalar dependencias
Frontend
npm install
Backend
cd backend
npm install
🌐 Configuración de MongoDB Atlas

Dentro de la carpeta backend crear un archivo llamado:

.env

Agregar la siguiente variable:

MONGO_URI=tu_cadena_de_conexion

Importante: El archivo .env no se incluye en el repositorio porque contiene información privada.

▶️ Ejecutar el proyecto
Backend
cd backend
npm start

o

node server.js

Servidor:

http://localhost:3000
Frontend

Desde la carpeta principal:

npm run dev

Aplicación:

http://localhost:5173
🔗 Endpoints disponibles
Método	Endpoint	Descripción
GET	/productos	Obtener todos los productos
GET	/productos/	Obtener un producto por ID
POST	/productos	Crear un producto
PUT	/productos/	Actualizar un producto
DELETE	/productos/	Eliminar un producto

Estos endpoints permiten realizar el CRUD completo de productos almacenados en MongoDB Atlas.

📦 Dependencias principales
Frontend
React
React Router DOM
Bootstrap
SweetAlert2
React Icons
Backend
Express
Mongoose
Dotenv
CORS
👨‍💻 Autor

Carlos Jonathan Rodriguez Osorio

Proyecto desarrollado como entrega final del curso de Backend1

📌 Observaciones

Este proyecto fue desarrollado con fines educativos para poner en práctica los conocimientos adquiridos durante el curso de Backend1, integrando un frontend moderno con React, un backend construido con Express y una base de datos MongoDB Atlas mediante Mongoose.