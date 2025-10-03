import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Shield,
  Euro
} from "lucide-react";
import { useStripe } from "@/hooks/useStripe";

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
  description?: string;
}

const StripePaymentForm = ({ 
  amount, 
  currency = 'eur', 
  onSuccess, 
  onError,
  description = "Pago con tarjeta de crédito"
}: StripePaymentFormProps) => {
  const { processPayment, validateCard, loading, error: stripeError } = useStripe();
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    cardholderName: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    transactionId?: string;
    error?: string;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Número de tarjeta requerido';
    }
    
    if (!formData.expMonth.trim()) {
      newErrors.expMonth = 'Mes requerido';
    }
    
    if (!formData.expYear.trim()) {
      newErrors.expYear = 'Año requerido';
    }
    
    if (!formData.cvc.trim()) {
      newErrors.cvc = 'CVC requerido';
    }
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Nombre del titular requerido';
    }

    // Validar tarjeta
    const cardValidation = validateCard(
      formData.cardNumber, 
      formData.expMonth, 
      formData.expYear, 
      formData.cvc
    );
    
    if (!cardValidation.isValid) {
      cardValidation.errors.forEach(error => {
        if (error.includes('tarjeta')) newErrors.cardNumber = error;
        if (error.includes('Mes')) newErrors.expMonth = error;
        if (error.includes('Año')) newErrors.expYear = error;
        if (error.includes('CVC')) newErrors.cvc = error;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentResult(null);

    try {
      // Generar ID de método de pago simulado
      const paymentMethodId = `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const result = await processPayment(paymentMethodId, amount, currency);
      
      setPaymentResult(result);
      
      if (result.success && result.transactionId) {
        onSuccess?.(result.transactionId);
      } else if (result.error) {
        onError?.(result.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setPaymentResult({ success: false, error: errorMessage });
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Formatear número de tarjeta con espacios cada 4 dígitos
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

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (stripeError) {
    return (
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal text-red-400">Error de Stripe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <p className="text-muted-foreground font-terminal">
              {stripeError}
            </p>
            <p className="text-sm text-muted-foreground font-terminal mt-2">
              Verifica tu configuración de Stripe
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="terminal-border">
      <CardHeader>
        <CardTitle className="font-terminal flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>PAGO CON TARJETA</span>
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
            <Euro className="h-3 w-3 mr-1" />
            {amount.toFixed(2)} {currency.toUpperCase()}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground font-terminal">
          {description}
        </p>
      </CardHeader>
      
      <CardContent>
        {paymentResult ? (
          <div className="text-center py-8">
            {paymentResult.success ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 font-terminal mb-2">
                  ¡PAGO EXITOSO!
                </h3>
                <p className="text-muted-foreground font-terminal mb-4">
                  Tu transacción ha sido procesada correctamente
                </p>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-mono">
                  ID: {paymentResult.transactionId}
                </Badge>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-400 font-terminal mb-2">
                  PAGO FALLIDO
                </h3>
                <p className="text-muted-foreground font-terminal mb-4">
                  {paymentResult.error || 'Error desconocido'}
                </p>
                <Button 
                  onClick={() => setPaymentResult(null)}
                  variant="outline"
                  className="font-terminal"
                >
                  Intentar de nuevo
                </Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Número de tarjeta */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="font-terminal text-primary">
                Número de Tarjeta
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={`pl-10 font-mono ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>

            {/* Fecha de expiración y CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expMonth" className="font-terminal text-primary">
                  Fecha de Expiración
                </Label>
                <Input
                  id="expMonth"
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expMonth}
                  onChange={(e) => handleInputChange('expMonth', formatExpiry(e.target.value))}
                  maxLength={5}
                  className={`font-mono ${errors.expMonth ? 'border-red-500' : ''}`}
                />
                {errors.expMonth && (
                  <p className="text-red-500 text-sm">{errors.expMonth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvc" className="font-terminal text-primary">
                  CVC
                </Label>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={(e) => handleInputChange('cvc', e.target.value.replace(/\D/g, ''))}
                  maxLength={4}
                  className={`font-mono ${errors.cvc ? 'border-red-500' : ''}`}
                />
                {errors.cvc && (
                  <p className="text-red-500 text-sm">{errors.cvc}</p>
                )}
              </div>
            </div>

            {/* Nombre del titular */}
            <div className="space-y-2">
              <Label htmlFor="cardholderName" className="font-terminal text-primary">
                Nombre del Titular
              </Label>
              <Input
                id="cardholderName"
                type="text"
                placeholder="NOMBRE APELLIDO"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value.toUpperCase())}
                className={`font-terminal ${errors.cardholderName ? 'border-red-500' : ''}`}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm">{errors.cardholderName}</p>
              )}
            </div>

            {/* Información de seguridad */}
            <div className="bg-primary/5 border border-primary/20 rounded-sm p-3">
              <div className="flex items-center space-x-2 text-sm text-primary font-terminal">
                <Shield className="h-4 w-4" />
                <span>Tu información está protegida con encriptación SSL</span>
              </div>
            </div>

            {/* Botón de pago */}
            <Button 
              type="submit" 
              className="w-full font-terminal glow-effect"
              disabled={isProcessing || loading}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  PROCESANDO PAGO...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  PAGAR {amount.toFixed(2)}€
                </>
              )}
            </Button>

            {/* Tarjetas de prueba */}
            <div className="bg-muted/20 border border-muted/30 rounded-sm p-3">
              <p className="text-xs text-muted-foreground font-terminal mb-2">
                💳 <strong>Tarjetas de prueba:</strong>
              </p>
              <div className="text-xs text-muted-foreground font-terminal space-y-1">
                <div>✅ Éxito: 4242 4242 4242 4242</div>
                <div>❌ Fallo: 4000 0000 0000 0002</div>
                <div>📅 Fecha: Cualquier fecha futura</div>
                <div>🔒 CVC: Cualquier 3 dígitos</div>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default StripePaymentForm;
