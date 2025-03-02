
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type QuoteFormDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const QuoteFormDialog = ({ isOpen, setIsOpen }: QuoteFormDialogProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    console.log("Would send email to: rachel.gervais@as-independante.fr");
    
    toast.success("J'ai bien reçu votre demande de devis ! Je vous contacterai rapidement.", {
      duration: 5000,
      style: {
        backgroundColor: "white",
        color: "black",
        border: "1px solid #e2e8f0",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }
    });
    
    setIsOpen(false);
    
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] z-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Demande de devis professionnel</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour recevoir un devis personnalisé pour votre entreprise ou organisation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nom et prénom</label>
              <input 
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Entreprise / Organisation</label>
              <input 
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
              <input 
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Votre besoin</label>
            <textarea 
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              required
            ></textarea>
          </div>
          
          <div className="text-xs text-gray-500">
            En soumettant ce formulaire, vous serez contacté par Rachel Gervais à l'adresse email rachel.gervais@as-independante.fr
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="btn-primary py-3 px-6"
            >
              Envoyer ma demande
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;
