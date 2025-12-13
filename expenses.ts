import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
const expensesRoute = new Hono();

expensesRoute.use("*", logger());

type expense = {
  id: number;
  title: string;
  amount: number;
};
const fakeExpenses: expense[] = [
  { id: 1, title: "Groceries", amount: 52.75 },
  { id: 2, title: "Electricity Bill", amount: 120.0 },
  { id: 3, title: "Monthly Rent", amount: 1500.0 },
  { id: 4, title: "Gym Membership", amount: 29.99 },
  { id: 5, title: "Coffee", amount: 4.5 },
];

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  amount: z.number().positive(),
});

expensesRoute.get("/", async (c) => {
  return c.json({ expense: fakeExpenses });
});
expensesRoute.post("/", async (c) => {
  const data = await c.req.json();
  const expense = createPostSchema.parse(data);
  fakeExpenses.push({...expense,id:fakeExpenses.length+1})
  return c.json({ expense });
});

export { expensesRoute };
