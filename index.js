const express = require("express");
require("./config/db");
const app = express();
require("dotenv").config();
const authMiddleware = require("./Middleware/auth-middlewar");

const PORT = process.env.PORT || 3000;

const productRoutes = require("./routers/productRoutes");
const categoryRoutes = require("./routers/categoryRoutes");
const userRoutes = require("./routers/userRoutes");
const orderRoutes = require("./routers/orderRoutes");
const apiSecretMiddleware = require("./Middleware/apiSecretMiddleware");
const cartRoutes = require("./routers/cartRoutes");
const reviewRoutes = require("./routers/reviewRoutes");
app.use(express.json());
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/categories",authMiddleware, categoryRoutes);
app.use("/api/users", apiSecretMiddleware, userRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);
app.use("/api/carts",authMiddleware, cartRoutes );
app.use("/api/reviews", authMiddleware, reviewRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
