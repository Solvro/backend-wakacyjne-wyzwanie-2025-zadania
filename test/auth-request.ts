import type { Server } from "node:http";
import request from "supertest";

export function authRequest(server: Server, token: string) {
  return (method: "post" | "patch" | "delete", url: string) =>
    request(server)[method](url).set("Authorization", `Bearer ${token}`);
}
