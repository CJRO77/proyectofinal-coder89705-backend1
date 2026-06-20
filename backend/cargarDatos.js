require("dotenv").config();
const mongoose = require("mongoose");
const Producto = require("./models/Productos"); // Tu modelo
const productosJSON = require("./productos.json"); // Tus datos actuales

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado para cargar datos...");

    // Esto borra lo que haya antes para no duplicar (¡cuidado si ya tenías datos importantes!)

    await Producto.deleteMany();

    // Esto inserta todo el JSON de una vez, es más eficiente que hacerlo uno por uno

    await Producto.insertMany(productosJSON);

    console.log("¡Datos cargados con éxito en MongoDB!");
    process.exit();
  })
  .catch((err) => console.error("Error al cargar:", err));
