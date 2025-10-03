import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PayPalButtonsProps {
  amount: number;
  onSuccess?: (paymentData: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

const PayPalButtons = ({ amount, onSuccess, onError, disabled = false }: PayPalButtonsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulación de pago con PayPal
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular éxito del pago
      const paymentData = {
        id: `paypal_${Date.now()}`,
        amount: amount,
        currency: 'EUR',
        status: 'completed',
        method: 'paypal',
        timestamp: new Date().toISOString()
      };

      setPaymentStatus('success');
      onSuccess?.(paymentData);

      console.log('✅ Pago PayPal exitoso:', paymentData);
    } catch (error) {
      setPaymentStatus('error');
      onError?.(error);
      console.error('❌ Error en pago PayPal:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Badge variant="secondary" className="animate-pulse">Procesando...</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-500">✅ Completado</Badge>;
      case 'error':
        return <Badge variant="destructive">❌ Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-terminal text-primary flex items-center justify-between">
          💳 PayPal
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-terminal">
            Pagar con PayPal
          </p>
          <p className="text-2xl font-bold text-primary font-terminal">
            €{amount.toFixed(2)}
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={handlePayment}
            disabled={disabled || isProcessing || paymentStatus === 'success'}
            className="w-full font-terminal bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Procesando...
              </>
            ) : paymentStatus === 'success' ? (
              '✅ Pago Completado'
            ) : (
              <>
                <span className="mr-2">💳</span>
                Pagar con PayPal
              </>
            )}
          </Button>

          {paymentStatus === 'success' && (
            <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-sm">
              <p className="text-green-400 font-terminal text-sm">
                ✅ Pago procesado exitosamente
              </p>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
              <p className="text-red-400 font-terminal text-sm">
                ❌ Error en el procesamiento del pago
              </p>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground font-terminal text-center">
          <p>🔒 Pago seguro procesado por PayPal</p>
          <p>Puedes cancelar en cualquier momento</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayPalButtons;
