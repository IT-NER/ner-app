import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
let app = express();

app.use(express.json());

// getTicket
async function generateTicket(contentTypeId) {
  let str = "";
  if (contentTypeId == 1) {
    str = "BN";
  }
  if (contentTypeId == 2) {
    str = "AC";
  }
  if (contentTypeId == 3) {
    str = "NE";
  }

  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.content.findMany({
    where: {
      contentTypeId: contentTypeId,
    },
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

// GET
// findOne
app.get("/content/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.content.findFirst({
    where: {
      AND: [{ id: Number(id) }, { active: true }],
    },
    include: {
      ContentStatus: true,
      ContentType: true,
      User: true,
      ContentCoverImg: true,
      ContentImg: true,
      PointReceived: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return data;
}
// getBannerPublish
app.get("/content/banner/publish", async (req, res) => {
  let data = await getBannerPublish();
  res.status(200).json(data);
});
async function getBannerPublish() {
  let data = await prisma.content.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              start: {
                lte: new Date(),
              },
              end: {
                gte: new Date(),
              },
              timed: Boolean(true),
              publish: Boolean(true),
              contentTypeId: Number(1),
              contentCoverImgId: {
                not: null,
              },
            },
          ],
        },
        {
          AND: [
            {
              timed: Boolean(false),
              publish: Boolean(true),
              contentTypeId: Number(1),
              contentCoverImgId: {
                not: null,
              },
            },
          ],
        },
      ],
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
    },
  });

  return data;
}

// filterBaner
app.post("/content/filter/banner", async (req, res) => {
  let item = req.body.data;

  let data = await filterBaner(item);
  res.status(200).json(data);
});
async function filterBaner(item) {
  let filter = {
    contentTypeId: Number(1),
    timed: Boolean(item.timed),
  };

  if (item.timed) {
    if (item.start) {
      filter.start = {
        gte: new Date(item.start),
      };
    }
    if (item.end) {
      filter.end = {
        lte: new Date(item.end),
      };
    }
  }

  if (item.contentStatusId.length > 0) {
    filter.contentStatusId = {
      in: item.contentStatusId,
    };
  }
  console.log("filter", filter);

  let data = await prisma.content.findMany({
    where: {
      AND: [filter],
    },
    include: {
      ContentStatus: true,
      ContentType: true,
      User: true,
      ContentCoverImg: true,
      ContentImg: true,
      PointReceived: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return data;
}

// getBanner
app.get("/content/find/banner", async (req, res) => {
  let data = await getBanner();
  res.status(200).json(data);
});
async function getBanner() {
  let data = await prisma.content.findMany({
    where: {
      contentTypeId: Number(1),
    },
    include: {
      ContentStatus: true,
      ContentType: true,
      User: true,
      ContentCoverImg: true,
      ContentImg: true,
      PointReceived: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return data;
}

// CREATE
// createBanner
app.post("/content/create/banner", async (req, res) => {
  let item = req.body.data;
  let content = await createBanner(item);
  res.status(200).json(content);
});
async function createBanner(item) {
  let ticket = await generateTicket(1);
  let code = await generateOTP();

  let data = await prisma.content.create({
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(true),
      publish: Boolean(false),
      ticket: String(ticket),
      code: String(code),
      title: null,
      description: null,
      detail: null,
      point: Number(0),
      contentStatusId: Number(1),
      contentTypeId: Number(1),
      userId: Number(item.userId),
      active: Boolean(true),
    },
  });

  return data;
}
// createActivity
app.post("/content/create/activity", async (req, res) => {
  let item = req.body.data;
  let content = await createActivity(item);
  res.status(200).json(content);
});
async function createActivity(item) {
  let ticket = await generateTicket(2);
  let code = await generateOTP();

  let data = await prisma.content.create({
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(true),
      publish: Boolean(false),
      ticket: String(ticket),
      code: String(code),
      title: null,
      description: null,
      detail: null,
      point: Number(0),
      contentStatusId: Number(1),
      contentTypeId: Number(2),
      userId: Number(item.userId),
      active: Boolean(true),
    },
  });
  return data;
}
// createNews
app.post("/content/create/news", async (req, res) => {
  let item = req.body.data;
  let content = await createNews(item);
  res.status(200).json(content);
});
async function createNews(item) {
  let ticket = await generateTicket(3);
  let code = await generateOTP();

  let data = await prisma.content.create({
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(true),
      publish: Boolean(false),
      ticket: String(ticket),
      code: String(code),
      title: null,
      description: null,
      detail: null,
      point: Number(0),
      contentStatusId: Number(1),
      contentTypeId: Number(3),
      userId: Number(item.userId),
      active: Boolean(true),
    },
  });
  return data;
}

// UPDATE
// update
app.post("/content/update", async (req, res) => {
  let item = req.body.data;
  let content = await update(item);
  res.status(200).json(content);
});
async function update(item) {
  if (!item.timed) {
    item.start = null;
    item.end = null;
  }
  if (item.publish) {
    item.contentStatusId = 2;
  } else {
    item.contentStatusId = 1;
  }

  let data = await prisma.content.update({
    where: {
      id: Number(item.id),
    },
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(item.timed),
      publish: Boolean(item.publish),
      title: item.title,
      description: item.description,
      detail: item.detail,
      point: Number(item.point),
      contentStatusId: Number(item.contentStatusId),
      userId: Number(item.userId),
    },
  });
  return data;
}
// updateTimed
app.post("/content/update/timed", async (req, res) => {
  let item = req.body.data;
  let content = await updateTimed(item);
  res.status(200).json(content);
});
async function updateTimed(item) {
  item.start = null;
  item.end = null;

  if (item.timed) {
    let start = moment().format("YYYY-MM-DD 00:00");
    let end = moment().add(1, "day").format("YYYY-MM-DD 00:00");
    item.start = new Date(start);
    item.end = new Date(end);
  }

  let data = await prisma.content.update({
    where: {
      id: Number(item.id),
    },
    data: {
      start: item.start,
      end: item.end,
      timed: Boolean(item.timed),
    },
  });
  return data;
}
// updatePublish
app.post("/content/update/publish", async (req, res) => {
  let item = req.body.data;
  let content = await updatePublish(item);
  res.status(200).json(content);
});
async function updatePublish(item) {
  item.contentStatusId = 1;
  if (item.publish) {
    item.contentStatusId = 2;
  }
  let data = await prisma.content.update({
    where: {
      id: Number(item.id),
    },
    data: {
      publish: Boolean(item.publish),
      contentStatusId: Number(item.contentStatusId),
    },
  });
  return data;
}
// updatePublishEnd
app.post("/content/update/publish/end", async (req, res) => {
  let item = req.body.data;
  let content = await updatePublishEnd(item);
  res.status(200).json(content);
});
async function updatePublishEnd(item) {
  let data = await prisma.content.update({
    where: {
      id: Number(item.id),
    },
    data: {
      publish: Boolean(false),
      contentStatusId: Number(3),
    },
  });
  return data;
}

// updateContentTimeOut
app.get("/content/update/timeout", async (req, res) => {
  let data = await updateContentTimeOut();
  res.status(200).json(data);
});
// updateContentTimeOut
async function updateContentTimeOut(id) {
  let data = await prisma.content.updateMany({
    where: {
      AND: [
        {
          active: Boolean(true),
          end: {
            lte: new Date(),
          },
          timed: Boolean(true),
        },
      ],
    },
    data: {
      contentStatusId: Number(3),
      publish: Boolean(false),
    },
  });

  return data;
}

export default {
  path: "/api/admin",
  handler: app,
};
