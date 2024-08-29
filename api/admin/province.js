import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// find
app.get("/province", async (req, res) => {
  let data = await find();
  res.status(200).json(data);
});
async function find() {
  let data = await prisma.province.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}

//findOne
app.get("/province/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.province.findFirst({
    where: {
      id: Number(id),
    },
  });
  return data;
}

//create
app.post("/province", async (req, res) => {
  let item = req.body.data;
  let data = await create(item);
  res.status(200).json(data);
});
async function create(item) {
  let data = await prisma.province.create({
    data: {
      name: String(item.name),
    },
  });
  return data;
}
//update
app.put("/province/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let data = await update(id, item);
  res.status(200).json(data);
});
async function update(id, item) {
  let data = await prisma.province.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(item.name),
    },
  });
  return data;
}

export default {
  path: "/api/admin",
  handler: app,
};
