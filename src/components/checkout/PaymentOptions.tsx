import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, ArrowRight, CreditCard, Lock, Info } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OptimizedImage } from "../OptimizedImage";
import StripePayment from "./StripePayment";
import { PayPalButton } from "./PayPalButton";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "../ui/checkbox";
import { paypalConfig } from "@/config/paypalConfig";

// Définition inline du type PayPalOrderResponseData pour éviter les erreurs d'importation
interface PayPalOrderResponseData {
  id: string;
  status: string;
  payer: {
    email_address: string;
    payer_id: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
  purchase_units: Array<{
    reference_id?: string;
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
  create_time?: string;
  update_time?: string;
}

// Schéma de validation pour PayPal
const paypalFormSchema = z.object({
  acceptTerms: z.boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales",
    }),
});

interface PaymentOptionsProps {
  onPaymentComplete: (paymentId: string) => void;
  onGoBack?: () => void;
  amount: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onPaymentComplete,
  onGoBack,
  amount,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [validAmount, setValidAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState<boolean>(false);
  const { toast } = useToast();

  // Vérifie si le script PayPal est chargé
  useEffect(() => {
    const checkPayPalScript = () => {
      if (typeof window !== 'undefined' && window.paypal) {
        setPaypalScriptLoaded(true);
        console.log("PayPal SDK détecté ✅");
        return true;
      }
      return false;
    };

    if (!checkPayPalScript()) {
      const interval = setInterval(() => {
        if (checkPayPalScript()) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Validation du montant
  useEffect(() => {
    if (amount === undefined || amount === null) {
      setAmountError("Le montant n'est pas défini");
      return;
    }

    const numericAmount = Number(amount);
    
    if (isNaN(numericAmount)) {
      setAmountError("Le montant n'est pas un nombre valide");
      return;
    }

    if (numericAmount <= 0) {
      setAmountError("Le montant doit être supérieur à 0");
      return;
    }

    setValidAmount(numericAmount);
    setAmountError(null);
  }, [amount]);

  // Formulaire pour PayPal
  const paypalForm = useForm<z.infer<typeof paypalFormSchema>>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  // Gestionnaire pour le paiement PayPal avec le bouton intégré
  const handlePaypalSuccess = useCallback((details: PayPalOrderResponseData) => {
    // Vérifier que les données PayPal sont valides
    if (!details || !details.id) {
      toast({
        title: "Erreur de paiement",
        description: "Données de paiement incomplètes. Veuillez réessayer.",
        variant: "destructive",
      });
      return;
    }
    
    // Extraire un identifiant de paiement valide
    const paymentId = details.id;
    
    toast({
      title: "Paiement PayPal accepté",
      description: "Votre paiement a été traité avec succès.",
    });
    onPaymentComplete(paymentId);
  }, [toast, onPaymentComplete]);

  // Gestionnaire pour afficher le bouton PayPal après acceptation des conditions
  const handlePaypalFormSubmit = useCallback((values: z.infer<typeof paypalFormSchema>) => {
    if (values.acceptTerms && !amountError) {
      setShowPaypalButton(true);
    }
  }, [amountError]);

  // Gestionnaire d'erreur pour PayPal
  const handlePaypalError = useCallback((error: Error) => {
    toast({
      title: "Erreur de paiement",
      description: `Une erreur est survenue lors du paiement: ${error.message || "Erreur indéterminée"}`,
      variant: "destructive",
    });
    console.error("Erreur PayPal:", error);
    setShowPaypalButton(false);
  }, [toast]);

  // Gestionnaire pour le changement d'onglet
  const handleTabChange = useCallback((value: string) => {
    setPaymentMethod(value as "card" | "paypal");
    // Réinitialiser les états lors du changement d'onglet
    setShowPaypalButton(false);
    setIsProcessing(false);
  }, []);
  
  // Préparer l'affichage du montant formaté de manière sécurisée
  const formattedAmount = useMemo(() => {
    try {
      return validAmount.toFixed(2).replace('.', ',') + '€';
    } catch (error) {
      return '0,00€';
    }
  }, [validAmount]);

  // Si le montant n'est pas valide, afficher un message d'erreur
  if (amountError) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Erreur de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            <p className="font-semibold">Une erreur est survenue</p>
            <p>{amountError}</p>
          </div>
          {onGoBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onGoBack}
              className="flex items-center mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Moyen de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Informations de débogage PayPal pour les développeurs */}
        {import.meta.env.DEV && (
          <div className="mb-6 p-3 border border-blue-200 rounded-md bg-blue-50 text-xs">
            <div className="flex items-center gap-1 font-medium text-blue-800 mb-2">
              <Info size={16} />
              <span>Informations PayPal (mode développeur)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div>
                <span className="font-medium">Mode : </span>
                <span>{import.meta.env.MODE}</span>
              </div>
              <div>
                <span className="font-medium">Test actif : </span>
                <span>{paypalConfig.testMode ? "Oui" : "Non"}</span>
              </div>
              <div>
                <span className="font-medium">Script chargé : </span>
                <span>{paypalScriptLoaded ? "Oui ✅" : "Non ⛔"}</span>
              </div>
              <div>
                <span className="font-medium">Client ID : </span>
                <span>{paypalConfig.clientId 
                  ? `${paypalConfig.clientId.substring(0, 10)}...${paypalConfig.clientId.substring(paypalConfig.clientId.length - 5)}` 
                  : "Non défini ⛔"}</span>
              </div>
              <div>
                <span className="font-medium">Montant : </span>
                <span>{validAmount} €</span>
              </div>
            </div>
          </div>
        )}

        <Tabs 
          defaultValue="card" 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Carte bancaire</span>
            </TabsTrigger>
            <TabsTrigger value="paypal" className="flex items-center gap-2">
              <OptimizedImage 
                src="/assets/card/paypal-logo.svg" 
                alt="PayPal" 
                className="h-4" 
                width={20} 
                height={16} 
              />
              <span>PayPal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="w-full">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="/assets/card/card-visa.svg" 
                  alt="Visa" 
                  className="h-8 w-auto" 
                  width={48} 
                  height={32} 
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="/assets/card/card-mastercard.svg" 
                  alt="Mastercard" 
                  className="h-8 w-auto" 
                  width={48} 
                  height={32} 
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="/assets/card/card-amex.svg" 
                  alt="American Express" 
                  className="h-8 w-auto" 
                  width={48} 
                  height={32} 
                  loading="lazy"
                />
              </div>
            </div>

            {/* Intégration de Stripe pour le paiement par carte */}
            <StripePayment 
              onGoBack={onGoBack}
              paymentDetails={{
                amount: validAmount,
                description: "Paiement de services d'accompagnement social"
              }}
              onPaymentComplete={(paymentId) => onPaymentComplete(paymentId)}
            />
          </TabsContent>

          <TabsContent value="paypal" className="w-full">
            <div className="text-center mb-6">
              <img 
                src="/assets/card/paypal-logo-nom.svg" 
                alt="PayPal" 
                className="max-w-[120px] h-auto mx-auto mb-4" 
                width={120} 
                height={48}
              />
              <p className="text-gray-600">
                {showPaypalButton 
                  ? "Cliquez sur le bouton PayPal ci-dessous pour finaliser votre paiement" 
                  : `Vous allez être redirigé(e) vers PayPal pour finaliser votre paiement de ${formattedAmount}`}
              </p>
            </div>

            {!showPaypalButton ? (
              <Form {...paypalForm}>
                <form onSubmit={paypalForm.handleSubmit(handlePaypalFormSubmit)} className="space-y-4">
                  <FormField
                    control={paypalForm.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="accept-terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FormLabel htmlFor="accept-terms" className="font-normal">
                              J'accepte les conditions générales de vente et la politique de confidentialité
                            </FormLabel>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex flex-col md:flex-row justify-between gap-4">
                    {onGoBack && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onGoBack}
                        className="flex items-center"
                        disabled={isProcessing}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Modifier mes informations
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className="bg-[#0070ba] hover:bg-[#005ea6] text-white"
                      disabled={isProcessing || !paypalForm.formState.isValid}
                    >
                      <span>Continuer vers PayPal</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="mt-4">
                <PayPalButton
                  amount={validAmount}
                  onSuccess={handlePaypalSuccess}
                  onError={handlePaypalError}
                  clientData={{}} // Vous pouvez passer des informations client si disponibles
                />
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPaypalButton(false)}
                    className="w-full"
                  >
                    Retour
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center text-gray-600 text-sm">
            <Lock className="h-4 w-4 mr-1 text-green-500" />
            <span>Paiement 100% sécurisé</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;