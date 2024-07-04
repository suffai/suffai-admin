import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    commodity: {
      type: String,
    },
    menu: {
      type: String,
    },
    price: {
      type: String,
    },
    weight: {
      type: String,
    },
    service_id: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
  },
  { timestamps: true }
);

const riderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact_1: {
      type: String,
    },
    contact_2: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    age: {
      type: String,
    },
    address: {
      type: String,
    },
    area: {
      type: String,
    },
    city: {
      type: String,
    },
    pin_code: {
      type: String,
    },
    aadhaar_card: {
      type: String,
    },
    pan_card: {
      type: String,
    },
    driving_license_number: {
      type: String,
    },
    dl_expiry_date: {
      type: String,
    },
    vehicle_number: {
      type: String,
    },
    vehicle_details: {
      type: String,
    },
    vehicle_owner: {
      type: String,
    },
    vehicle_insurance: {
      type: String,
    },
    yoe_in_driving: {
      type: String,
    },
    yoe_in_delivery: {
      type: String,
    },
    rating: {
      type: String,
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      default: true,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const shopSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    owner_name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    store_contact: {
      type: String,
    },
    owner_contact: {
      type: String,
    },
    role: {
      type: String,
      default: true,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    store_address: {
      type: String,
    },
    area: {
      type: String,
    },
    city: {
      type: String,
    },
    contact_1: {
      type: String,
    },
    contact_2: {
      type: String,
    },
    express_laundry: {
      type: Boolean,
      default: true,
    },
    premium_laundry: {
      type: Boolean,
      default: true,
    },
    store_category: {
      type: String,
    },
    wash_and_fold: {
      type: Boolean,
      default: true,
    },
    wash_and_iron: {
      type: Boolean,
      default: true,
    },
    ironing: {
      type: Boolean,
      default: true,
    },
    dry_cleaning: {
      type: Boolean,
      default: true,
    },
    shoe_cleaning: {
      type: Boolean,
      default: true,
    },
    home_textile: {
      type: Boolean,
      default: true,
    },
    store_open_time: {
      type: String,
    }, 
    store_close_time: {
      type: String,
    },
    days_off: {
      type: String,
    },
    pin_code: {
      type: String,
    },
    rating: {
      type: String,
    },
    review: {
      type: String,
    },
    landmark: {
      type: String,
    },
    outlets: {
      type: String,
    },
    Wash_N_fold_min_weight: {
      type: String,
    },
    Wash_N_iron_min_weight: {
      type: String,
    },
    Wash_N_fold_min_price: {
      type: String,
    },
    Wash_N_iron_min_price: {
      type: String,
    },
    Wash_N_fold_additional_price_kg: {
      type: String,
    },
    Wash_N_iron_additional_price_kg: {
      type: String,
    },
    express_laundry_price: {
      type: String,
    },
    premium_laundry_price: {
      type: String,
    },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      min: 3,
      max: 50,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    contact_no: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: Date,
    },
    address1: {
      type: String,
    },
    area: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pin_code: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    address2: {
      type: String,
    },
    address3: {
      type: String,
    },
    save_card_details: {
      type: String,
    },
    upi_details: {
      type: String,
    },
    save_store_id: {
      type: String,
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    customerEmail: {
      type: String,
      required: true,
    },
    orderDesc: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
      min: 10,
      max: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      // required: true,
    },
    riderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      // required: true,
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      // required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      // required: true,
    },
    transactionID: {
      type: String,
    },
    mode_of_payment: {
      type: String,
    },
    total_amount: {
      type: String,
    },
    order_status: {
      type: String,
    },
    last_updated_date_time: {
      type: String,
    },
    pickup_date_time: {
      type: String,
    },
    delivery_date: {
      type: String,
    },
    service_ids: {
      type: String,
    },
    total_number_of_cloths_overall: {
      type: String,
    },
    payment_status: {
      type: String,
    },
    review_for_order: {
      type: String,
    },
    rating_for_order: {
      type: String,
    },
    refund_flag: {
      type: Boolean,
    },
    refund_status: {
      type: String,
    },
    express_laundry: {
      type: Boolean,
    },
    rider_payment: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
export const Rider = mongoose.models.Rider || mongoose.model("Rider", riderSchema);
export const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
export const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);