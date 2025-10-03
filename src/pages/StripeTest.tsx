import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Euro, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Users,
  Target,
  Gift
} from "lucide-react";
import StripePaymentForm from "@/components/StripePaymentForm";

const StripeTest = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  const donationTiers = [
    {
      amount: 5,
      title: "Soporte Básico",
      description: "Ayuda a mantener el proyecto",
      benefits: ["Acceso a contenido exclusivo", "Badge de soporte"]
    },
    {
      amount: 25,
      title: "Soporte Premium",
      description: "Nuestro tier más popular",
      benefits: ["Todo del tier básico", "Acceso temprano a features", "Soporte prioritario"]
    },
    {
      amount: 50,
      title: "Soporte VIP",
      description: "Para los verdaderos fans",
      benefits: ["Todo del tier premium", "Mentoría personalizada", "Nombre en créditos"]
    },
    {
      amount: 100,
      title: "Patrón Legendario",
      description: "El máximo nivel de soporte",
      benefits: ["Todo del tier VIP", "Sesión privada 1-on-1", "Producto físico exclusivo"]
    }
  ];

  const handlePaymentSuccess = (transactionId: string) => {
    // Añadir a historial local
    const newPayment = {
      id: transactionId,
      amount: selectedAmount,
      status: 'success',
      date: new Date().toISOString(),
      tier: donationTiers.find(t => t.amount === selectedAmount)?.title
    };
    
    setPaymentHistory(prev => [newPayment, ...prev]);
    setShowPaymentForm(false);
  };

  const handlePaymentError = (error: string) => {
    console.error('Error de pago:', error);
    // Aquí podrías mostrar un toast o notificación
  };

  const getProgressPercentage = () => {
    const totalDonations = paymentHistory
      .filter(p => p.status === 'success')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const goal = 1000; // Meta de €1000
    return Math.min((totalDonations / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --payments --test</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            SISTEMA DE PAGOS STRIPE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Prueba el sistema de pagos integrado con Stripe. Procesa transacciones reales en modo test.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 font-terminal">
              <CheckCircle className="h-4 w-4 mr-2" />
              Modo Test Activo
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 font-terminal">
              <CreditCard className="h-4 w-4 mr-2" />
              Stripe Integrado
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400 font-terminal">
              <Target className="h-4 w-4 mr-2" />
              Metas de Financiamiento
            </Badge>
          </div>
        </div>
      </section>

      {/* Metas de Financiamiento */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary font-terminal mb-8 text-center">
              METAS DE FINANCIAMIENTO
            </h2>
            
            <Card className="terminal-border mb-8">
              <CardHeader>
                <CardTitle className="font-terminal flex items-center justify-between">
                  <span>Desarrollo de Athena Pocket</span>
                  <span className="text-2xl text-primary">€{paymentHistory.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-terminal">
                    <span>Meta: €1,000</span>
                    <span>{getProgressPercentage().toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-background-secondary rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm font-terminal">
                    <div>
                      <div className="text-2xl font-bold text-primary">{paymentHistory.filter(p => p.status === 'success').length}</div>
                      <div className="text-muted-foreground">Donaciones</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">€{paymentHistory.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)}</div>
                      <div className="text-muted-foreground">Total Recaudado</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">€{1000 - paymentHistory.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0)}</div>
                      <div className="text-muted-foreground">Faltan</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tiers de Donación */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {donationTiers.map((tier) => (
                <Card 
                  key={tier.amount}
                  className={`terminal-border cursor-pointer transition-all duration-300 hover:border-primary/50 ${
                    selectedAmount === tier.amount ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedAmount(tier.amount)}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="font-terminal text-lg">{tier.title}</CardTitle>
                    <div className="text-3xl font-bold text-primary">€{tier.amount}</div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Gift className="h-3 w-3 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Botón de Pago */}
            <div className="text-center">
              <Button 
                onClick={() => setShowPaymentForm(true)}
                size="lg"
                className="font-terminal glow-effect"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                DONAR €{selectedAmount}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Pago */}
      {showPaymentForm && (
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary font-terminal mb-2">
                  COMPLETAR DONACIÓN
                </h2>
                <p className="text-muted-foreground font-terminal">
                  Seleccionaste: {donationTiers.find(t => t.amount === selectedAmount)?.title} - €{selectedAmount}
                </p>
              </div>
              
              <StripePaymentForm
                amount={selectedAmount}
                currency="eur"
                description={`Donación: ${donationTiers.find(t => t.amount === selectedAmount)?.title}`}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        </section>
      )}

      {/* Historial de Pagos */}
      {paymentHistory.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-primary font-terminal mb-8 text-center">
                HISTORIAL DE DONACIONES
              </h2>
              
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <Card key={payment.id} className="terminal-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {payment.status === 'success' ? (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-400" />
                          )}
                          <div>
                            <div className="font-terminal font-bold">
                              {payment.tier} - €{payment.amount}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString('es-ES')}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={payment.status === 'success' ? 'default' : 'destructive'}
                          className="font-terminal"
                        >
                          {payment.status === 'success' ? 'EXITOSO' : 'FALLIDO'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Información de Testing */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary font-terminal mb-8 text-center">
              INFORMACIÓN PARA TESTING
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal">💳 Tarjetas de Prueba</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm font-terminal">
                  <div>
                    <strong>✅ Pago Exitoso:</strong> 4242 4242 4242 4242
                  </div>
                  <div>
                    <strong>❌ Pago Fallido:</strong> 4000 0000 0000 0002
                  </div>
                  <div>
                    <strong>📅 Fecha:</strong> Cualquier fecha futura
                  </div>
                  <div>
                    <strong>🔒 CVC:</strong> Cualquier 3 dígitos
                  </div>
                </CardContent>
              </Card>
              
              <Card className="terminal-border">
                <CardHeader>
                  <CardTitle className="font-terminal">⚙️ Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm font-terminal">
                  <div>
                    <strong>🌐 Modo:</strong> Test (desarrollo)
                  </div>
                  <div>
                    <strong>🔑 API Key:</strong> pk_test_...
                  </div>
                  <div>
                    <strong>💰 Moneda:</strong> EUR (Euro)
                  </div>
                  <div>
                    <strong>📊 Almacenamiento:</strong> localStorage
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StripeTest;
