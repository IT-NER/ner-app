import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// find
app.get("/car-model", async (req, res) => {
  let data = await find();
  res.status(200).json(data);
});
async function find() {
  let data = await prisma.carModel.findMany({
    include: {
      CarBrand: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}

//findOne
app.get("/car-model/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.carModel.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      CarBrand: true,
    },
  });
  return data;
}

//findByBrand
app.get("/car-model/brand/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findByBrand(id);
  res.status(200).json(data);
});
async function findByBrand(id) {
  let data = await prisma.carModel.findMany({
    where: {
      carBrandId: Number(id),
    },
    include: {
      CarBrand: true,
    },
  });
  return data;
}
//create
app.post("/car-model", async (req, res) => {
  let item = req.body.data;
  let data = await create(item);
  res.status(200).json(data);
});
async function create(item) {
  let data = await prisma.carModel.create({
    data: {
      name: String(item.name),
      carBrandId: Number(item.carBrandId),
    },
  });
  return data;
}
//update
app.put("/car-model/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let data = await update(id, item);
  res.status(200).json(data);
});
async function update(id, item) {
  let data = await prisma.carModel.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(item.name),
      carBrandId: Number(item.carBrandId),
    },
  });
  return data;
}

export default {
  path: "/api/admin",
  handler: app,
};
