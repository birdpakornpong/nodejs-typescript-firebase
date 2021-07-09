"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
require("firebase/storage");
const app = new koa_1.default();
const router = new koa_router_1.default();
// config firebase
const config = {
    apiKey: "AIzaSyCHHZAbbUZGafCPw7Q-54ixk2p2X5qNmec",
    authDomain: "fir-realtime-4c62d.firebaseapp.com",
    databaseURL: "https://fir-realtime-4c62d-default-rtdb.firebaseio.com",
    projectId: "fir-realtime-4c62d",
    storageBucket: "fir-realtime-4c62d.appspot.com",
    messagingSenderId: "434097444382",
    appId: "1:434097444382:web:68b08263d08e8890a5000f",
    measurementId: "G-EP9TLK729W",
};
// เรียกใช้ firebase
app_1.default.initializeApp(config);
const db = app_1.default.firestore();
// Middlewares
app.use(koa_json_1.default());
app.use(koa2_cors_1.default({
    origin: "*",
}));
app.use(koa_bodyparser_1.default({
    formLimit: "10mb",
}));
app.use(koa_logger_1.default());
// function add to collection in firebase
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        db.collection("productAddToCart").add({
            barcode: "12345678910",
            price: 9000,
            createdAt: new Date(),
            displayName: "bird",
            isOnePrice: false,
            quantity: 30,
            sapProductId: "12345678910",
            selectedAddress: "birds",
        });
    });
}
// api test add data to firebase firestore
router.get("/firebase", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield addUser();
    ctx.body = { msg: "test add data to firebase2" };
}));
// api test get with koa
router.get("/", (ctx) => {
    ctx.body = { msg: "Hello world" };
});
router.get("/test", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { msg: "Hello Birth" };
    yield next();
}));
router.get("/test2", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { msg: "Hello Pang" };
    yield next();
}));
router.post(`/test-post`, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.status = 201;
    const usePost = ctx.request.body;
    ctx.body = usePost;
}));
router.post("/test-post-interface", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    ctx.body = { name: data.name };
    yield next();
}));
const verhicelPerson = [
    { v: "car", name: "bird" },
    { v: "bike", name: "pang" },
    { v: "airplane", name: "meow" },
];
router.get("/verhicle", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = verhicelPerson;
}));
// Routes
app.use(router.routes()).use(router.allowedMethods());
app.listen(5000, () => {
    console.log("port start localhost:6666");
});
