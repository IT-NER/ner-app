import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/contentImg", async (req, res) => {
  let content = req.body.content;
  let itemsContentIng = req.body.contentImg;

  let items = [];
  itemsContentIng.forEach((e) => {
    let url = e.destination + e.filename;
    let item = {
      contentId: content.id,
      url: url,
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
      id: parseInt(id),
    },
  });
  res.status(200).json(contentImg);
});

//update
// app.put("/contentImg/:id", async (req, res) => {
//   let id = req.params.id;
//   let item = req.body.data;
//   let contentImg = await prisma.contentImg.update({
//     where: {
//       id: parseInt(id),
//     },
//     data: {
//       name: item.name,
//       color: item.color,
//       quantity: parseInt(item.quantity),
//     },
//   });
//   res.status(200).json(contentImg);
// });

export default {
  path: "/api",
  handler: app,
};
