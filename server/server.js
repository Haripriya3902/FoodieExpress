const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database for development (replace with MongoDB in production)
const users = [];
const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "25-30 min",
    deliveryFee: 2.99,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Gourmet burgers made with fresh ingredients",
    address: "123 Main Street, Downtown",
    isOpen: true,
    offers: ["20% off on orders above $25", "Free delivery on first order"],
    menu: [
      {
        id: 1,
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, onion, and special sauce",
        price: 12.99,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Burgers",
        isVeg: false,
        rating: 4.6,
        bestseller: true
      },
      {
        id: 2,
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables",
        price: 10.99,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Burgers",
        isVeg: true,
        rating: 4.3
      }
    ]
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "20-25 min",
    deliveryFee: 1.99,
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Authentic Italian pizzas with fresh toppings",
    address: "456 Oak Avenue, Midtown",
    isOpen: true,
    offers: ["Buy 2 Get 1 Free on selected pizzas"],
    menu: [
      {
        id: 3,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, and basil",
        price: 14.99,
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Pizza",
        isVeg: true,
        rating: 4.7,
        bestseller: true
      },
      {
        id: 4,
        name: "Pepperoni Pizza",
        description: "Classic pepperoni with mozzarella cheese",
        price: 16.99,
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "Pizza",
        isVeg: false,
        rating: 4.5
      }
    ]
  }
];

const orders = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      phone,
      createdAt: new Date()
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Restaurant Routes
app.get('/api/restaurants', (req, res) => {
  const { search, category } = req.query;
  let filteredRestaurants = restaurants;

  if (search) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category && category !== 'all') {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.cuisine.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(filteredRestaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }
  res.json(restaurant);
});

// Order Routes (Protected)
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items, restaurantId, total } = req.body;
    
    const order = {
      id: orders.length + 1,
      userId: req.user.id,
      items,
      restaurantId,
      total,
      status: 'preparing',
      estimatedTime: '25-30 min',
      orderTime: new Date()
    };

    orders.push(order);

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

// User Profile Route (Protected)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});