import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  DollarSign, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Lock
} from "lucide-react";

interface PaymentFormProps {
  amount: number;
  currency?: string;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

const PaymentForm = ({ 
  amount, 
  currency = "USD", 
  description = "Suscripción Athena PRO",
  onSuccess,
  onError 
}: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular éxito (en producción aquí iría la lógica real de Stripe/PayPal)
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      if (onSuccess) {
        onSuccess(paymentId);
      }
    } catch (error) {
      if (onError) {
        onError('Error al procesar el pago. Inténtalo de nuevo.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>PAGO SEGURO</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-background-secondary border border-primary/20 rounded-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-terminal text-sm text-muted-foreground">Descripción:</span>
              <span className="font-terminal font-medium">{description}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-terminal text-sm text-muted-foreground">Total:</span>
              <span className="font-terminal text-xl font-bold text-primary terminal-glow">
                ${amount} {currency}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="font-terminal text-sm font-medium text-primary">
              Método de Pago
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3 border rounded-sm font-terminal transition-all duration-300 ${
                  paymentMethod === 'stripe'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-primary/20 text-muted-foreground hover:border-primary/40'
                }`}
              >
                <DollarSign className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Tarjeta</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 border rounded-sm font-terminal transition-all duration-300 ${
                  paymentMethod === 'paypal'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-primary/20 text-muted-foreground hover:border-primary/40'
                }`}
              >
                <Shield className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">PayPal</span>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'stripe' ? (
              <>
                <div>
                  <label className="font-terminal text-sm font-medium text-primary mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-terminal"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="font-terminal text-sm font-medium text-primary mb-2 block">
                    Nombre del Titular
                  </label>
                  <Input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="font-terminal"
                    placeholder="Como aparece en la tarjeta"
                    required
                  />
                </div>

                <div>
                  <label className="font-terminal text-sm font-medium text-primary mb-2 block">
                    Número de Tarjeta
                  </label>
                  <Input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="font-terminal"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-terminal text-sm font-medium text-primary mb-2 block">
                      Fecha de Vencimiento
                    </label>
                    <Input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      className="font-terminal"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-terminal text-sm font-medium text-primary mb-2 block">
                      CVV
                    </label>
                    <Input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      className="font-terminal"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="font-terminal text-muted-foreground">
                  Serás redirigido a PayPal para completar el pago de forma segura.
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-terminal">
              <Lock className="h-3 w-3" />
              <span>Tu información está protegida con encriptación SSL de 256 bits</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full font-terminal glow-effect"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagar ${amount} {currency}
                </>
              )}
            </Button>
          </form>

          {/* Test Card Info */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-sm p-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="font-terminal text-sm font-medium text-yellow-500">
                TARJETA DE PRUEBA
              </span>
            </div>
            <p className="font-terminal text-xs text-muted-foreground">
              Usa: 4242 4242 4242 4242 | Fecha: 12/25 | CVV: 123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm; 