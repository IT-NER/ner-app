import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// search
app.post("/booking/search", async (req, res) => {
  // console.log("req", req.body.data);
  // return;
  let item = req.body.data;

  let items = [
    {
      AND: [
        {
          start: {
            gte: new Date(item.start),
          },
          end: {
            lte: new Date(item.end),
          },
        },
      ],
    },
  ];

  if (item.roomId) {
    items.push({ roomId: item.roomId });
  }
  if (item.meetingTypeId) {
    items.push({ meetingTypeId: item.meetingTypeId });
  }
  if (item.statusId) {
    items.push({ statusId: item.statusId });
  }
  // console.log("items", items);

  let booking = await prisma.booking.findMany({
    where: {
      AND: items,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
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

app.get("/booking", async (req, res) => {
  let booking = await prisma.booking.findMany({
    where: {
      statusId: 2,
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
    orderBy: [
      {
        id: "desc",
      },
    ],
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
  let booking = await create(item);

  res.status(200).json(booking);
});
app.put("/booking/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;
  let booking = await update(id, item);

  res.status(200).json(booking);
});

async function create(item) {
  let booking = await prisma.booking.create({
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      name: item.name,
      description: item.description,
      chairman: item.chairman,
      quantity: Number(item.quantity),
      programId: item.programId,
      meetingId: item.meetingId,
      url: item.url,
      meetingPassword: item.meetingPassword,
      tel: item.tel,
      meetingTypeId: Number(item.meetingTypeId),
      roomId: Number(item.roomId),
      userId: Number(item.userId),
    },
  });

  if (item.bookingDevice.length > 0) {
    await createBookingDevice(booking.id, item.bookingDevice);
  }
  if (item.bookingFood.length > 0) {
    await createBookingFood(booking.id, item.bookingFood);
  }
  if (item.bookingDrink.length > 0) {
    await createBookingDrink(booking.id, item.bookingDrink);
  }
  return booking;
}
async function update(id, item) {
  let booking = await prisma.booking.update({
    where: {
      id: Number(id),
    },
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      name: item.name,
      description: item.description,
      chairman: item.chairman,
      quantity: Number(item.quantity),
      programId: item.programId,
      meetingId: item.meetingId,
      url: item.url,
      meetingPassword: item.meetingPassword,
      tel: item.tel,
      meetingTypeId: Number(item.meetingTypeId),
      roomId: Number(item.roomId),
      userId: Number(item.userId),
    },
  });

  await createBookingDevice(booking.id, item.bookingDevice);
  await createBookingFood(booking.id, item.bookingFood);
  await createBookingDrink(booking.id, item.bookingDrink);

  return booking;
}

async function createBookingDevice(bookingId, bookingDevice) {
  let items = [];
  bookingDevice.forEach((e) => {
    let item = {
      bookingId: bookingId,
      deviceId: e,
    };
    items.push(item);
  });

  await prisma.bookingDevice.deleteMany({
    where: {
      bookingId: Number(bookingId),
    },
  });

  await prisma.bookingDevice.createMany({
    data: items,
  });
}
async function createBookingFood(bookingId, bookingFood) {
  let items = [];
  bookingFood.forEach((e) => {
    let item = {
      bookingId: bookingId,
      foodId: e,
    };
    items.push(item);
  });
  await prisma.bookingFood.deleteMany({
    where: {
      bookingId: Number(bookingId),
    },
  });
  await prisma.bookingFood.createMany({
    data: items,
  });
}
async function createBookingDrink(bookingId, bookingDrink) {
  let items = [];
  bookingDrink.forEach((e) => {
    let item = {
      bookingId: bookingId,
      drinkId: e,
    };
    items.push(item);
  });
  await prisma.bookingDrink.deleteMany({
    where: {
      bookingId: Number(bookingId),
    },
  });
  await prisma.bookingDrink.createMany({
    data: items,
  });
}

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

app.post("/booking/date", async (req, res) => {
  let item = req.body.data;
  let booking = await getBookingByDate(item);

  res.status(200).json(booking);
});

async function getBookingByDate(date) {
  let dateStart = null;
  let dateEnd = null;
  dateStart = moment(date).format("YYYY-MM-DDT00:00:00");
  if (!date) {
    dateStart = moment().format("YYYY-MM-DDT00:00:00");
  }
  dateEnd = moment(dateStart).add(1, "day").format("YYYY-MM-DDT00:00:00");

  // console.log("dateStart", dateStart);
  // console.log("dateEnd", dateEnd);
  // return;

  let data = await prisma.booking.findMany({
    where: {
      statusId: 2,
      AND: [
        {
          start: {
            gte: new Date(dateStart),
          },
          end: {
            lte: new Date(dateEnd),
          },
        },
      ],
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
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
  return data;
}

export default {
  path: "/api",
  handler: app,
};
