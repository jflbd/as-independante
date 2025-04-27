import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { OptimizedImage } from "../OptimizedImage";
import StripePayment from "./StripePayment";
import PayPalPaymentButton from "../pricing/PayPalPaymentButton";
import { useToast } from "@/hooks/use-toast";

// Schéma de validation pour PayPal (simplifié car l'authentification se fait via PayPal)
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
  const { toast } = useToast();

  // Formulaire pour PayPal
  const paypalForm = useForm<z.infer<typeof paypalFormSchema>>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  // Gestionnaire pour le paiement PayPal
  const handlePaypalPayment = (values: z.infer<typeof paypalFormSchema>) => {
    setIsProcessing(true);
    // En mode test, on simule un paiement PayPal
    setTimeout(() => {
      const paymentId = "paypal_" + Math.random().toString(36).substring(2, 15);
      setIsProcessing(false);
      toast({
        title: "Paiement PayPal accepté",
        description: "Votre paiement a été traité avec succès.",
      });
      onPaymentComplete(paymentId);
    }, 2000);
  };

  // On peut également utiliser directement le composant PayPalPaymentButton
  const handlePayPalSuccess = () => {
    const paymentId = "paypal_" + Math.random().toString(36).substring(2, 15);
    onPaymentComplete(paymentId);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Moyen de paiement</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="card" 
          onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}
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
                  src="assets/card/card-visa.svg" 
                  alt="Visa" 
                  className="h-8 w-auto" 
                  width={48} 
                  height={32} 
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="assets/card/card-mastercard.svg" 
                  alt="Mastercard" 
                  className="h-8 w-auto" 
                  width={48} 
                  height={32} 
                  loading="lazy"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="assets/card/card-amex.svg" 
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
              amount={amount}
              onPaymentComplete={onPaymentComplete}
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
                Vous allez être redirigé(e) vers PayPal pour finaliser votre paiement de {amount.toFixed(2).replace('.', ',')}€
              </p>
            </div>

            <Form {...paypalForm}>
              <form onSubmit={paypalForm.handleSubmit(handlePaypalPayment)} className="space-y-4">
                <FormField
                  control={paypalForm.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <RadioGroup 
                          onValueChange={(value) => field.onChange(value === "true")} 
                          defaultValue={field.value ? "true" : "false"}
                          className="flex"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="accept-terms" />
                            <FormLabel htmlFor="accept-terms" className="font-normal">
                              J'accepte les conditions générales de vente et la politique de confidentialité
                            </FormLabel>
                          </div>
                        </RadioGroup>
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
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                        Redirection en cours...
                      </>
                    ) : (
                      <>
                        <span>Continuer vers PayPal</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
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