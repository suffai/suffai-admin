"use server";

import { revalidatePath } from "next/cache";
import { Order, Rider, Service, Shop, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { auth } from "@/app/auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
      userRole: "Admin",
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addService = async (formData) => {
  const { title, category, shirt, pant, kurti, pajama, t_shirt, cotton_t_shirt, washing_per_kilo_price, min_kilo_crit, additional_kilo_price, shopId } =
    Object.fromEntries(formData);

  let auto_service_id = generateServiceId();


  function generateServiceId() {
    let auto_service_id = '';
    if (category === "wash_and_fold") {
      auto_service_id = "wash_and_fold_101"
    } else if (category === "wash_and_iron") {
      auto_service_id = "wash_and_iron_101"
    } else if (category === "ironing") {
      auto_service_id = "ironing_101"
    } else if (category === "dry_cleaning") {
      auto_service_id = "dry_cleaning_101"
    } else if (category === "shoe_cleaning") {
      auto_service_id = "shoe_cleaning_101"
    } else if (category === "home_textile") {
      auto_service_id = "home_textile_101"
    }
    return auto_service_id;
  }

  try {
    connectToDB();

    const newService = new Service({
      title,
      category,
      shirt,
      pant,
      kurti,
      pajama,
      t_shirt,
      cotton_t_shirt,
      washing_per_kilo_price,
      min_kilo_crit,
      additional_kilo_price,
      service_id: auto_service_id,
      addedBy: shopId,
      store_id: shopId,
    });

    await newService.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create service!");
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
};

export const updateService = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Service.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update service!");
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const deleteService = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Service.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete service!");
  }

  revalidatePath("/dashboard/services");
};

export const addRider = async (formData) => {
  const { username, email, password, phone, address, role, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRider = new Rider({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      isActive,
      userRole: "Rider",
    });

    await newRider.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/riders");
  redirect("/dashboard/riders");
};

export const updateRider = async (formData) => {
  const { id, username, email, password, phone, address, role, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      role,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Rider.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/riders");
  redirect("/dashboard/riders");
};

export const addShop = async (formData) => {
  const { store_name, owner_name, email, password, store_contact, owner_contact, express_laundry, premium_laundry, store_category, wash_by_kilo, wash_and_fold, wash_and_iron, ironing, dry_cleaning, shoe_cleaning, home_textile, status, store_address, area, city, contact_1, contact_2, store_open_time, store_close_time, days_off, pin_code, landmark, outlets, Wash_N_fold_min_weight, Wash_N_iron_min_weight, Wash_N_fold_min_price, Wash_N_iron_min_price, Wash_N_fold_additional_price_kg, Wash_N_iron_additional_price_kg, express_laundry_price, premium_laundry_price, role } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newShop = new Shop({
      store_name,
      owner_name,
      email,
      password: hashedPassword,
      store_contact,
      owner_contact,
      express_laundry,
      premium_laundry,
      store_category,
      wash_by_kilo,
      wash_and_fold,
      wash_and_iron,
      ironing,
      dry_cleaning,
      shoe_cleaning,
      home_textile,
      status,
      store_address,
      area,
      city,
      contact_1,
      contact_2,
      store_open_time,
      store_close_time,
      days_off,
      pin_code,
      landmark,
      outlets,
      Wash_N_fold_min_weight,
      Wash_N_iron_min_weight,
      Wash_N_fold_min_price,
      Wash_N_iron_min_price,
      Wash_N_fold_additional_price_kg,
      Wash_N_iron_additional_price_kg,
      express_laundry_price,
      premium_laundry_price,
      role,
      userRole: "Shop",
    });

    await newShop.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/shops");
  redirect("/dashboard/shops");
};

export const updateShop = async (formData) => {
  const { id, username, email, password, phone, address, role, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      role,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Shop.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/shops");
  redirect("/dashboard/shops");
};


export const addOrder = async (formData) => {
  const { customerEmail, orderDesc, price, category, status, payment, phone, address, shopId, } =
    Object.fromEntries(formData);

  let orderId = generateOrderId();


  function generateOrderId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const orderIdLength = 10;
    let orderId = '';
    for (let i = 0; i < orderIdLength; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
  }

  try {
    connectToDB();

    const newOrder = new Order({
      customerEmail,
      orderDesc,
      orderId,
      price,
      category,
      status,
      payment,
      phone,
      address,
      servicedBy: shopId,
    });

    await newOrder.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create order!");
  }

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
};

export const updateOrder = async (formData) => {
  const { id, customerEmail, orderDesc, orderId, price, category, status, payment, phone, address, } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      customerEmail,
      orderDesc,
      orderId,
      price,
      category,
      status,
      payment,
      phone,
      address,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update order!");
  }

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
};

export const acceptedOrder = async (formData) => {
  const { id, riderId } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      acceptedBy: riderId,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update order!");
  }

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
};

export const authenticate = async (prevState, formData) => {
  const { username, password, userRole } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password, userRole });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};