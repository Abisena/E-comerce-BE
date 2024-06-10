import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/Product/productRoutes.js";
import categoryRoutes from "./routes/Category/categoryRoutes.js";
import cartRoutes from "./routes/Cart/cartRoutes.js";
import cartItemRoutes from "./routes/CartItem/cartItemRoutes.js";
import orderRoutes from "./routes/Order/orderRoutes.js";
import orderItemRoutes from "./routes/OrderItem/orderItem.js";
import reviewRoutes from "./routes/Review/reviewRoutes.js";
import addressRoutes from "./routes/Address/addressRoutes.js";
import paymentRoutes from "./routes/Payment/paymentRoutes.js";
import stockRoutes from "./routes/Stok/stokRoutes.js";
import { securityHeaders } from "./middleware/securtyHeader.js";
import { limiter } from "./middleware/Limit.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { PORT } from "./config/env.js";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(securityHeaders);
app.use(limiter);
app.use(requestLogger);
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    credentials: true,
  })
);

// app.use(cors());

app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(cartRoutes);
app.use(cartItemRoutes);
app.use(orderRoutes);
app.use(orderItemRoutes);
app.use(reviewRoutes);
app.use(addressRoutes);
app.use(paymentRoutes);
app.use(stockRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
