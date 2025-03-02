
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalPaymentButtonProps {
  amount: string;
  description: string;
}

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({ amount, description }) => {
  const handlePaymentSuccess = (details: any) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
  };

  return (
    <PayPalScriptProvider options={{ 
      clientId: "test", 
      currency: "EUR" 
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "EUR"
                },
                description: description
              }
            ]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then(handlePaymentSuccess);
        }}
        style={{ layout: "horizontal" }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPaymentButton;
