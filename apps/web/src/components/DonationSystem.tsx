import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  CreditCard, 
  Bitcoin, 
  DollarSign, 
  Users, 
  TrendingUp,
  Gift,
  Shield,
  Zap,
  Star
} from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  currency: string;
  method: string;
  donor?: string;
  message?: string;
  date: string;
  anonymous: boolean;
}

const DonationSystem = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorMessage, setDonorMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const presetAmounts = [5, 10, 25, 50, 100];
  
  const donationStats = {
    total: 2847.50,
    donors: 156,
    thisMonth: 342.75,
    goal: 5000
  };

  const recentDonations: Donation[] = [
    {
      id: "1",
      amount: 50,
      currency: "USD",
      method: "Bitcoin",
      donor: "juan_survival",
      message: "¡Excelente app! Me salvó en mi última excursión.",
      date: "2024-01-15 16:30",
      anonymous: false
    },
    {
      id: "2",
      amount: 25,
      currency: "USD",
      method: "Credit Card",
      donor: "Anonymous",
      message: "Gracias por mantener esto gratis",
      date: "2024-01-15 14:20",
      anonymous: true
    },
    {
      id: "3",
      amount: 100,
      currency: "USD",
      method: "Ethereum",
      donor: "maria_explorer",
      message: "Apoyo total al proyecto",
      date: "2024-01-15 12:15",
      anonymous: false
    }
  ];

  const paymentMethods = [
    {
      id: "crypto",
      name: "Criptomonedas",
      icon: Bitcoin,
      description: "Bitcoin, Ethereum, USDC",
      color: "bg-orange-500",
      features: ["Sin comisiones", "Anónimo", "Global"]
    },
    {
      id: "card",
      name: "Tarjeta de Crédito",
      icon: CreditCard,
      description: "Visa, Mastercard, Apple Pay",
      color: "bg-blue-500",
      features: ["Rápido", "Seguro", "Familiar"]
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: DollarSign,
      description: "Cuenta PayPal",
      color: "bg-blue-600",
      features: ["Fácil", "Confiable", "Rápido"]
    }
  ];

  const handleDonation = (method: string) => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) return;

    // Aquí se integraría con las pasarelas de pago
    console.log("Procesando donación:", {
      amount,
      method,
      donor: isAnonymous ? "Anonymous" : donorName,
      message: donorMessage
    });

    // Simulación de procesamiento
    alert(`Redirigiendo a ${method} para procesar $${amount}`);
  };

  const progressPercentage = (donationStats.total / donationStats.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="terminal-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-terminal">Total Donado</p>
                <p className="text-2xl font-bold text-primary font-terminal">${donationStats.total.toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-terminal">Donantes</p>
                <p className="text-2xl font-bold text-primary font-terminal">{donationStats.donors}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-terminal">Este Mes</p>
                <p className="text-2xl font-bold text-primary font-terminal">${donationStats.thisMonth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="terminal-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-terminal">Meta</p>
                <p className="text-2xl font-bold text-primary font-terminal">${donationStats.goal.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de progreso */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">Progreso hacia la Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-terminal">
              <span>${donationStats.total.toLocaleString()} de ${donationStats.goal.toLocaleString()}</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-background-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de donación */}
        <Card className="terminal-border">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Gift className="h-5 w-5" />
              Hacer una Donación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cantidad */}
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Cantidad (USD)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAmount(amount)}
                    className="font-terminal"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Otra cantidad..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="font-terminal"
              />
            </div>

            {/* Información del donante */}
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Tu nombre (opcional)
              </label>
              <Input
                placeholder="¿Cómo te llamas?"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="font-terminal"
                disabled={isAnonymous}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Mensaje (opcional)
              </label>
              <Input
                placeholder="¿Algo que quieras decirnos?"
                value={donorMessage}
                onChange={(e) => setDonorMessage(e.target.value)}
                className="font-terminal"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="anonymous" className="text-sm font-terminal">
                Donación anónima
              </label>
            </div>

            {/* Métodos de pago */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-primary font-terminal block">
                Método de Pago
              </label>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 bg-background-secondary rounded-sm border border-primary/20"
                >
                  <div className="flex items-center space-x-3">
                    <method.icon className={`h-6 w-6 ${method.color} text-white p-1 rounded`} />
                    <div>
                      <h3 className="font-medium font-terminal">{method.name}</h3>
                      <p className="text-sm text-muted-foreground font-terminal">{method.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDonation(method.id)}
                    disabled={!selectedAmount && !customAmount}
                    className="font-terminal"
                  >
                    Donar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Donaciones recientes */}
        <Card className="terminal-border">
          <CardHeader>
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              Donaciones Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-sm border border-primary/20">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium font-terminal">
                        {donation.anonymous ? "Anonymous" : donation.donor}
                      </span>
                      <Badge variant="outline" className="font-terminal text-xs">
                        ${donation.amount}
                      </Badge>
                      <Badge variant="secondary" className="font-terminal text-xs">
                        {donation.method}
                      </Badge>
                    </div>
                    {donation.message && (
                      <p className="text-sm text-muted-foreground font-terminal italic">
                        "{donation.message}"
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground font-terminal mt-1">
                      {donation.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información de transparencia */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            Transparencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium font-terminal mb-1">100% Transparente</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Todas las donaciones se usan para desarrollo y mantenimiento
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium font-terminal mb-1">Seguro</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Pagos procesados por pasarelas certificadas
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium font-terminal mb-1">Agradecimiento</h3>
              <p className="text-sm text-muted-foreground font-terminal">
                Cada donante recibe agradecimiento personal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationSystem; 