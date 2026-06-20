import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); 

  const [buyer, setBuyer] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const finalizarCompra = async (e) => {
    e.preventDefault();
    
    // Validar datos del comprador

    if (!buyer.nombre || !buyer.email || !buyer.telefono) {
      Swal.fire({
        title: "Faltan datos",
        text: "Por favor, completa todos los campos de contacto.",
        icon: "warning",
        confirmButtonColor: "#3483fa"
      });
      return;
    }

    // Validar método de pago

    if (!paymentMethod) {
      Swal.fire({
        title: "Método de pago",
        text: "Por favor, selecciona un método de pago.",
        icon: "warning",
        confirmButtonColor: "#3483fa"
      });
      return;
    }

    // Crear objeto de orden con la información del comprador, los productos y el total

    const orden = {
      buyer,
      items: cart,
      total,
      paymentMethod,
      status: "pendiente",
      date: new Date()
    };

    try {
      // Guardar orden en tu Backend (MongoDB)

      const response = await fetch("http://localhost:3000/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orden)
      });

      if (!response.ok) {
        throw new Error("Error al guardar la orden en la base de datos");
      }

      const data = await response.json();
      
      // Vaciar carrito después de guardar la orden

      clearCart();

      // Mostrar la alerta de éxito

      Swal.fire({
        title: "¡Compra Exitosa!",

        // Uso data._id que es el ID generado por MongoDB

        text: `Tu compra fue procesada con éxito. Tu número de orden es: ${data._id}. Pronto te enviaremos un correo con tu factura.`,
        icon: "success",
        confirmButtonText: "Volver a la tienda",
        confirmButtonColor: "#3483fa",
        allowOutsideClick: false, 
      }).then((result) => {
        if (result.isConfirmed) {

          // Redirigir al inicio al cerrar la alerta

          navigate("/"); 
        }
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar tu orden. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#3483fa"
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Checkout
      </h2>

      <form
        onSubmit={finalizarCompra}
        style={{
          maxWidth: "500px",
          margin: "0 auto"
        }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <h4 className="mb-4">
          Total: ${total.toLocaleString()}
        </h4>

        // Sección de método de pago 

        <div className="mb-4">
          <h4 className="mb-3 text-center fw-bold">
            Método de pago
          </h4>

          <div className="card p-4 shadow-sm border-0 rounded-4">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="transferencia"
                value="Transferencia bancaria"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="transferencia"
              >
                Transferencia bancaria
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="mercadopago"
                value="Mercado Pago"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="mercadopago"
              >
                Mercado Pago
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="tarjeta"
                value="Tarjeta de crédito"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="tarjeta"
              >
                Tarjeta de crédito
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="efectivo"
                value="Efectivo"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="efectivo"
              >
                Efectivo
              </label>
            </div>
          </div>

          // Logos de medios de pago

          <div className="payment-logos text-center mt-4">
            <p className="fw-semibold mb-3">
              Medios de pago aceptados
            </p>

            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <img
                src="/imgs/mercadopago.jpg"
                alt="Mercado Pago"
                className="payment-logo"
                style={{ width: "50px", height: "auto" }}
              />

              <img
                src="/imgs/visa.png"
                alt="Visa"
                className="payment-logo"
                style={{ width: "50px", height: "auto" }}
              />

              <img
                src="/imgs/mastercard.png"
                alt="Mastercard"
                className="payment-logo"
                style={{ width: "50px", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Finalizar compra
        </button>
      </form>
    </div>
  );
}

export default Checkout;