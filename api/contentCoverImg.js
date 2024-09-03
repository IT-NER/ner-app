import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/contentCoverImg", async (req, res) => {
  // // console.log("body", req.body);
  // return;

  let item = req.body.data.content;
  let file = req.body.data.contentCoverImg;

  let contentCoverImg = await createContentCoverImg(file);
  // console.log("contentCoverImg", contentCoverImg);
  let content = await updateContent(contentCoverImg, item);
  // console.log("content", content);

  res.status(200).json(content);
});

async function createContentCoverImg(file) {
  let data = await prisma.contentCoverImg.create({
    data: {
      name: String(file.filename),
    },
  });
  return data;
}

async function updateContent(contentCoverImg, content) {
  let data = await prisma.content.update({
    where: {
      id: Number(content.id),
    },
    data: {
      contentCoverImgId: Number(contentCoverImg.id),
    },
  });
  return data;
}

//delete
app.delete("/contentCoverImg/:id", async (req, res) => {
  let id = req.params.id;
  let contentCoverImg = await prisma.contentCoverImg.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentCoverImg);
});

// getContentByIds
app.post("/contentCoverImg/ids", async (req, res) => {
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
app.post("/contentCoverImg/setImgIndex", async (req, res) => {
  let item = req.body.data;

  let contentCoverImgClear = await prisma.contentCoverImg.updateMany({
    where: {
      contentId: Number(item.contentId),
    },
    data: {
      index: false,
    },
  });

  let contentCoverImgSetImgIndex = await prisma.contentCoverImg.update({
    where: {
      id: Number(item.id),
    },
    data: {
      index: true,
    },
  });

  let contentCoverImg = await prisma.contentCoverImg.findMany({
    where: {
      contentId: Number(item.contentId),
    },
  });

  res.status(200).json(contentCoverImg);
});

export default {
  path: "/api",
  handler: app,
};
