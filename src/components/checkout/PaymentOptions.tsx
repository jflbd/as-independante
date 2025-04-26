import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, ArrowRight, CreditCard, Lock, CheckCircle, ChevronRight } from "lucide-react";
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
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { OptimizedImage } from "../OptimizedImage";

// Schéma de validation pour le formulaire de carte bancaire
const cardFormSchema = z.object({
  cardNumber: z.string()
    .min(1, "Numéro de carte requis")
    .regex(/^[0-9]{16}$/, "Le numéro de carte doit contenir 16 chiffres"),
  cardHolder: z.string()
    .min(1, "Nom du titulaire requis"),
  expiryDate: z.string()
    .min(1, "Date d'expiration requise")
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Format MM/YY requis"),
  cvv: z.string()
    .min(1, "Code de sécurité requis")
    .regex(/^[0-9]{3,4}$/, "Le code de sécurité doit contenir 3 ou 4 chiffres"),
});

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

  // Formulaire pour carte bancaire
  const cardForm = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Formulaire pour PayPal
  const paypalForm = useForm<z.infer<typeof paypalFormSchema>>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  // Gestionnaire pour le paiement par carte bancaire
  const handleCardPayment = (values: z.infer<typeof cardFormSchema>) => {
    setIsProcessing(true);
    // Simulation d'une requête API pour le paiement
    setTimeout(() => {
      // Dans une application réelle, ceci serait remplacé par un appel à votre API de paiement
      const paymentId = "card_" + Math.random().toString(36).substring(2, 15);
      setIsProcessing(false);
      onPaymentComplete(paymentId);
    }, 2000);
  };

  // Gestionnaire pour le paiement PayPal
  const handlePaypalPayment = (values: z.infer<typeof paypalFormSchema>) => {
    setIsProcessing(true);
    // Simulation d'une requête API pour le paiement
    setTimeout(() => {
      // Dans une application réelle, ceci serait remplacé par un appel à l'API PayPal
      const paymentId = "paypal_" + Math.random().toString(36).substring(2, 15);
      setIsProcessing(false);
      onPaymentComplete(paymentId);
    }, 2000);
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
                src="/assets/card/paypal-logo.png" 
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
              <OptimizedImage 
                src="/assets/card/card-visa.svg" 
                alt="Visa" 
                className="h-8" 
                width={48} 
                height={32} 
              />
              <OptimizedImage 
                src="/assets/card/card-mastercard.svg" 
                alt="Mastercard" 
                className="h-8" 
                width={48} 
                height={32} 
              />
              <OptimizedImage 
                src="/assets/card/card-amex.svg" 
                alt="American Express" 
                className="h-8" 
                width={48} 
                height={32} 
              />
            </div>

            <Form {...cardForm}>
              <form onSubmit={cardForm.handleSubmit(handleCardPayment)} className="space-y-4">
                <FormField
                  control={cardForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          {...field}
                          onChange={(e) => {
                            // Ne garder que les chiffres
                            const value = e.target.value.replace(/\D/g, '');
                            // Limiter à 16 chiffres
                            if (value.length <= 16) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cardForm.control}
                  name="cardHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du titulaire</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du titulaire" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={cardForm.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 4) {
                                let formattedValue = value;
                                if (value.length > 2) {
                                  formattedValue = value.slice(0, 2) + '/' + value.slice(2);
                                }
                                field.onChange(formattedValue);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={cardForm.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code de sécurité (CVV)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            {...field} 
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 4) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                    className="bg-primary hover:bg-primary/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <span>Payer {amount.toFixed(2).replace('.', ',')}€</span>
                        <Lock className="ml-2 h-4 w-4" />
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="paypal" className="w-full">
            <div className="text-center mb-6">
              <OptimizedImage 
                src="/assets/card/paypal-logo.png" 
                alt="PayPal" 
                className="h-12 mx-auto mb-4" 
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