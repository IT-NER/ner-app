import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// find
app.get("/car-color", async (req, res) => {
  let data = await find();
  res.status(200).json(data);
});
async function find() {
  let data = await prisma.carColor.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}
// findSortByNameAsc
app.get("/car-color-asc", async (req, res) => {
  let data = await findSortByNameAsc();
  res.status(200).json(data);
});
async function findSortByNameAsc() {
  let data = await prisma.carColor.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return data;
}
//findOne
app.get("/car-color/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.carColor.findFirst({
    where: {
      id: Number(id),
    },
  });
  return data;
}

//create
app.post("/car-color", async (req, res) => {
  let item = req.body.data;
  let data = await create(item);
  res.status(200).json(data);
});
async function create(item) {
  let data = await prisma.carColor.create({
    data: {
      name: String(item.name),
    },
  });
  return data;
}
//update
app.put("/car-color/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let data = await update(id, item);
  res.status(200).json(data);
});
async function update(id, item) {
  let data = await prisma.carColor.update({
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
