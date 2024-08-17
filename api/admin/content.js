import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
//
const app = express();
const prisma = new PrismaClient();
//
app.use(express.json());

app.get("/content/publish", async (req, res) => {
  let data = await getContentPublish();
  res.status(200).json(data);
});

app.get("/content/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});

//
//
//
//filter
app.post("/content/filter/banner", async (req, res) => {
  let item = req.body.data;

  let data = await filterBaner(item);
  res.status(200).json(data);
});

app.post("/content/filter/activity", async (req, res) => {
  let item = req.body.data;
  let data = await filterActivity(item);
  res.status(200).json(data);
});

app.post("/content/filter/news", async (req, res) => {
  let item = req.body.data;
  let data = await filterNews(item);
  res.status(200).json(data);
});
//
//
//
//find
app.get("/content/find/banner", async (req, res) => {
  let data = await getBanner();
  res.status(200).json(data);
});

app.get("/content/find/activity", async (req, res) => {
  let data = await getActivity();
  res.status(200).json(data);
});

app.get("/content/find/news", async (req, res) => {
  let data = await getNews();
  res.status(200).json(data);
});
//
//
//
//create
app.post("/content/create/banner", async (req, res) => {
  let item = req.body.data;
  let content = await createBanner(item);
  res.status(200).json(content);
});

app.post("/content/create/activity", async (req, res) => {
  let item = req.body.data;
  let content = await createActivity(item);
  res.status(200).json(content);
});

app.post("/content/create/news", async (req, res) => {
  let item = req.body.data;
  let content = await createNews(item);
  res.status(200).json(content);
});

//update
app.put("/content/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;

  let data = await update(id, item);
  res.status(200).json(data);
});

app.get("/content/update/timed/:id", async (req, res) => {
  let { id } = req.params;
  let content = await updateTimed(id);
  res.status(200).json(content);
});

app.get("/content/update/publish/:id", async (req, res) => {
  let { id } = req.params;
  let content = await updatePublish(id);
  res.status(200).json(content);
});

app.get("/content/update/publish/end/:id", async (req, res) => {
  let { id } = req.params;
  let content = await updatePublishEnd(id);
  res.status(200).json(content);
});

app.get("/content/update/timeout", async (req, res) => {
  let data = await updateContentTimeOut();
  res.status(200).json(data);
});

//
//
//
//
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

async function getContentPublish() {
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
            },
          ],
        },
        {
          AND: [
            {
              timed: Boolean(false),
              publish: Boolean(true),
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
      PointReceived: true,
    },
  });
  return data;
}

async function findOne(id) {
  let data = await prisma.content.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ContentStatus: true,
      ContentType: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
      ContentCoverImg: true,
      ContentImg: true,
      PointReceived: {
        include: {
          User: {
            include: {
              Department: true,
              Position: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  let userIds = [];
  data.PointReceived.forEach((e) => {
    userIds.push(e.userId);
  });

  // console.log("userIds", userIds);

  let userReceived = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },

    include: {
      Role: true,
      Department: true,
      Position: true,
      PointReceived: {
        where: {
          contentId: Number(id),
        },
      },
    },
  });
  let userNotReceived = await prisma.user.findMany({
    where: {
      id: {
        notIn: userIds,
      },
      active: true,
    },
    include: {
      Role: true,
      Department: true,
      Position: true,
    },
  });

  data.UserNotReceived = userNotReceived;
  data.UserReceived = userReceived;

  return data;
}

async function filterBaner(item) {
  let filter = {
    contentTypeId: Number(1),
    timed: Boolean(item.timed),
  };

  if (item.timed) {
    if (item.start) {
      let start = moment(item.start).format("YYYY-MM-DD 00:00");
      filter.start = {
        gte: new Date(start),
      };
    }
    if (item.end) {
      let end = moment(item.end).add(1, "day").format("YYYY-MM-DD 00:00");
      filter.end = {
        lte: new Date(end),
      };
    }
  }

  if (item.contentStatusId.length > 0) {
    filter.contentStatusId = {
      in: item.contentStatusId,
    };
  }

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

async function filterActivity(item) {
  let filter = {
    contentTypeId: Number(2),
    timed: Boolean(item.timed),
  };

  if (item.timed) {
    if (item.start) {
      let start = moment(item.start).format("YYYY-MM-DD 00:00");
      filter.start = {
        gte: new Date(start),
      };
    }
    if (item.end) {
      let end = moment(item.end).add(1, "day").format("YYYY-MM-DD 00:00");
      filter.end = {
        lte: new Date(end),
      };
    }
  }

  if (item.contentStatusId.length > 0) {
    filter.contentStatusId = {
      in: item.contentStatusId,
    };
  }

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

async function filterNews(item) {
  let filter = {
    contentTypeId: Number(3),
    timed: Boolean(item.timed),
  };

  if (item.timed) {
    if (item.start) {
      let start = moment(item.start).format("YYYY-MM-DD 00:00");
      filter.start = {
        gte: new Date(start),
      };
    }
    if (item.end) {
      let end = moment(item.end).add(1, "day").format("YYYY-MM-DD 00:00");
      filter.end = {
        lte: new Date(end),
      };
    }
  }

  if (item.contentStatusId.length > 0) {
    filter.contentStatusId = {
      in: item.contentStatusId,
    };
  }

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

async function getActivity() {
  let data = await prisma.content.findMany({
    where: {
      contentTypeId: Number(2),
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

async function getNews() {
  let data = await prisma.content.findMany({
    where: {
      contentTypeId: Number(3),
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

async function createBanner(item) {
  let ticket = await generateTicket(1);
  let code = await generateOTP();
  let start = moment().format("YYYY-MM-DD 00:00");
  let end = moment().add(1, "day").format("YYYY-MM-DD 00:00");

  let data = await prisma.content.create({
    data: {
      start: new Date(start),
      end: new Date(end),
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

async function createActivity(item) {
  let ticket = await generateTicket(2);
  let code = await generateOTP();
  let start = moment().format("YYYY-MM-DD 00:00");
  let end = moment().add(1, "day").format("YYYY-MM-DD 00:00");

  let data = await prisma.content.create({
    data: {
      start: new Date(start),
      end: new Date(end),
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

async function createNews(item) {
  let ticket = await generateTicket(3);
  let code = await generateOTP();
  let start = moment().format("YYYY-MM-DD 00:00");
  let end = moment().add(1, "day").format("YYYY-MM-DD 00:00");

  let data = await prisma.content.create({
    data: {
      start: new Date(start),
      end: new Date(end),
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
//update
async function update(id, item) {
  let start = null;
  let end = null;

  if (item.timed) {
    start = new Date(item.start);
    end = new Date(item.end);
  }

  let data = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      start: start,
      end: end,
      title: String(item.title),
      description: String(item.description),
      detail: String(item.detail),
      point: Number(item.point),
    },
  });
  return data;
}

async function updateTimed(id) {
  let content = await findOne(id);

  let start = null;
  let end = null;
  let timed = true;

  if (content.timed) {
    timed = false;
  } else {
    timed = true;
    let dateStart = moment(new Date()).format("YYYY-MM-DD 08:00");
    let dateEnd = moment(new Date()).add(1, "day").format("YYYY-MM-DD 08:00");
    start = new Date(dateStart);
    end = new Date(dateEnd);
  }

  let data = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      start: start,
      end: end,
      timed: Boolean(timed),
    },
  });
  return data;
}

async function updatePublish(id) {
  let content = await findOne(id);
  let publish = false;
  let contentStatusId = 1;

  if (content.publish) {
    publish = false;
    contentStatusId = 1;
  } else {
    publish = true;
    contentStatusId = 2;
  }

  let data = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      publish: Boolean(publish),
      contentStatusId: Number(contentStatusId),
    },
  });
  return data;
}

async function updatePublishEnd(id) {
  let data = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      publish: Boolean(false),
      contentStatusId: Number(3),
    },
  });
  return data;
}

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
