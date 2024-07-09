let express = require("express");
let moment = require("moment");

// prisma
let { PrismaClient } = require("@prisma/client");
let prisma = new PrismaClient();

// multer
let multer = require("multer");
let path = require("path");

// app
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// generateTicket
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
      let num = parseInt(item[0].ticket.substring(2)) + parseInt(1);
      ticket = String(str + num);
    } else {
      ticket = String(str + dateNow + "001");
    }
  } else {
    ticket = String(str + dateNow + "001");
  }

  return ticket;
}

// generateCode
async function generateOTP() {
  let digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}

// create
app.post("/reward", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();
  let code = await generateOTP();

  let reward = await prisma.reward.create({
    data: {
      ticket: String(ticket),
      code: String(code),
      userId: Number(item.userId),
    },
    include: {
      RewardImg: true,
      User: true,
    },
  });
  res.status(200).json(reward);
});

// getAll
app.get("/reward", async (req, res) => {
  let reward = await prisma.reward.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],

    include: {
      RewardImg: true,
      User: true,
    },
  });
  res.status(200).json(reward);
});

//getRewardByTicket
app.get("/reward/ticket/:id", async (req, res) => {
  let { id } = req.params;
  let reward = await prisma.reward.findUnique({
    where: {
      ticket: String(id),
    },
    include: {
      RewardImg: true,
      User: true,
    },
  });
  res.status(200).json(reward);
});

//update
app.put("/reward/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let reward = await prisma.reward.update({
    where: {
      id: parseInt(id),
    },
    data: {
      code: item.code,
      name: item.name,
      description: item.description,
      point: Number(item.point),
    },
    include: {
      RewardImg: true,
      User: true,
    },
  });
  res.status(200).json(reward);
});

export default {
  path: "/api",
  handler: app,
};
