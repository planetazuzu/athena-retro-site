import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, 
  Euro, 
  Gift, 
  CreditCard, 
  Users, 
  Clock, 
  CheckCircle, 
  Loader2, 
  Star,
  Crown,
  Zap,
  Shield,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Eye,
  EyeOff
} from "lucide-react";
import { useAdvancedDonations, DonationGoal, DonationReward } from "@/hooks/useAdvancedDonations";

interface DonationFormProps {
  goal: DonationGoal;
  onSuccess?: (donationId: string) => void;
  onCancel?: () => void;
}

const DonationForm = ({ goal, onSuccess, onCancel }: DonationFormProps) => {
  const { createDonation, getGoalProgress } = useAdvancedDonations();
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCustomAmount, setShowCustomAmount] = useState<boolean>(false);

  const progress = getGoalProgress(goal.id);
  if (!progress) return null;

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setShowCustomAmount(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
    }
  };

  const handleRewardSelect = (rewardId: string) => {
    setSelectedReward(rewardId);
    const reward = goal.rewards.find(r => r.id === rewardId);
    if (reward) {
      setSelectedAmount(reward.minAmount);
      setCustomAmount('');
      setShowCustomAmount(false);
    }
  };

  const getFinalAmount = () => {
    if (showCustomAmount && customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const canDonate = () => {
    const amount = getFinalAmount();
    return amount > 0 && donorName.trim() && donorEmail.trim() && !isProcessing;
  };

  const handleDonate = async () => {
    if (!canDonate()) return;

    setIsProcessing(true);
    try {
      const result = await createDonation(
        goal.id,
        'current_user',
        donorName.trim(),
        donorEmail.trim(),
        getFinalAmount(),
        'EUR',
        message.trim() || undefined,
        isAnonymous,
        selectedReward || undefined,
        paymentMethod
      );

      if (result.success) {
        onSuccess?.(result.donation!.id);
      } else {
        alert('Error al procesar la donación: ' + result.error);
      }
    } catch (error) {
      alert('Error al procesar la donación');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getRewardIcon = (reward: DonationReward) => {
    if (reward.minAmount >= 500) return <Crown className="h-4 w-4" />;
    if (reward.minAmount >= 100) return <Star className="h-4 w-4" />;
    if (reward.minAmount >= 50) return <Zap className="h-4 w-4" />;
    return <Gift className="h-4 w-4" />;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Información de la Meta */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>APOYAR: {goal.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground font-terminal">{goal.description}</p>
            
            {/* Progreso */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-terminal">
                  {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                </span>
                <span className="text-sm text-muted-foreground font-terminal">
                  {progress.progress.toFixed(1)}%
                </span>
              </div>
              <Progress value={progress.progress} className="h-2" />
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary font-terminal">
                  {progress.donationsCount}
                </div>
                <div className="text-xs text-muted-foreground font-terminal">Donaciones</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary font-terminal">
                  {progress.daysLeft}
                </div>
                <div className="text-xs text-muted-foreground font-terminal">Días restantes</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary font-terminal">
                  {goal.rewards.length}
                </div>
                <div className="text-xs text-muted-foreground font-terminal">Recompensas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de Donación */}
      <Card className="terminal-border">
        <CardHeader>
          <CardTitle className="font-terminal">REALIZAR DONACIÓN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cantidad */}
          <div className="space-y-4">
            <h3 className="font-terminal font-bold text-primary">Selecciona la cantidad</h3>
            
            {/* Cantidades predefinidas */}
            <div className="grid grid-cols-3 gap-3">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount && !showCustomAmount ? "default" : "outline"}
                  className="font-terminal"
                  onClick={() => handleAmountSelect(amount)}
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>

            {/* Cantidad personalizada */}
            <div className="space-y-2">
              <Button
                variant={showCustomAmount ? "default" : "outline"}
                className="font-terminal w-full"
                onClick={() => setShowCustomAmount(!showCustomAmount)}
              >
                {showCustomAmount ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                Cantidad personalizada
              </Button>
              
              {showCustomAmount && (
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-10 font-terminal"
                    min="1"
                    step="0.01"
                  />
                </div>
              )}
            </div>

            {getFinalAmount() > 0 && (
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-terminal">
                    {formatCurrency(getFinalAmount())}
                  </div>
                  <div className="text-sm text-muted-foreground font-terminal">
                    Cantidad total a donar
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recompensas */}
          {goal.rewards.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-terminal font-bold text-primary">Recompensas disponibles</h3>
              <div className="space-y-3">
                {goal.rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-4 border rounded-sm cursor-pointer transition-all duration-200 ${
                      selectedReward === reward.id
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/30 hover:border-primary/50'
                    }`}
                    onClick={() => handleRewardSelect(reward.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getRewardIcon(reward)}
                          <h4 className="font-terminal font-bold text-primary">{reward.title}</h4>
                          <Badge variant="outline" className="font-terminal">
                            {formatCurrency(reward.minAmount)}+
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-terminal mb-2">
                          {reward.description}
                        </p>
                        <div className="space-y-1">
                          {reward.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              <span className="text-muted-foreground font-terminal">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground font-terminal">
                          {reward.currentBackers} / {reward.maxBackers || '∞'} backers
                        </div>
                        {reward.isLimited && (
                          <div className="text-xs text-orange-400 font-terminal">
                            Limitado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Información del donante */}
          <div className="space-y-4">
            <h3 className="font-terminal font-bold text-primary">Información del donante</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                  Nombre *
                </label>
                <Input
                  placeholder="Tu nombre"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="font-terminal"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="font-terminal"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-primary font-terminal mb-2 block">
                Mensaje (opcional)
              </label>
              <Textarea
                placeholder="Deja un mensaje de apoyo..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="font-terminal"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
              />
              <label htmlFor="anonymous" className="text-sm font-terminal">
                Donación anónima
              </label>
            </div>
          </div>

          {/* Método de pago */}
          <div className="space-y-4">
            <h3 className="font-terminal font-bold text-primary">Método de pago</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={paymentMethod === 'stripe' ? "default" : "outline"}
                className="font-terminal"
                onClick={() => setPaymentMethod('stripe')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Tarjeta
              </Button>
              <Button
                variant={paymentMethod === 'paypal' ? "default" : "outline"}
                className="font-terminal"
                onClick={() => setPaymentMethod('paypal')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                PayPal
              </Button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-4">
            <Button
              className="flex-1 font-terminal"
              onClick={handleDonate}
              disabled={!canDonate()}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Donar {formatCurrency(getFinalAmount())}
                </>
              )}
            </Button>
            {onCancel && (
              <Button variant="outline" className="font-terminal" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationForm;
