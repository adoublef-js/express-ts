import express, { json } from "express";
import supertest from "supertest";

export function createServer() {
    const app = express()
        .use(json())
        .get("/", (req, res) => res.json({ message: "Hello World!" }));

    const server = supertest(app);

    return { server };
}
