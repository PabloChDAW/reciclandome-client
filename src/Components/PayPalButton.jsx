// Components/PayPalButton.js
import { useEffect, useRef } from "react";

export default function PayPalButton({ amount, cart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderButton = () => {
      // Limpia el contenedor antes de renderizar de nuevo
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45,
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2),
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('✅ Pago realizado por ' + details.payer.name.given_name);

            fetch('http://localhost:8000/api/paypal/payment-completed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ details, cart }),
            }).then(() => {
              window.location.href = "/thanks";
            });
          });
        },
      }).render(containerRef.current);
    };

    // Cargar el script solo una vez
    const existingScript = document.querySelector("#paypal-sdk");
    if (existingScript) {
      if (window.paypal) renderButton();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=Afr5lcAhTfWtrQJaPsqxhTieflEhzxyN1xBsA_CTTh82R2ZgAtAoJoFEJsaS9EbC5-LtDxIXMuiQmy1F&currency=EUR";
      script.id = "paypal-sdk";
      script.onload = () => renderButton();
      document.body.appendChild(script);
    }
  }, [amount]); // ❗ Solo depende de `amount`, no `cart`

  return (
    <div
      ref={containerRef}
      className="w-full sm:min-w-[320px] p-4 bg-gray-50 rounded-md shadow"
    ></div>

  );
}
