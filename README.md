🧢 Hood & Diamond
Descripción

Hood & Diamond es un e-commerce desarrollado como proyecto final del curso de React. La aplicación permite visualizar un catálogo de gorras deportivas, consultar el detalle de cada producto, administrar un carrito de compras y actualizar el stock utilizando una base de datos en MongoDB Atlas.

El proyecto está desarrollado bajo una arquitectura Full Stack, utilizando React para el frontend y Node.js con Express para el backend.

Tecnologías utilizadas
Frontend
React
JavaScript (ES6)
React Router DOM
Bootstrap 5
SweetAlert2
React Icons
CSS
Backend
Node.js
Express
MongoDB Atlas
Mongoose
CORS
Dotenv
Funcionalidades principales
Visualización del catálogo de productos.
Filtrado por categorías.
Visualización del detalle de cada producto.
Carrito de compras.
Aumento y disminución de cantidades.
Eliminación de productos del carrito.
Actualización automática del stock.
Persistencia de datos mediante MongoDB Atlas.
Checkout para finalizar la compra.
API REST para la gestión de productos.
Estructura del proyecto
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
Instalación
1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
2. Instalar las dependencias
Frontend
npm install
Backend
cd backend

npm install
Configuración de MongoDB Atlas

Dentro de la carpeta backend se debe crear un archivo llamado:

.env

con la siguiente variable:

MONGO_URI=tu_cadena_de_conexion

Este archivo no se incluye en el repositorio porque contiene información privada de conexión a la base de datos.

Ejecutar el proyecto
Iniciar el Backend

Ubicarse dentro de la carpeta backend y ejecutar:

npm start

o

node server.js

El servidor quedará disponible en:

http://localhost:3000
Iniciar el Frontend

Desde la carpeta principal ejecutar:

npm run dev

La aplicación se abrirá en:

http://localhost:5173
Endpoints disponibles

La API implementa las siguientes operaciones:

GET /productos
GET /productos/
POST /productos
PUT /productos/
DELETE /productos/

Estos endpoints permiten realizar el CRUD completo de productos almacenados en MongoDB Atlas.

Dependencias principales
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
Cors
Autor

Carlos Jonathan Rodriguez Osorio

Proyecto desarrollado como entrega final del curso de React.

Observaciones

Este proyecto fue desarrollado con fines educativos para poner en práctica los conceptos aprendidos durante el curso, incluyendo React, consumo de APIs, desarrollo de un backend con Express y almacenamiento de datos utilizando MongoDB Atlas.