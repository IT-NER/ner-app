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
    callback(null, "static/uploads/reward/");
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

//uploads
app.post("/reward/uploads", upload.array("files"), async (req, res) => {
  // res.json(req.files);
  let rewardImg = await createRewardImg(req.body.id, req.files);
  let data = await findOne(req.body.id);
  res.status(200).json(data);
});

// findAll
app.get("/reward", async (req, res) => {
  let data = await findAll();
  res.status(200).json(data);
});
// findOne
app.get("/reward/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
// updateActive
app.get("/reward/update/active/:id", async (req, res) => {
  let { id } = req.params;
  let data = await updateActive(id);
  res.status(200).json(data);
});
// create
app.post("/reward", async (req, res) => {
  let item = req.body.data;
  let data = await create(item);
  res.status(200).json(data);
});
// update
app.put("/reward/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;
  let data = await update(id, item);
  res.status(200).json(data);
});
// deleteRewardImgById
app.delete("/reward/delete/rewardImg/:id", async (req, res) => {
  let { id } = req.params;
  let data = await deleteRewardImgById(id);
  res.status(200).json(data);
});
//
//
//
//
// getTicket
async function generateTicket() {
  let str = "RE";
  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.reward.findMany({
    orderBy: [
      {
        ticket: "desc",
      },
    ],
  });

  if (item.length > 0) {
    let lastCode = String(item[0].ticket).substring(2, 8);

    if (lastCode == dateNow) {
      let num = Number(item[0].ticket.substring(2)) + Number(1);
      ticket = String(str + num);
    } else {
      ticket = String(str + dateNow + "001");
    }
  } else {
    ticket = String(str + dateNow + "001");
  }

  return ticket;
}
// getCode
async function generateOTP() {
  let digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}
async function findAll() {
  let data = await prisma.reward.findMany({
    include: {
      RewardImg: true,
      User: {
        include: {
          PointPay: true,
          PointPayRequest: true,
          Position: true,
          Department: true,
          Role: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}
async function findOne(id) {
  let data = await prisma.reward.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      RewardImg: true,
      User: {
        include: {
          PointPay: true,
          PointPayRequest: true,
          Position: true,
          Department: true,
          Role: true,
        },
      },
    },
  });
  return data;
}
async function updateActive(id) {
  let reward = await findOne(id);
  let active = false;
  if (reward.active) {
    active = false;
  } else {
    active = true;
  }

  let data = await prisma.reward.update({
    where: {
      id: Number(id),
    },
    data: {
      active: Boolean(active),
    },
  });
  return data;
}
async function create(item) {
  let ticket = await generateTicket();
  let code = await generateOTP();

  let data = await prisma.reward.create({
    data: {
      ticket: String(ticket),
      code: String(code),
      name: null,
      description: null,
      point: 0,
      userId: Number(item.userId),
      active: Boolean(true),
    },
  });
  return data;
}
async function update(id, item) {
  let data = await prisma.reward.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(item.name),
      description: String(item.description),
      point: Number(item.point),
    },
  });
  return data;
}
async function createRewardImg(id, files) {
  let items = [];
  files.forEach((e) => {
    let item = {
      rewardId: Number(id),
      name: String(e.filename),
      path: String(e.destination),
      url: String("/uploads/reward/" + e.filename),
    };
    items.push(item);
  });

  let data = await prisma.rewardImg.createMany({
    data: items,
  });

  return data;
}
async function deleteRewardImgById(id) {
  let data = await prisma.rewardImg.delete({
    where: {
      id: Number(id),
    },
  });
  return data;
}
export default {
  path: "/api/admin",
  handler: app,
};
