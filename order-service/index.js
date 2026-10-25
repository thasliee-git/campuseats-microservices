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
 
app.listen(3000, () => console.log('Order Service running on port 3000'));
