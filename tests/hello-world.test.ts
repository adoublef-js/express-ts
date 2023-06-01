import { describe, it, expect } from "vitest";
import { createServer } from ".";

describe("hello-world", () => {
    const { server } = createServer();

    it("should return a greeting", async () => {
        const res = await server.get("/");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "Hello World!" });
    });
});
