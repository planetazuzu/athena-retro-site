import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Heart, 
  MessageCircle,
  CreditCard,
  Gift,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface DonationFormProps {
  onDonate?: (donationData: DonationData) => void;
  goalId?: string;
  goalTitle?: string;
  suggestedAmounts?: number[];
}

interface DonationData {
  amount: number;
  donorName: string;
  donorEmail: string;
  message: string;
  isAnonymous: boolean;
  goalId?: string;
  paymentMethod: 'stripe' | 'paypal';
}

const DonationForm = ({ 
  onDonate, 
  goalId, 
  goalTitle, 
  suggestedAmounts = [10, 25, 50, 100, 250] 
}: DonationFormProps) => {
  const [formData, setFormData] = useState<DonationData>({
    amount: 0,
    donorName: '',
    donorEmail: '',
    message: '',
    isAnonymous: false,
    goalId,
    paymentMethod: 'stripe'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const handleCustomAmount = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    setFormData(prev => ({ ...prev, amount: numAmount }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || formData.amount <= 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular procesamiento de donación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const donationData = {
        ...formData,
        id: `donation-${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      onDonate?.(donationData);
      setShowSuccess(true);
      
      console.log('✅ Donación procesada:', donationData);
      
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          amount: 0,
          donorName: '',
          donorEmail: '',
          message: '',
          isAnonymous: false,
          goalId,
          paymentMethod: 'stripe'
        });
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error procesando donación:', error);
      setShowError(true);
      setIsSubmitting(false);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if (showSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-400 font-terminal mb-2">
            ¡Donación Exitosa!
          </h3>
          <p className="text-muted-foreground font-terminal">
            Gracias por apoyar Athena Pocket con €{formData.amount}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-terminal text-primary flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          {goalTitle ? `Donar a: ${goalTitle}` : 'Hacer una Donación'}
        </CardTitle>
        {goalId && (
          <Badge variant="outline" className="font-terminal">
            Meta: {goalId}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cantidad sugerida */}
          <div>
            <Label className="font-terminal text-primary">Cantidad Sugerida</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {suggestedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={formData.amount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAmountSelect(amount)}
                  className="font-terminal"
                >
                  €{amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Cantidad personalizada */}
          <div>
            <Label htmlFor="custom-amount" className="font-terminal text-primary">
              O escribe una cantidad personalizada
            </Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={formData.amount || ''}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="pl-10 font-terminal"
              />
            </div>
          </div>

          {/* Información del donante */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="anonymous" className="font-terminal text-primary">
                Donación anónima
              </Label>
            </div>

            {!formData.isAnonymous && (
              <>
                <div>
                  <Label htmlFor="donor-name" className="font-terminal text-primary">
                    Tu nombre
                  </Label>
                  <Input
                    id="donor-name"
                    value={formData.donorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
                    placeholder="Nombre completo"
                    className="font-terminal"
                  />
                </div>

                <div>
                  <Label htmlFor="donor-email" className="font-terminal text-primary">
                    Email (opcional)
                  </Label>
                  <Input
                    id="donor-email"
                    type="email"
                    value={formData.donorEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, donorEmail: e.target.value }))}
                    placeholder="tu@email.com"
                    className="font-terminal"
                  />
                </div>
              </>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <Label htmlFor="message" className="font-terminal text-primary flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              Mensaje (opcional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Escribe un mensaje de apoyo..."
              className="font-terminal mt-2"
              rows={3}
            />
          </div>

          {/* Método de pago */}
          <div>
            <Label className="font-terminal text-primary">Método de Pago</Label>
            <div className="flex space-x-2 mt-2">
              <Button
                type="button"
                variant={formData.paymentMethod === 'stripe' ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'stripe' }))}
                className="font-terminal flex-1"
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Stripe
              </Button>
              <Button
                type="button"
                variant={formData.paymentMethod === 'paypal' ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                className="font-terminal flex-1"
              >
                <Gift className="h-4 w-4 mr-1" />
                PayPal
              </Button>
            </div>
          </div>

          {/* Botón de donación */}
          <Button
            type="submit"
            disabled={!formData.amount || formData.amount <= 0 || isSubmitting}
            className="w-full font-terminal"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Procesando...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-2" />
                Donar €{formData.amount || '0.00'}
              </>
            )}
          </Button>

          {/* Mensajes de estado */}
          {showError && (
            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-red-400 font-terminal text-sm">
                Por favor, selecciona una cantidad válida
              </p>
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-terminal">
            🔒 Tu donación es segura y se procesa de forma encriptada
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
