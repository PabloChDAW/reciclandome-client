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

            fetch('https://reciclandome-api-main-laravelcloud-4b3jba.laravel.cloud/api/paypal/payment-completed', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
              },
              body: JSON.stringify({ details, cart }),
            }).then(() => {
              
              console.log("Pago completado y datos enviados.");
              localStorage.removeItem('cart');

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
      script.src = "https://www.paypal.com/sdk/js?client-id=ASeKkHv-w1ERhCiGQHtgmzGSNdFWqVqXUPCUtavDvPw_Yk2vd9x-h1lt_R2M44fv6Ghu2C6J6BajAdoG&currency=EUR";
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
