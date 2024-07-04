import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/services/services.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchOrders } from "@/app/lib/data";
import { acceptedOrder } from "@/app/lib/actions";
import { auth } from "@/app/auth";

const OrdersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, orders } = await fetchOrders(q, page);
  const { user } = await auth();
  let riderId = user._id

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a service..." />
        <Link href="/dashboard/orders/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {user && user.userRole === "Shop" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Customer</td>
              <td>Order Id</td>
              <td>Price</td>
              <td>Created At</td>
              <td>Category</td>
              <td>Status</td>
              <td>Payment</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className={styles.product}>
                    <Image
                      src={order.img || "/noproduct.jpg"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    <strong>Order by: </strong>
                    {order.customerEmail}
                  </div>
                </td>
                <td>{order.orderId}</td>
                <td>${order.price}</td>
                <td>{order.createdAt?.toString().slice(4, 16)}</td>
                <td>{order.category}</td>
                <td>{order.status}</td>
                <td>{order.payment}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {user && user.userRole === "Admin" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Customer</td>
              <td>Order Id</td>
              <td>Price</td>
              <td>Created At</td>
              <td>Category</td>
              <td>Status</td>
              <td>Payment</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className={styles.product}>
                    <Image
                      src={order.img || "/noproduct.jpg"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    <strong>Order by: </strong>
                    {order.customerEmail}
                  </div>
                </td>
                <td>{order.orderId}</td>
                <td>${order.price}</td>
                <td>{order.createdAt?.toString().slice(4, 16)}</td>
                <td>{order.category}</td>
                <td>{order.status}</td>
                <td>{order.payment}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {user && user.userRole === "Rider" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Customer</td>
              <td>Order Id</td>
              <td>Price</td>
              <td>Created At</td>
              <td>Category</td>
              <td>Status</td>
              <td>Payment</td>
              <td>Action</td>
              <td>Accept</td>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className={styles.product}>
                    <Image
                      src={order.img || "/noproduct.jpg"}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.productImage}
                    />
                    <strong>Order by: </strong>
                    {order.customerEmail}
                  </div>
                </td>
                <td>{order.orderId}</td>
                <td>${order.price}</td>
                <td>{order.createdAt?.toString().slice(4, 16)}</td>
                <td>{order.category}</td>
                <td>{order.status}</td>
                <td>{order.payment}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  </div>
                  <form action={acceptedOrder}>
                    <input type="hidden" name="id" value={order.id} />
                    <input type="hidden" name="shopId" value={riderId} />
                    <button className={`${styles.button} ${styles.view}`}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination count={count} />
    </div>
  );
};

export default OrdersPage;
