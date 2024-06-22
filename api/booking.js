import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

app.get("/booking", async (req, res) => {
  let booking = await prisma.booking.findMany({
    // where: {
    // OR: [{ StatusId: 1 }, { StatusId: 2 }]
    // StatusId: 2
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
        }
      }
    },
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["DeviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["FoodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["DrinkId"]);
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
        }
      }
    },
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["DeviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["FoodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["DrinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking);
});

app.get("/booking/:id", async (req, res) => {
  let id = req.params.id
  let booking = await prisma.booking.findMany({
    where: {
      id: parseInt(id)
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
        }
      }
    },
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["DeviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["FoodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["DrinkId"]);
      });
    }

    e.BookingDevice = BookingDevice;
    e.BookingFood = BookingFood;
    e.BookingDrink = BookingDrink;
  });

  res.status(200).json(booking[0]);
});

app.get("/booking/user/:id", async (req, res) => {
  let id = req.params.id
  let booking = await prisma.booking.findMany({
    where: {
      UserId: parseInt(id)
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
        }
      }
    },
  });

  booking.forEach((e) => {
    let BookingDevice = [];
    let BookingFood = [];
    let BookingDrink = [];

    if (e.BookingDevice) {
      e.BookingDevice.forEach((item) => {
        BookingDevice.push(item["DeviceId"]);
      });
    }

    if (e.BookingFood) {
      e.BookingFood.forEach((item) => {
        BookingFood.push(item["FoodId"]);
      });
    }

    if (e.BookingDrink) {
      e.BookingDrink.forEach((item) => {
        BookingDrink.push(item["DrinkId"]);
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
        DeviceId: e,
      };
      BookingDevice.push(item);
    });
  }

  if (item.BookingFood) {
    await item.BookingFood.forEach((e) => {
      let item = {
        FoodId: e,
      };
      BookingFood.push(item);
    });
  }

  if (item.BookingDrink) {
    await item.BookingDrink.forEach((e) => {
      let item = {
        DrinkId: e,
      };
      BookingDrink.push(item);
    });
  }

  if (item.MeetingTypeId == 1) {
    item.ProgramId = null
  }



  let booking = await prisma.booking
    .create({
      data: {
        start: new Date(item.start),
        end: new Date(item.end),
        name: item.name,
        authorContact: item.authorContact,
        color: item.color,
        timed: item.timed,
        url: item.url,
        description: item.description,
        chairman: item.chairman,
        quantity: parseInt(item.quantity),
        meetingId: item.meetingId,
        meetingPassword: item.meetingPassword,
        UserId: parseInt(item.UserId),
        MeetingTypeId: parseInt(item.MeetingTypeId),
        RoomId: parseInt(item.RoomId),
        ProgramId: parseInt(item.ProgramId),
        StatusId: parseInt(item.StatusId),

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
      Devices.push({ DeviceId: e });
    });

    await prisma.bookingDevice.deleteMany({
      where: {
        BookingId: parseInt(id),
      },
    });
  }
  if (item.BookingFood) {
    await item.BookingFood.forEach((e) => {
      Foods.push({ FoodId: e });
    });

    await prisma.bookingFood.deleteMany({
      where: {
        BookingId: parseInt(id),
      },
    });
  }
  if (item.BookingDrink) {
    await item.BookingDrink.forEach((e) => {
      Drinks.push({ DrinkId: e });
    });

    await prisma.bookingDrink.deleteMany({
      where: {
        BookingId: parseInt(id),
      },
    });
  }

  let booking = await prisma.booking
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        start: new Date(item.start),
        end: new Date(item.end),
        name: item.name,
        authorContact: item.authorContact,
        color: item.color,
        timed: item.timed,
        url: item.url,
        description: item.description,
        chairman: item.chairman,
        quantity: parseInt(item.quantity),
        meetingId: item.meetingId,
        meetingPassword: item.meetingPassword,
        UserId: parseInt(item.UserId),
        MeetingTypeId: parseInt(item.MeetingTypeId),
        RoomId: parseInt(item.RoomId),
        ProgramId: parseInt(item.ProgramId),
        StatusId: parseInt(item.StatusId),
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
        id: parseInt(id),
      },
      data: {
        StatusId: parseInt(3),
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
        id: parseInt(id),
      },
      data: {
        StatusId: parseInt(2),
        ApproveBy: parseInt(ApproveBy),
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
        id: parseInt(id),
      },
    })
    .then((res) => {
      // // console.log("res", res);
      return res;
    })
    .catch((err) => {
      // // console.log("err", err);
      res.status(401).json({ error: err });
      return
    });

  res.status(200).json(booking);
});



export default {
  path: "/api",
  handler: app,
};
