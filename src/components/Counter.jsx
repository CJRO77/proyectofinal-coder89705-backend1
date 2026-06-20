export default function Counter({ stock, cantidad, setCantidad }) {

  // Funciones para sumar y restar la cantidad, respetando el stock disponible

  const sumar = () => {
    if (cantidad < stock) {
      setCantidad(prev => prev + 1);
    }
  };

  const restar = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  return (
    
    // contenedor del contador de la cantidad en el detalle del producto

    <div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          restar();
        }} 
        disabled={cantidad === 1}
      >
        -
      </button>

      <span style={{ margin: "0 10px" }}>{cantidad}</span>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          sumar();
        }} 
        disabled={cantidad === stock}
      >
        +
      </button>

      <p style={{ color: "black" }}>
        Stock disponible: {stock}
      </p>
    </div>
  );
}

