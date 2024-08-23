import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
let app = express();
app.use(express.json());

// findAll
app.get("/point-pay-status", async (req, res) => {
  let data = await findAll();
  res.status(200).json(data);
});

async function findAll() {
  let data = await prisma.pointPayStatus.findMany({
    where: {
      id: {
        in: [1, 2, 3],
      },
    },
  });
  return data;
}

export default {
  path: "/api",
  handler: app,
};
