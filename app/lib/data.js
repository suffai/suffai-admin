import { Order, Rider, Service, Shop, User } from "./models";
import { connectToDB } from "./utils";
import { auth } from "@/app/auth";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// export const fetchServices = async (q, page) => {
//   console.log(q);
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 5;

//   try {
//     connectToDB();
//     const count = await Service.find({ title: { $regex: regex } }).count();
//     const services = await Service.find({ title: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { count, services };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch services!");
//   }
// };

export const fetchServices = async (q, page) => {
  const { user } = await auth();
  let shopId = user._id
  let userRole = user.userRole
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    let query = { title: { $regex: regex } };

    // Modify query based on user role
    if (userRole === "Shop") {
      // If user is a shop, only show services added by that shop
      query.addedBy = shopId;
    }

    const count = await Service.find(query).count();
    const services = await Service.find(query)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, services };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch services!");
  }
};

export const fetchService = async (id) => {
  try {
    connectToDB();
    const product = await Service.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch service!");
  }
};

export const fetchRiders = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Rider.find({ username: { $regex: regex } }).count();
    const users = await Rider.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch riders!");
  }
};

export const fetchRider = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await Rider.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch rider!");
  }
};

export const fetchShops = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Shop.find({ store_name: { $regex: regex } }).count();
    const users = await Shop.find({ store_name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch shops!");
  }
};

export const fetchShop = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await Shop.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch shops!");
  }
};

export const fetchOrders = async (q, page) => {
  const { user } = await auth();
  let shopId = user._id
  let riderId = user._id
  let userRole = user.userRole
  console.log(q);
  // Validate page parameter
  if (typeof page !== 'number' || page < 1) {
    throw new Error('Invalid page parameter');
  }

  // Define regex for search query (match entire orderId)
  const regex = new RegExp(`^${q}$`, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    let query = { orderId: { $regex: regex } };

    if (userRole === "Shop") {
      query.servicedBy = shopId;
    }

    if (userRole === "Rider") {
      query.acceptedBy = riderId;
    }

    const count = await Order.find(query).count();
    const orders = await Order.find(query)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    console.log(orders)
    return { count, orders };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch orders!");
  }
};

export const fetchOrder = async (id) => {
  try {
    connectToDB();
    const product = await Order.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch order!");
  }
};

export const cards = [
  {
    id: 1,
    title: "Total Users",
    async getNumber() {
      try {
        connectToDB();
        const count = await Shop.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await User.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await User.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 2,
    title: "Total Shops",
    async getNumber() {
      try {
        connectToDB();
        const count = await Shop.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Rider.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Rider.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 3,
    title: "Total Riders",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    // change: 18,
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 4,
    title: "Total Customers",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
];


export const cardsShop = [
  {
    id: 1,
    title: "Total Services",
    async getNumber() {
      const { user } = await auth();
      let shopId = user._id
      try {
        connectToDB();
        const count = await Service.countDocuments({ servicedBy: shopId });
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await User.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await User.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 2,
    title: "Total Shops",
    async getNumber() {
      try {
        connectToDB();
        const count = await Shop.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Rider.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Rider.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 3,
    title: "Total Riders",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    // change: 18,
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 4,
    title: "Total Customers",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
];


export const cardsRider = [
  {
    id: 1,
    title: "Total Users",
    async getNumber() {
      try {
        connectToDB();
        const count = await Shop.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await User.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await User.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 2,
    title: "Total Shops",
    async getNumber() {
      try {
        connectToDB();
        const count = await Shop.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Rider.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Rider.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 3,
    title: "Total Riders",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    // change: 18,
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
  {
    id: 4,
    title: "Total Customers",
    async getNumber() {
      try {
        connectToDB();
        const count = await Rider.countDocuments();
        return count;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
    async getChange() {
      try {
        connectToDB();

        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setHours(0, 0, 0, 0 - currentDate.getDay() * 24 * 60 * 60 * 1000);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekStart);

        const currentCount = await Shop.countDocuments({
          createdAt: { $gte: currentWeekStart, $lt: currentWeekEnd }
        });

        const previousCount = await Shop.countDocuments({
          createdAt: { $gte: previousWeekStart, $lt: previousWeekEnd }
        });

        const change = currentCount - previousCount;

        return change;
      } catch (err) {
        console.log(err);
        return 0;
      }
    },
  },
];