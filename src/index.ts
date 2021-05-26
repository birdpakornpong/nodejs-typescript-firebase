import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import { Context } from "koa";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const app = new Koa();
const router = new Router();

const config = {
  apiKey: "AIzaSyCHHZAbbUZGafCPw7Q-54ixk2p2X5qNmec",
  authDomain: "fir-realtime-4c62d.firebaseapp.com",
  projectId: "fir-realtime-4c62d",
  storageBucket: "fir-realtime-4c62d.appspot.com",
  messagingSenderId: "434097444382",
  appId: "1:434097444382:web:68b08263d08e8890a5000f",
  measurementId: "G-EP9TLK729W",
};

firebase.initializeApp(config);
const db = firebase.firestore();

router.get("/", (ctx: Context) => {
  ctx.body = { msg: "Hello world" };
});

router.get("/test", async (ctx: Context, next: any) => {
  ctx.body = { msg: "Hello Birth" };
  await next();
});

router.get("/test2", async (ctx: Context, next: any) => {
  ctx.body = { msg: "Hello Pang" };
  await next();
});

async function addUser() {
  db.collection("user").add({ data: ["bird test add data"] });
}

router.get("/firebase", async (ctx: Context) => {
  await addUser();
  ctx.body = { msg: "test add data to firebase" };
});
// Middlewares
app.use(json());
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("port start localhost:3000");
});
