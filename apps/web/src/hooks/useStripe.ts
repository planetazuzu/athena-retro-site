import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Claves de Stripe en modo test (reemplazar con las tuyas cuando tengas cuenta real)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51OqXXXXXXXXXXXXX'; // Clave de prueba de Stripe

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  client_secret: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export const useStripe = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializar Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        if (!STRIPE_PUBLISHABLE_KEY) {
          throw new Error('Stripe publishable key no configurada');
        }

        const stripeInstance = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        if (stripeInstance) {
          setStripe(stripeInstance);
        } else {
          throw new Error('No se pudo cargar Stripe');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  // Crear Payment Intent (simulado para desarrollo)
  const createPaymentIntent = async (amount: number, currency: string = 'eur'): Promise<PaymentIntent> => {
    // En desarrollo, simulamos la creación del Payment Intent
    // En producción, esto se haría desde tu backend
    const mockPaymentIntent: PaymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Stripe usa centavos
      currency,
      status: 'requires_payment_method',
      created: Date.now() / 1000,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`
    };

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    return mockPaymentIntent;
  };

  // Procesar pago (simulado)
  const processPayment = async (
    paymentMethodId: string, 
    amount: number, 
    currency: string = 'eur'
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular éxito/fallo (90% éxito para testing)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Guardar transacción en localStorage
        const transactions = JSON.parse(localStorage.getItem('athena_transactions') || '[]');
        transactions.push({
          id: transactionId,
          amount,
          currency,
          paymentMethod: paymentMethodId,
          status: 'succeeded',
          created: new Date().toISOString(),
          type: 'stripe'
        });
        localStorage.setItem('athena_transactions', JSON.stringify(transactions));

        return {
          success: true,
          transactionId
        };
      } else {
        return {
          success: false,
          error: 'Pago rechazado por el banco'
        };
      }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Error desconocido'
      };
    }
  };

  // Obtener historial de transacciones
  const getTransactionHistory = () => {
    try {
      return JSON.parse(localStorage.getItem('athena_transactions') || '[]');
    } catch {
      return [];
    }
  };

  // Obtener estadísticas de pagos
  const getPaymentStats = () => {
    const transactions = getTransactionHistory();
    const successfulTransactions = transactions.filter((t: any) => t.status === 'succeeded');
    
    return {
      totalTransactions: transactions.length,
      successfulTransactions: successfulTransactions.length,
      totalAmount: successfulTransactions.reduce((sum: number, t: any) => sum + t.amount, 0),
      successRate: transactions.length > 0 ? (successfulTransactions.length / transactions.length) * 100 : 0
    };
  };

  // Validar tarjeta de crédito (básico)
  const validateCard = (cardNumber: string, expMonth: string, expYear: string, cvc: string) => {
    const errors: string[] = [];

    // Validar número de tarjeta (Luhn algorithm básico)
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      errors.push('Número de tarjeta inválido');
    }

    // Validar mes de expiración
    const month = parseInt(expMonth);
    if (month < 1 || month > 12) {
      errors.push('Mes de expiración inválido');
    }

    // Validar año de expiración
    const year = parseInt(expYear);
    const currentYear = new Date().getFullYear();
    if (year < currentYear || year > currentYear + 20) {
      errors.push('Año de expiración inválido');
    }

    // Validar CVC
    if (!cvc || cvc.length < 3 || cvc.length > 4) {
      errors.push('CVC inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return {
    stripe,
    loading,
    error,
    createPaymentIntent,
    processPayment,
    getTransactionHistory,
    getPaymentStats,
    validateCard
  };
};
