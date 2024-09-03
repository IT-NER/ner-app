import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import multer from "multer";
//
//
//
const app = express();
const prisma = new PrismaClient();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "static/uploads/car/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}.jpg`);
  },
});
const upload = multer({ storage: storage });
//
//
//
app.use(express.json());

//upload
app.post("/car/upload", upload.single("file"), async (req, res) => {
  let car = await updateCarImg(req.body.id, req.file);
  let data = await findOne(req.body.id);
  res.status(200).json(data);
});
async function updateCarImg(id, file) {
  // console.log("file", file);

  let url = String("/uploads/car/" + file.filename);

  let data = await prisma.car.update({
    where: {
      id: Number(id),
    },
    data: {
      img: String(url),
    },
  });
  return data;
}

//uploads
app.post("/car/uploads", upload.array("files"), async (req, res) => {
  let car = await createCarImg(req.body.id, req.files);
  let data = await findOne(req.body.id);
  res.status(200).json(data);
});
async function createCarImg(id, files) {
  // console.log("files", files);

  let items = [];
  files.forEach((e) => {
    let url = String("/uploads/car/" + e.filename);
    let item = {
      carId: Number(id),
      name: String(e.filename),
      url: String(url),
    };
    items.push(item);
  });

  let data = await prisma.carImg.createMany({
    data: items,
  });

  return data;
}

// find
app.get("/car", async (req, res) => {
  let data = await find();
  res.status(200).json(data);
});
async function find() {
  let data = await prisma.car.findMany({
    include: {
      CarType: true,
      CarBrand: true,
      CarModel: true,
      CarColor: true,
      CarImg: true,
      Province: true,
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
app.get("/car/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.car.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      CarType: true,
      CarBrand: true,
      CarModel: true,
      CarColor: true,
      CarImg: true,
      Province: true,
    },
  });
  return data;
}

//create
app.post("/car", async (req, res) => {
  let item = req.body.data;
  let data = await create(item);
  res.status(200).json(data);
});
async function create(item) {
  let province = await prisma.province.findFirst({
    where: {
      id: Number(item.provinceId),
    },
  });

  item.name = String(item.reg + "-" + province.name);
  let data = await prisma.car.create({
    data: {
      name: String(item.name),
      reg: String(item.reg),
      qty: Number(item.qty),
      mileage: Number(item.mileage),
      active: Boolean(item.active),
      remark: String(item.remark),
      carTypeId: Number(item.carTypeId),
      carBrandId: Number(item.carBrandId),
      carModelId: Number(item.carModelId),
      carColorId: Number(item.carColorId),
      provinceId: Number(item.provinceId),
    },
  });
  return data;
}
//update
app.put("/car/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let data = await update(id, item);
  res.status(200).json(data);
});
async function update(id, item) {
  let province = await prisma.province.findFirst({
    where: {
      id: Number(item.provinceId),
    },
  });

  item.name = String(item.reg + "-" + province.name);

  let data = await prisma.car.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(item.name),
      reg: String(item.reg),
      qty: Number(item.qty),
      mileage: Number(item.mileage),
      active: Boolean(item.active),
      remark: String(item.remark),
      carTypeId: Number(item.carTypeId),
      carBrandId: Number(item.carBrandId),
      carModelId: Number(item.carModelId),
      carColorId: Number(item.carColorId),
      provinceId: Number(item.provinceId),
    },
  });
  return data;
}

export default {
  path: "/api/admin",
  handler: app,
};
