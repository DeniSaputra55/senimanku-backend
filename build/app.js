"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const userProfileRoute_1 = __importDefault(require("./routes/userProfileRoute"));
const produkRoute_1 = __importDefault(require("./routes/produkRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const typeRoute_1 = __importDefault(require("./routes/typeRoute"));
const assetRoute_1 = __importDefault(require("./routes/assetRoute"));
const lokasiRoute_1 = __importDefault(require("./routes/lokasiRoute"));
const privasipekerjaanRoute_1 = __importDefault(require("./routes/privasipekerjaanRoute"));
const daftarpekerjaanRoute_1 = __importDefault(require("./routes/daftarpekerjaanRoute"));
const flexibilityRoute_1 = __importDefault(require("./routes/flexibilityRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const adminProfileRoute_1 = __importDefault(require("./routes/adminProfileRoute"));
const app = (0, express_1.default)();
const port = 3000;
const path = require('path');
// middleware
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "secretSession",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize()); // inisialisasi passport di express
app.use(passport_1.default.session()); // mengelola otentikasi passport berbasis sesi
// Serve the index.html file when accessing the root URL
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', 'Assets', 'index.html'));
});
app.use("/api", userRoute_1.default);
app.use("/api", userProfileRoute_1.default);
app.use("/api", produkRoute_1.default);
app.use("/api", categoryRoute_1.default);
app.use("/api", typeRoute_1.default);
app.use("/api", assetRoute_1.default);
app.use("/api", lokasiRoute_1.default);
app.use("/api", privasipekerjaanRoute_1.default);
app.use("/api", daftarpekerjaanRoute_1.default);
app.use("/api", flexibilityRoute_1.default);
app.use("/api", adminRoute_1.default);
app.use("/api", adminProfileRoute_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
