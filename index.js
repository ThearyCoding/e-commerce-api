const express = require("express");
require("dotenv").config();
require("./config/db");
const app = express();
const authMiddleware = require("./Middleware/auth-middlewar");

const PORT = process.env.PORT || 3000;
const Order = require("./models/Order");
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api/products", authMiddleware, require("./routers/productRoutes"));
app.use("/api/categories", authMiddleware, require("./routers/categoryRoutes"));
app.use("/api/users", require("./routers/userRoutes"));
app.use("/api/orders", authMiddleware, require("./routers/orderRoutes"));
app.use("/api/carts", authMiddleware, require("./routers/cartRoutes"));
app.use("/api/reviews", authMiddleware, require("./routers/reviewRoutes"));
app.use("/api/wishlists", authMiddleware, require("./routers/wishlistRoutes"));


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const riders = new Set();
const users = new Set();

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'identify') {
        if (data.role === 'rider') {
          riders.add(ws);
          console.log('Rider connected');
        } else if (data.role === 'user') {
          users.add(ws);
          console.log('User connected');
        }
      } else if (data.type === 'locationUpdate') {
        const { orderId, latitude, longitude } = data;

        console.log(`Updated location for order ${orderId}: ${latitude}, ${longitude}`);
        users.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: 'locationUpdate',
                orderId,
                latitude,
                longitude,
              })
            );
          }
        });
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    riders.delete(ws);
    users.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});



app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
