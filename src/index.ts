import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import json from "koa-json";

import { Context } from "koa";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const app = new Koa();
const router = new Router();

// config firebase
const config = {
  apiKey: "AIzaSyCHHZAbbUZGafCPw7Q-54ixk2p2X5qNmec",
  authDomain: "fir-realtime-4c62d.firebaseapp.com",
  projectId: "fir-realtime-4c62d",
  storageBucket: "fir-realtime-4c62d.appspot.com",
  messagingSenderId: "434097444382",
  appId: "1:434097444382:web:68b08263d08e8890a5000f",
  measurementId: "G-EP9TLK729W",
};

// เรียกใช้ firebase
firebase.initializeApp(config);
const db = firebase.firestore();

// Middlewares
app.use(json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  bodyParser({
    formLimit: "10mb",
  })
);
app.use(logger());

// function add to collection in firebase
async function addUser() {
  db.collection("user").add({ data: ["bird test add data"] });
}

// api test add data to firebase firestore
router.get("/firebase", async (ctx: Context) => {
  await addUser();
  ctx.body = { msg: "test add data to firebase" };
});

// api test get with koa
router.get("/", (ctx: Context) => {
  ctx.body = { msg: "Hello world" };
});

router.get("/test", async (ctx: Context, next: any) => {
  ctx.body = { msg: "Hello Birth" };
  await next();
});

router.get("/test2", async (ctx: Context, next) => {
  ctx.body = { msg: "Hello Pang" };
  await next();
});

router.post(`/test-post`, async (ctx) => {
  ctx.status = 201;
  const usePost = ctx.request.body;

  ctx.body = usePost;
});

interface HelloRequest {
  name: string;
}

router.post("/test-post-interface", async (ctx, next) => {
  const data = <HelloRequest>ctx.request.body;
  ctx.body = { name: data.name };
  await next();
});

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("port start localhost:3000");
});
