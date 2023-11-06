import express, { Express } from "express";
import session from "express-session";
import passport from "./config/passport";

import userRoute from "./routes/userRoute";
import userProfileRoute from "./routes/userProfileRoute";
import produkRoute from "./routes/produkRoute";
import categoryRoute from "./routes/categoryRoute";
import typeRoute from "./routes/typeRoute";
import assetRoute from "./routes/assetRoute";
import lokasiRoute from "./routes/lokasiRoute";
import privasipekerjaan from "./routes/privasipekerjaanRoute";
import daftarpekerjaanRoute from "./routes/daftarpekerjaanRoute";
import flexibilityRoute from "./routes/flexibilityRoute";
import adminRoute from "./routes/adminRoute";
import adminProfileRoute from "./routes/adminProfileRoute";
const app: Express = express();
const port = 3000;
const path = require('path');

// middleware
app.use(express.json());

app.use(
  session({
    secret: "secretSession",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // inisialisasi passport di express
app.use(passport.session()); // mengelola otentikasi passport berbasis sesi

// Serve the index.html file when accessing the root URL
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'pages', 'Assets', 'index.html'));
});

app.use("/api", userRoute);
app.use("/api", userProfileRoute);
app.use("/api", produkRoute);
app.use("/api", categoryRoute);
app.use("/api", typeRoute);
app.use("/api", assetRoute);
app.use("/api", lokasiRoute);
app.use("/api", privasipekerjaan);
app.use("/api", daftarpekerjaanRoute);
app.use("/api", flexibilityRoute);
app.use("/api", adminRoute);
app.use("/api", adminProfileRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
