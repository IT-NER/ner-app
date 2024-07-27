import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/contentImg", async (req, res) => {
  // console.log("body", req.body);
  // return;

  let content = req.body.data.content;
  let itemsContentIng = req.body.data.contentImg;

  let items = [];
  itemsContentIng.forEach((e) => {
    let item = {
      contentId: Number(content.id),
      path: String(e.destination),
      name: String(e.filename),
    };
    items.push(item);
  });

  let contentImg = await prisma.contentImg.createMany({
    data: items,
  });
  res.status(200).json(contentImg);
});

//delete
app.delete("/contentImg/:id", async (req, res) => {
  let id = req.params.id;
  let contentImg = await prisma.contentImg.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentImg);
});

// getContentByIds
app.post("/contentImg/ids", async (req, res) => {
  let ids = req.body.data;

  let content = await prisma.ContentImg.findMany({
    where: {
      id: { in: ids },
    },

    // include: {
    //   Content: {
    //     include: {
    //       User: true,
    //       ContentType: true,
    //       ContentImg: true,
    //       ContentStatus: true,
    //     },
    //   },
    // },
  });
  res.status(200).json(content);
});

// setImgIndex
app.post("/contentImg/setImgIndex", async (req, res) => {
  let item = req.body.data;

  let contentImgClear = await prisma.contentImg.updateMany({
    where: {
      contentId: Number(item.contentId),
    },
    data: {
      index: false,
    },
  });

  let contentImgSetImgIndex = await prisma.contentImg.update({
    where: {
      id: Number(item.id),
    },
    data: {
      index: true,
    },
  });

  let contentImg = await prisma.contentImg.findMany({
    where: {
      contentId: Number(item.contentId),
    },
  });

  res.status(200).json(contentImg);
});

export default {
  path: "/api",
  handler: app,
};
