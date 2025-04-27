import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { stripeConfig } from '@/config/stripeConfig';

interface StripePaymentButtonProps {
  amount: number;
  description: string;
}

const StripePaymentButton: React.FC<StripePaymentButtonProps> = ({ amount, description }) => {
  const navigate = useNavigate();
  
  const handlePayment = () => {
    // Enregistrer les détails de la transaction dans sessionStorage
    sessionStorage.setItem('paymentDetails', JSON.stringify({
      amount,
      description,
      paymentMethod: 'stripe'
    }));
    
    // Rediriger vers la page de checkout de Stripe
    navigate('/checkout?method=stripe');
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        className="bg-[#6772e5] hover:bg-[#5469d4] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center w-full transition-all duration-300 hover:shadow-lg"
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Payer {amount}€ par carte
      </button>
      
      <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
        <Lock className="h-3 w-3 mr-1" />
        <span>Paiement sécurisé via Stripe</span>
      </div>
    </div>
  );
};

export default StripePaymentButton;