import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Credenciales de admin (en producción deberían estar en variables de entorno)
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'planetazuzu@gmail.com',
  password: process.env.ADMIN_PASSWORD || '941259018a'
};

// Base de datos simple en memoria (en producción usar PostgreSQL)
let users = [
  {
    id: 'admin-1',
    email: ADMIN_CREDENTIALS.email,
    name: 'Administrador',
    role: 'admin',
    isVerified: true,
    createdAt: new Date()
  }
];

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validaciones básicas
    if (!email || !name) {
      return res.status(400).json({ error: 'Email y nombre son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
      isVerified: false,
      createdAt: new Date()
    };

    users.push(newUser);

    // En producción, aquí enviarías un email de verificación
    console.log(`✅ Usuario registrado: ${email}`);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        isVerified: newUser.isVerified
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    let user = null;

    // Verificar si es admin
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      user = users.find(u => u.email === email);
    } else {
      // Buscar usuario normal
      user = users.find(u => u.email === email && u.isVerified);
      
      // En producción, aquí verificarías la contraseña hasheada
      if (user) {
        // Simulación de verificación de contraseña
        // En producción: const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        const isValidPassword = true; // Por ahora siempre válido
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear JWT (en producción usar variables de entorno)
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Verificar token
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Logout (en JWT no hay logout real, pero podemos invalidar tokens)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout exitoso' });
});

export default router;
