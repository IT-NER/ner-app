import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// search
app.post("/booking/search", async (req, res) => {
  // console.log('req', req.body.data);
  // return
  let item = req.body.data;
  let roomId = req.body.data.roomId;
  let meetingTypeId = req.body.data.meetingTypeId;
  let statusId = req.body.data.statusId;

  let items = [
    {
      start: {
        gte: new Date(item.start),
      },
      end: {
        lte: new Date(item.end),
      },
    },
  ];

  if (roomId) {
    items.push({ roomId: roomId });
  }
  if (meetingTypeId) {
    items.push({ meetingTypeId: meetingTypeId });
  }
  if (statusId) {
    items.push({ statusId: statusId });
  }

  let booking = await prisma.booking.findMany({
    where: {
      AND: items,
    },
    include: {
      Room: true,
      MeetingType: true,
      Program: true,
      Status: true,
      BookingDevice: true,
      BookingFood: true,
      BookingDrink: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["deviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["foodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["drinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking);
});

app.get("/booking", async (req, res) => {
  let booking = await prisma.booking.findMany({
    // where: {
    // OR: [{ statusId: 1 }, { statusId: 2 }]
    // statusId: 2
    // },
    include: {
      Room: true,
      MeetingType: true,
      Program: true,
      Status: true,
      BookingDevice: true,
      BookingFood: true,
      BookingDrink: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["deviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["foodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["drinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking);
});

app.get("/booking/all", async (req, res) => {
  let booking = await prisma.booking.findMany({
    include: {
      Room: true,
      MeetingType: true,
      Program: true,
      Status: true,
      BookingDevice: true,
      BookingFood: true,
      BookingDrink: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["deviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["foodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["drinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking);
});

app.get("/booking/:id", async (req, res) => {
  let id = req.params.id;
  let booking = await prisma.booking.findMany({
    where: {
      id: Number(id),
    },
    include: {
      Room: true,
      MeetingType: true,
      Program: true,
      Status: true,
      BookingDevice: true,
      BookingFood: true,
      BookingDrink: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["deviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["foodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["drinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking[0]);
});

app.get("/booking/user/:id", async (req, res) => {
  let id = req.params.id;
  let booking = await prisma.booking.findMany({
    where: {
      userId: Number(id),
    },
    include: {
      Room: true,
      MeetingType: true,
      Program: true,
      Status: true,
      BookingDevice: true,
      BookingFood: true,
      BookingDrink: true,
      User: {
        include: {
          Department: true,
          Position: true,
        },
      },
    },
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["deviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["foodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["drinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking);
});

app.post("/booking", async (req, res) => {
  let item = req.body.data;
  let BookingDevice = [];
  let BookingFood = [];
  let BookingDrink = [];

  if (item.BookingDevice) {
    await item.BookingDevice.forEach((e) => {
      let item = {
        deviceId: e,
      };
      BookingDevice.push(item);
    });
  }

  if (item.BookingFood) {
    await item.BookingFood.forEach((e) => {
      let item = {
        foodId: e,
      };
      BookingFood.push(item);
    });
  }

  if (item.BookingDrink) {
    await item.BookingDrink.forEach((e) => {
      let item = {
        drinkId: e,
      };
      BookingDrink.push(item);
    });
  }

  if (item.meetingTypeId == 1) {
    item.programId = null;
  }

  let booking = await prisma.booking
    .create({
      data: {
        start: new Date(item.start),
        end: new Date(item.end),
        name: item.name,
        UserPhoneNumber: item.UserPhoneNumber,
        color: item.color,
        timed: item.timed,
        url: item.url,
        description: item.description,
        chairman: item.chairman,
        quantity: Number(item.quantity),
        meetingId: item.meetingId,
        meetingPassword: item.meetingPassword,
        userId: Number(item.userId),
        meetingTypeId: Number(item.meetingTypeId),
        roomId: Number(item.roomId),
        programId: Number(item.programId),
        statusId: Number(item.statusId),

        createdAt: new Date(),
        updatedAt: new Date(),

        BookingDevice: {
          create: BookingDevice,
        },
        BookingFood: {
          create: BookingFood,
        },
        BookingDrink: {
          create: BookingDrink,
        },
      },

      include: {
        BookingDevice: true,
        BookingFood: true,
        BookingDrink: true,
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      res.status(401).json({ error: err });
      return;
    });

  res.status(200).json(booking);
});

app.put("/booking/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let Devices = [];
  let Foods = [];
  let Drinks = [];

  if (item.BookingDevice) {
    await item.BookingDevice.forEach((e) => {
      Devices.push({ deviceId: e });
    });

    await prisma.bookingDevice.deleteMany({
      where: {
        bookingId: Number(id),
      },
    });
  }
  if (item.BookingFood) {
    await item.BookingFood.forEach((e) => {
      Foods.push({ foodId: e });
    });

    await prisma.bookingFood.deleteMany({
      where: {
        bookingId: Number(id),
      },
    });
  }
  if (item.BookingDrink) {
    await item.BookingDrink.forEach((e) => {
      Drinks.push({ drinkId: e });
    });

    await prisma.bookingDrink.deleteMany({
      where: {
        bookingId: Number(id),
      },
    });
  }

  let booking = await prisma.booking
    .update({
      where: {
        id: Number(id),
      },
      data: {
        start: new Date(item.start),
        end: new Date(item.end),
        name: item.name,
        UserPhoneNumber: item.UserPhoneNumber,
        color: item.color,
        timed: item.timed,
        url: item.url,
        description: item.description,
        chairman: item.chairman,
        quantity: Number(item.quantity),
        meetingId: item.meetingId,
        meetingPassword: item.meetingPassword,
        userId: Number(item.userId),
        meetingTypeId: Number(item.meetingTypeId),
        roomId: Number(item.roomId),
        programId: Number(item.programId),
        statusId: Number(item.statusId),
        createdAt: new Date(),
        updatedAt: new Date(),

        BookingDevice: {
          create: Devices,
        },
        BookingFood: {
          create: Foods,
        },
        BookingDrink: {
          create: Drinks,
        },
      },

      include: {
        BookingDevice: true,
        BookingFood: true,
        BookingDrink: true,
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      // // console.log("err", err);
      res.status(401).json({ error: err });
      return;
    });

  res.status(200).json(booking);
});

app.put("/booking/cancel/:id", async (req, res) => {
  let id = req.params.id;

  let booking = await prisma.booking
    .update({
      where: {
        id: Number(id),
      },
      data: {
        statusId: Number(3),
        updatedAt: new Date(),
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      // // console.log("err", err);
      res.status(401).json({ error: err });
      return;
    });

  res.status(200).json(booking);
});

app.put("/booking/approve/:id", async (req, res) => {
  let id = req.params.id;
  // // console.log("req.body", req.body);
  // return
  let ApproveBy = req.body.data.ApproveBy;

  let booking = await prisma.booking
    .update({
      where: {
        id: Number(id),
      },
      data: {
        statusId: Number(2),
        ApproveBy: Number(ApproveBy),
        updatedAt: new Date(),
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      // // console.log("err", err);
      res.status(401).json({ error: err });
      return;
    });

  res.status(200).json(booking);
});

app.delete("/booking/:id", async (req, res) => {
  let id = req.params.id;

  let booking = await prisma.booking
    .delete({
      where: {
        id: Number(id),
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      // // console.log("err", err);
      res.status(401).json({ error: err });
      return;
    });

  res.status(200).json(booking);
});

export default {
  path: "/api",
  handler: app,
};
