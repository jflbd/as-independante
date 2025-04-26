import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, Shield } from "lucide-react";
import { Separator } from "../ui/separator";
import { ebookConfig } from "@/config/ebookConfig";

interface CheckoutSummaryProps {
  customerInfo: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ customerInfo }) => {
  // Calculer le sous-total et le total
  const subTotal = ebookConfig.price;
  const total = subTotal; // Pas de frais supplémentaires pour un produit numérique
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-serif">Récapitulatif de votre commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Produit */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={ebookConfig.coverImage}
              alt={ebookConfig.title}
              className="w-20 max-w-full h-auto rounded-md shadow-sm"
              width={80}
              height={120}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium">{ebookConfig.title}</h3>
            <p className="text-sm text-gray-600">{ebookConfig.subtitle}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
                Format {ebookConfig.fileFormat}
              </span>
              <span className="text-sm text-gray-500 ml-2">{ebookConfig.fileSize}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Prix */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Prix</span>
            <span>{ebookConfig.formattedPrice}</span>
          </div>
          {ebookConfig.priceAvantPromo && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Prix normal</span>
              <span className="text-gray-500 line-through">{ebookConfig.formattedPriceAvantPromo}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center font-medium text-lg">
          <span>Total</span>
          <span className="text-primary">{ebookConfig.formattedPrice}</span>
        </div>

        {/* Informations client si disponibles */}
        {(customerInfo.email || customerInfo.firstName) && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-medium">Informations personnelles</h3>
              {customerInfo.firstName && customerInfo.lastName && (
                <div className="text-sm">
                  <span className="text-gray-600">Nom :</span>{" "}
                  {customerInfo.firstName} {customerInfo.lastName}
                </div>
              )}
              {customerInfo.email && (
                <div className="text-sm">
                  <span className="text-gray-600">Email :</span>{" "}
                  {customerInfo.email}
                </div>
              )}
            </div>
          </>
        )}

        {/* Garanties */}
        <div className="mt-4 space-y-2 pt-4">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">Téléchargement immédiat</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">{ebookConfig.guarantee}</span>
          </div>
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">Paiement 100% sécurisé</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;