import { addOrder } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/services/addService/addService.module.css";
import { auth } from "@/app/auth";

const AddOrderPage = async () => {
  const { user } = await auth();
  let shopId = user._id
  return (
    <div className={styles.container}>
      <form action={addOrder} className={styles.form}>
        <input type="hidden" name="shopId" value={shopId} />
        <input type="email" placeholder="Customer Email" name="customerEmail" required />
        <input type="number" placeholder="price" name="price" required />
        <input type="text" placeholder="category" name="category" required />
        <select name="status" id="status">
          <option value="Active">Order Status</option>
          <option value="Active">Active</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select name="payment" id="payment">
          <option value="Unpaid">Payment Status</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid(COD)">Paid (COD)</option>
          <option value="Paid(Online)">Paid (Online)</option>
        </select>
        <input type="phone" placeholder="phone" name="phone" required />
        <textarea
          required
          name="orderDesc"
          id="orderDesc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <textarea
          required
          name="address"
          id="address"
          rows="16"
          placeholder="Address"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrderPage;
