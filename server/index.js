import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";

import path from "path";
import { fileURLToPath } from "url";
import { unlinkSync } from "fs";

import generator from "simple-generator-avatar";

import { collection } from "./collection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let lastImage = "";

const app = fastify({ logger: true });

await app.register(cors, {
  origin: true,
});

await app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

app.get("/", async () => {
  if (lastImage) {
    unlinkSync(`./public/${lastImage}`);
  }
  const data = await generator("./assets/", collection, './public/');

  lastImage = data;

  return { data };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
