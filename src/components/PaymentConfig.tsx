import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  DollarSign, 
  Settings, 
  Shield, 
  Eye, 
  EyeOff,
  Save,
  TestTube,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface PaymentConfig {
  stripe: {
    enabled: boolean;
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
    testMode: boolean;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    sandboxMode: boolean;
  };
  general: {
    currency: string;
    taxRate: number;
    autoCapture: boolean;
    refundPolicy: string;
  };
}

const PaymentConfig = () => {
  const [config, setConfig] = useState<PaymentConfig>({
    stripe: {
      enabled: false,
      publishableKey: "",
      secretKey: "",
      webhookSecret: "",
      testMode: true
    },
    paypal: {
      enabled: false,
      clientId: "",
      clientSecret: "",
      sandboxMode: true
    },
    general: {
      currency: "USD",
      taxRate: 0,
      autoCapture: true,
      refundPolicy: "30 días"
    }
  });

  const [showSecrets, setShowSecrets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    console.log("Configuración guardada:", config);
  };

  const testConnection = async (provider: 'stripe' | 'paypal') => {
    setTestResults(prev => ({ ...prev, [provider]: false }));
    
    // Simular test de conexión
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTestResults(prev => ({ 
      ...prev, 
      [provider]: Math.random() > 0.3 // 70% éxito simulado
    }));
  };

  const currencies = [
    { code: "USD", name: "Dólar Estadounidense" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra Esterlina" },
    { code: "JPY", name: "Yen Japonés" },
    { code: "CAD", name: "Dólar Canadiense" },
    { code: "AUD", name: "Dólar Australiano" },
    { code: "CHF", name: "Franco Suizo" },
    { code: "CNY", name: "Yuan Chino" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-6 w-6 text-primary terminal-glow" />
          <h2 className="text-2xl font-bold text-primary font-terminal">
            CONFIGURACIÓN DE PAGOS
          </h2>
        </div>
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal">
          CONFIGURACIÓN CRÍTICA
        </Badge>
      </div>

      {/* General Settings */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configuración General</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Moneda Principal
              </label>
              <select
                value={config.general.currency}
                onChange={(e) => setConfig({
                  ...config,
                  general: { ...config.general, currency: e.target.value }
                })}
                className="w-full p-2 border border-primary/20 rounded-sm bg-background font-terminal"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Tasa de Impuestos (%)
              </label>
              <Input
                type="number"
                value={config.general.taxRate}
                onChange={(e) => setConfig({
                  ...config,
                  general: { ...config.general, taxRate: parseFloat(e.target.value) || 0 }
                })}
                className="font-terminal"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.general.autoCapture}
              onCheckedChange={(checked) => setConfig({
                ...config,
                general: { ...config.general, autoCapture: checked }
              })}
            />
            <span className="text-sm font-terminal">Captura automática de pagos</span>
          </div>
        </CardContent>
      </Card>

      {/* Stripe Configuration */}
      <Card className="terminal-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-terminal flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Stripe</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.stripe.testMode}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    stripe: { ...config.stripe, testMode: checked }
                  })}
                />
                <span className="text-sm font-terminal">Modo Test</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.stripe.enabled}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    stripe: { ...config.stripe, enabled: checked }
                  })}
                />
                <span className="text-sm font-terminal">Habilitado</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Publishable Key
              </label>
              <div className="relative">
                <Input
                  type={showSecrets ? "text" : "password"}
                  value={config.stripe.publishableKey}
                  onChange={(e) => setConfig({
                    ...config,
                    stripe: { ...config.stripe, publishableKey: e.target.value }
                  })}
                  className="font-terminal pr-10"
                  placeholder="pk_test_..."
                />
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Secret Key
              </label>
              <div className="relative">
                <Input
                  type={showSecrets ? "text" : "password"}
                  value={config.stripe.secretKey}
                  onChange={(e) => setConfig({
                    ...config,
                    stripe: { ...config.stripe, secretKey: e.target.value }
                  })}
                  className="font-terminal pr-10"
                  placeholder="sk_test_..."
                />
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-primary font-terminal mb-2 block">
              Webhook Secret
            </label>
            <div className="relative">
              <Input
                type={showSecrets ? "text" : "password"}
                value={config.stripe.webhookSecret}
                onChange={(e) => setConfig({
                  ...config,
                  stripe: { ...config.stripe, webhookSecret: e.target.value }
                })}
                className="font-terminal pr-10"
                placeholder="whsec_..."
              />
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => testConnection('stripe')}
              variant="outline"
              size="sm"
              className="font-terminal"
              disabled={!config.stripe.enabled}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Probar Conexión
            </Button>
            {testResults.stripe !== undefined && (
              <div className="flex items-center space-x-2">
                {testResults.stripe ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-terminal">
                  {testResults.stripe ? "Conexión exitosa" : "Error de conexión"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* PayPal Configuration */}
      <Card className="terminal-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-terminal flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>PayPal</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.paypal.sandboxMode}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    paypal: { ...config.paypal, sandboxMode: checked }
                  })}
                />
                <span className="text-sm font-terminal">Modo Sandbox</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={config.paypal.enabled}
                  onCheckedChange={(checked) => setConfig({
                    ...config,
                    paypal: { ...config.paypal, enabled: checked }
                  })}
                />
                <span className="text-sm font-terminal">Habilitado</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Client ID
              </label>
              <div className="relative">
                <Input
                  type={showSecrets ? "text" : "password"}
                  value={config.paypal.clientId}
                  onChange={(e) => setConfig({
                    ...config,
                    paypal: { ...config.paypal, clientId: e.target.value }
                  })}
                  className="font-terminal pr-10"
                  placeholder="Client ID de PayPal..."
                />
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Client Secret
              </label>
              <div className="relative">
                <Input
                  type={showSecrets ? "text" : "password"}
                  value={config.paypal.clientSecret}
                  onChange={(e) => setConfig({
                    ...config,
                    paypal: { ...config.paypal, clientSecret: e.target.value }
                  })}
                  className="font-terminal pr-10"
                  placeholder="Client Secret de PayPal..."
                />
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => testConnection('paypal')}
              variant="outline"
              size="sm"
              className="font-terminal"
              disabled={!config.paypal.enabled}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Probar Conexión
            </Button>
            {testResults.paypal !== undefined && (
              <div className="flex items-center space-x-2">
                {testResults.paypal ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-terminal">
                  {testResults.paypal ? "Conexión exitosa" : "Error de conexión"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="font-terminal glow-effect"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Guardando..." : "Guardar Configuración"}
        </Button>
      </div>

      {/* Status Summary */}
      <Card className="terminal-border bg-background-secondary">
        <CardContent className="p-4">
          <h4 className="font-terminal font-bold text-primary mb-3">Estado de los Métodos de Pago</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="font-terminal">Stripe:</span>
              <Badge variant={config.stripe.enabled ? "outline" : "secondary"} className="font-terminal">
                {config.stripe.enabled ? "HABILITADO" : "DESHABILITADO"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-terminal">PayPal:</span>
              <Badge variant={config.paypal.enabled ? "outline" : "secondary"} className="font-terminal">
                {config.paypal.enabled ? "HABILITADO" : "DESHABILITADO"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfig; 