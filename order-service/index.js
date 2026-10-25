const express = require('express');
const app = express();
app.use(express.json());
 
let orders = [
  { id: 1, item: 'Veg Biryani', canteen: 'Main Canteen', status: 'PLACED' },
  { id: 2, item: 'Masala Dosa', canteen: 'Block A Canteen', status: 'PREPARING' }
];
 
// Get all orders
app.get('/orders', (req, res) => res.json(orders));
 
// Place a new order
app.post('/orders', (req, res) => {
  const order = { id: orders.length + 1, ...req.body, status: 'PLACED' };
  orders.push(order);
  res.status(201).json(order);
});

// NEW FEATURE: track order status by id
app.get('/orders/:id/status', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ id: order.id, status: order.status });
});

// NEW FEATURE: health check endpoint
app.get('/health', (req, res) => res.json({ service: 'Order Service', status: 'UP' }));
 
app.listen(3000, () => console.log('Order Service running on port 3000'));
