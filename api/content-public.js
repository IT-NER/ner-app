import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// generateTicket
async function generateTicket() {
  let str = "PB";
  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.contentPublic.findMany({
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

// create
app.post("/contentPublic", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();

  console.log("item", item);

  let contentPublic = await prisma.contentPublic.create({
    data: {
      ticket: String(ticket),
      userId: Number(item.userId),
    },
    include: {
      ContentPublicUser: true,
      User: true,
      Content: {
        include: {
          ContentStatus: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

// findAll
app.get("/contentPublic", async (req, res) => {
  let contentPublic = await prisma.contentPublic.findMany({
    include: {
      ContentPublicUser: true,
      User: true,
      Content: {
        include: {
          ContentStatus: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

//getContentPublicByTicket
app.get("/contentPublic/ticket/:id", async (req, res) => {
  let { id } = req.params;
  let contentPublic = await prisma.contentPublic.findUnique({
    where: {
      ticket: String(id),
    },
    include: {
      ContentPublicUser: true,
      User: true,
      Content: {
        include: {
          ContentStatus: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

export default {
  path: "/api",
  handler: app,
};
