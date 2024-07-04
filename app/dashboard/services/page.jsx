import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/services/services.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchServices } from "@/app/lib/data";
import { deleteService } from "@/app/lib/actions";
import { auth } from "@/app/auth";

const ServicesPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, services } = await fetchServices(q, page);
  const { user } = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a service..." />
        {/* <Link href="/dashboard/services/add">
          <button className={styles.addButton}>Add New</button>
        </Link> */}
        {/* {user  && user.userRole === "Shop" ? (
          <Link href="/dashboard/services/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        ) : (
          <Link href="/dashboard/services/add-page">
            <button className={styles.addButton}>Add Page</button>
          </Link>
        )} */}
        {user && user.userRole === "Shop" && (
          <Link href="/dashboard/services/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Price per Kilo</td>
            <td>Minimum kilo criteria</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={service.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {service.title}
                </div>
              </td>
              <td>{service.category}</td>
              <td>${service.washing_per_kilo_price}</td>
              <td>{service.min_kilo_crit} Kilo</td>
              <td>{service.createdAt?.toString().slice(4, 16)}</td>
              <td>
                {/* <div className={styles.buttons}>
                  <Link href={`/dashboard/services/${service.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div> */}
                {user && user.userRole === "Shop" ? (
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/services/${service.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={service.id} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/services/${service.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ServicesPage;
