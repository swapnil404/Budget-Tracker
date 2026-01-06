import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/src/app.ts";

const client = hc<ApiRoutes>((import.meta.env.VITE_API_URL || "").replace(
  /\/$/,
  ""
));

export const api = (client as any).api;
