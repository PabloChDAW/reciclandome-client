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

          const userToken = localStorage.getItem('token');

          return actions.order.capture().then((details) => {

            fetch('http://localhost:5173/api/paypal/payment-completed', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
              },
              body: JSON.stringify({ details, cart }),
            }).then(() => {
              console.log("Pago completado y datos enviados.");
              setTimeout(() => {
                window.location.href = "/thanks";
              }, 1000); // espera 1 segundo
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
      className="flex justify-center items-center w-full sm:min-w-[450px] p-4 rounded-md shadow"
    ></div>

  );
}
