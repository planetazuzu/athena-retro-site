import express from 'express';

const router = express.Router();

// Base de datos simple en memoria
let users = [];

// Middleware para verificar autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  // En producción, aquí verificarías el JWT
  // Por ahora, simulamos que el token es válido
  next();
};

// Obtener todos los usuarios (solo admin)
router.get('/', authenticateToken, (req, res) => {
  try {
    // En producción, verificar que el usuario sea admin
    res.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener usuario por ID
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar usuario
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { name, isVerified } = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar campos
    if (name) users[userIndex].name = name;
    if (typeof isVerified === 'boolean') users[userIndex].isVerified = isVerified;

    res.json({
      message: 'Usuario actualizado exitosamente',
      user: {
        id: users[userIndex].id,
        email: users[userIndex].email,
        name: users[userIndex].name,
        role: users[userIndex].role,
        isVerified: users[userIndex].isVerified,
        createdAt: users[userIndex].createdAt
      }
    });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar usuario
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No permitir eliminar admin
    if (users[userIndex].role === 'admin') {
      return res.status(403).json({ error: 'No se puede eliminar un administrador' });
    }

    users.splice(userIndex, 1);

    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
