import express from "express";
import moment from "moment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());


//search
app.post('/user/search', async (req, res) => {
  let item = req.body.data
  let items = []

  items.push({ active: true })

  if (item.departmentId) {
    items.push({ departmentId: item.departmentId })
  }
  if (item.positionId) {
    items.push({ positionId: item.positionId })
  }

  let user = await prisma.user.findMany({
    where: {
      AND: items,
    },
    include: {
      Department: true,
      Position: true,
      Role: true,
      Booking: true,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(user);
});


// getAll
app.get('/user', async (req, res) => {
  let user = await prisma.user.findMany({
    include: {
      Department: true,
      Position: true,
      Role: true,
      Booking: true,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(user);
});

//getById
app.get('/user/:id', async (req, res) => {
  let { id } = req.params
  let user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(user)
})

//create
app.post('/user', async (req, res) => {

  let item = req.body.data
  let hashedPassword = await bcrypt.hash(item.password, 10);
  let user = await prisma.user.create({
    data: {
      email: item.email,
      username: item.username,
      password: hashedPassword,
      lname: item.lname,
      fname: item.fname,
      departmentId: item.departmentId,
      positionId: item.positionId,
      roleId: item.roleId,
      createdAt: new Date(moment().format()),
      updatedAt: new Date(moment().format()),
    },
  }).then((res) => {
    return res
  }).catch((err) => {
    // console.log('err', err);
    return res.status(401).json({ error: "Invalid credentials" });
  });

  res.status(200).json(user);
})

//update
app.put('/user/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let user = await prisma.user.update({
    where: {
      id: parseInt(id)
    },
    data: {
      email: item.email,
      username: item.username,
      lname: item.lname,
      fname: item.fname,
      status: item.status,
      departmentId: item.departmentId,
      positionId: item.positionId,
      roleId: item.roleId,
      updatedAt: new Date(moment().format()),
    },
  })
  res.status(200).json(user)
})

//update password
app.put('/user/update-password/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let hashedPassword = await bcrypt.hash(item.newPassword, 10);


  let check = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    },
  })
  console.log('check', check);

  let user = null
  if (check.password == item.password) {
    user = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        password: hashedPassword,
      },
    })

    if (user) {
      res.status(200).json(user)
    }
  }

})


//delete
app.delete('/user/:id', async (req, res) => {
  let id = req.params.id
  let user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(user)
})

export default {
  path: "/api",
  handler: app,
};
