import express, { json } from "express";

const PORT = +(process.env.PORT || "8080");

const app = express()
    .use(json());

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
