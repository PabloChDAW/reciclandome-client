// Components/PayPalButton.js
import { useEffect } from "react";

export default function PayPalButton({ amount, cart }) {
  useEffect(() => {
    const existingScript = document.querySelector("#paypal-sdk");
    if (existingScript) {
      renderButton();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=Afr5lcAhTfWtrQJaPsqxhTieflEhzxyN1xBsA_CTTh82R2ZgAtAoJoFEJsaS9EbC5-LtDxIXMuiQmy1F&currency=EUR";
    script.id = "paypal-sdk";
    script.onload = () => renderButton();
    document.body.appendChild(script);

    function renderButton() {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 45
          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toFixed(2),
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert('✅ Pago realizado por ' + details.payer.name.given_name);

              fetch('http://localhost:8000/api/paypal/payment-completed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ details, cart })
              })
              .then(() => {
                // 🔁 Redirigir a la página de agradecimiento
                window.location.href = "/thanks";
              });
            });
          }
        }).render('#paypal-button-container');
      }
    }
  }, [amount, cart]);

  return (
    <div
      id="paypal-button-container"
      style={{ width: "100%", minWidth: 320 }}
    ></div>
  );
}
