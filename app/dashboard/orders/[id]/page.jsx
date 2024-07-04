import { updateOrder } from "@/app/lib/actions";
import { fetchOrder } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/services/singleService/singleService.module.css";
import Image from "next/image";

const SingleServicePage = async ({ params }) => {
  const { id } = params;
  const order = await fetchOrder(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noproduct.jpg" alt="" fill />
        </div>
        {order.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateOrder} className={styles.form}>
          <input type="hidden" name="id" value={order.id} />
          <label>Customer Email</label>
          <input type="email" name="customerEmail" placeholder={order.customerEmail} readOnly/>
          <label>Price</label>
          <input type="number" name="price" placeholder={order.price} />
          <label>Category</label>
          <input type="text" name="category" placeholder={order.category} />
          <label>Order Status</label>
          <select name="status" id="status">
            <option value="Active">Order Status</option>
            <option value="Active">Active</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label>Payment Status</label>
          <select name="payment" id="payment">
            <option value="Unpaid">Payment Status</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid(COD)">Paid (COD)</option>
            <option value="Paid(Online)">Paid (Online)</option>
          </select>
          <label>Phone</label>
          <input type="phone" placeholder={order.phone} name="phone" required />
          <label>Description</label>
          <textarea
            required
            name="orderDesc"
            id="orderDesc"
            rows="16"
            placeholder={order.desc}
          ></textarea>
          <label>Address</label>
          <textarea
            required
            name="address"
            id="address"
            rows="16"
            placeholder={order.address}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
