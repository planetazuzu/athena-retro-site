import express from 'express';

const router = express.Router();

// Base de datos simple en memoria
let donations = [];

// Middleware para verificar autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  // En producción, aquí verificarías el JWT
  next();
};

// Obtener todas las donaciones
router.get('/', authenticateToken, (req, res) => {
  try {
    res.json({
      donations: donations.map(donation => ({
        id: donation.id,
        amount: donation.amount,
        donor: donation.donor,
        message: donation.message,
        status: donation.status,
        createdAt: donation.createdAt
      }))
    });
  } catch (error) {
    console.error('Error obteniendo donaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nueva donación
router.post('/', (req, res) => {
  try {
    const { amount, donor, message, paymentMethod } = req.body;

    // Validaciones básicas
    if (!amount || !donor) {
      return res.status(400).json({ error: 'Monto y donante son requeridos' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
    }

    // Crear nueva donación
    const newDonation = {
      id: `donation-${Date.now()}`,
      amount: parseFloat(amount),
      donor,
      message: message || '',
      status: 'pending',
      paymentMethod: paymentMethod || 'stripe',
      createdAt: new Date()
    };

    donations.push(newDonation);

    console.log(`✅ Nueva donación: €${amount} de ${donor}`);

    res.status(201).json({
      message: 'Donación creada exitosamente',
      donation: {
        id: newDonation.id,
        amount: newDonation.amount,
        donor: newDonation.donor,
        message: newDonation.message,
        status: newDonation.status,
        paymentMethod: newDonation.paymentMethod,
        createdAt: newDonation.createdAt
      }
    });
  } catch (error) {
    console.error('Error creando donación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar estado de donación (solo admin)
router.put('/:id/status', authenticateToken, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'completed', 'failed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const donationIndex = donations.findIndex(d => d.id === req.params.id);
    
    if (donationIndex === -1) {
      return res.status(404).json({ error: 'Donación no encontrada' });
    }

    donations[donationIndex].status = status;
    donations[donationIndex].updatedAt = new Date();

    console.log(`📝 Donación ${req.params.id} actualizada a: ${status}`);

    res.json({
      message: 'Estado de donación actualizado',
      donation: {
        id: donations[donationIndex].id,
        amount: donations[donationIndex].amount,
        donor: donations[donationIndex].donor,
        message: donations[donationIndex].message,
        status: donations[donationIndex].status,
        paymentMethod: donations[donationIndex].paymentMethod,
        createdAt: donations[donationIndex].createdAt,
        updatedAt: donations[donationIndex].updatedAt
      }
    });
  } catch (error) {
    console.error('Error actualizando donación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener estadísticas de donaciones
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const totalDonations = donations.length;
    const totalAmount = donations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
    
    const pendingDonations = donations.filter(d => d.status === 'pending').length;
    const completedDonations = donations.filter(d => d.status === 'completed').length;
    const failedDonations = donations.filter(d => d.status === 'failed').length;

    res.json({
      totalDonations,
      totalAmount,
      pendingDonations,
      completedDonations,
      failedDonations,
      averageDonation: totalDonations > 0 ? totalAmount / completedDonations : 0
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
