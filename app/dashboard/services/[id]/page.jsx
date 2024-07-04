import { updateService } from "@/app/lib/actions";
import { fetchService } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/services/singleService/singleService.module.css";
import Image from "next/image";
import { auth } from "@/app/auth";

const SingleServicePage = async ({ params }) => {
  const { id } = params;
  const service = await fetchService(id);
  const { user } = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noproduct.jpg" alt="" fill />
        </div>
        {service.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateService} className={styles.form}>
          <input type="hidden" name="id" value={service.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={service.title} />

          <label>Category</label>
          <input type="text" name="category" placeholder={service.category} />

          <label>Price of per shirt</label>
          <input type="number" name="shirt" placeholder={service.shirt} />

          <label>Price of per pant</label>
          <input type="number" name="pant" placeholder={service.pant} />

          <label>Price of per kurti</label>
          <input type="number" name="kurti" placeholder={service.kurti} />

          <label>Price of per pajama</label>
          <input type="number" name="pajama" placeholder={service.pajama} />

          <label>Price of per t-shirt</label>
          <input type="number" name="t_shirt" placeholder={service.t_shirt} />

          <label>Price of per cotton t-shirt</label>
          <input type="number" name="cotton_t_shirt" placeholder={service.cotton_t_shirt} />

          <label>Price of per kilo washing</label>
          <input type="number" name="washing_per_kilo_price" placeholder={service.washing_per_kilo_price} />

          <label>Minimum kilo criteria</label>
          <input type="number" name="min_kilo_crit" placeholder={service.min_kilo_crit} />

          <label>Additional kilo price</label>
          <input type="number" name="additional_kilo_price" placeholder={service.additional_kilo_price} />
          
          {user && user.userRole === "Shop" && (
            <button>Update</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
