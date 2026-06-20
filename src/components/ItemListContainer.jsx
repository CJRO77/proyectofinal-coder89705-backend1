import Card from './Card';
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

function ItemListContainer() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);

  // Centralizamos la petición al backend en una sola función limpia

  const pedirProductos = useCallback(() => {
    fetch("http://localhost:3000/productos")
      .then(res => res.json())
      .then(data => {

        // Filtramos por categoría si existe en la URL, si no, mostramos todos

        const filtrados = categoria
          ? data.filter(prod => prod.category === categoria)
          : data;
        
        setProductos(filtrados);
      })
      .catch(err => console.log("Error al traer productos:", err));
  }, [categoria]); // Se recrea solo si cambia la categoría en la URL

  // Efecto para la carga inicial y cuando el usuario cambia de sección/categoría

  useEffect(() => {
    pedirProductos();
  }, [pedirProductos]);

  // Efecto exclusivo para escuchar los cambios de stock desde el carrito o checkout

  useEffect(() => {

    // Al usar pedirProductos directamente, evitamos re-escribir el fetch

    window.addEventListener("stockUpdated", pedirProductos);

    return () => {
      window.removeEventListener("stockUpdated", pedirProductos);
    };
  }, [pedirProductos]);

  return (
    <section>
      <h1>Tu tienda de gorras y accesorios de moda</h1>

      <div className="item-list">
        {productos.map(product => (
          <Card 
            key={product._id} // Usamos _id de MongoDB
            product={product}
            setProductos={setProductos}
          />
        ))}
      </div>
    </section>
  );
}

export default ItemListContainer;