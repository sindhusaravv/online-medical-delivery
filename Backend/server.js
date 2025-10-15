const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Simple database (for now)
let users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Admin' },
    { id: 2, username: 'patient1', password: 'pass123', role: 'patient', name: 'John Doe' }
];

let products = [
    { id: 1, name: "Paracetamol 500mg", price: 5.99, category: "Pain Relief", stock: 50 },
    { id: 2, name: "Vitamin C 1000mg", price: 12.99, category: "Supplements", stock: 30 },
    { id: 3, name: "Ibuprofen 400mg", price: 8.49, category: "Pain Relief", stock: 25 }
];

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

// Get products route
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Medical delivery server running on http://localhost:${PORT}`);
});