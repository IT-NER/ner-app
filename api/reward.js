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

// create ticket reward
app.post("/reward/ticket", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();

  let reward = await prisma.reward.create({
    data: {
      ticket: ticket,
      userId: item.id,
    },
  });
  res.status(200).json(reward);
});

// generate ticket reward REYYMMDD001
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
      author: true,
    },
  });
  res.status(200).json(reward);
});

//getById
app.get("/reward/:id", async (req, res) => {
  let { id } = req.params;
  let reward = await prisma.reward.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(reward);
});

//create
app.post("/reward", async (req, res) => {
  let item = req.body.data;
  let reward = await prisma.reward.create({
    data: {
      name: item.name,
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
      name: item.name,
      description: item.description,
      point: Number(item.point),
    },
  });
  res.status(200).json(reward);
});

//delete
app.delete("/reward/:id", async (req, res) => {
  let id = req.params.id;
  let reward = await prisma.reward.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(reward);
});

export default {
  path: "/api",
  handler: app,
};
