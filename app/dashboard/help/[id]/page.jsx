import { updateService } from "@/app/lib/actions";
import { fetchService } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/services/singleService/singleService.module.css";
import Image from "next/image";

const SingleServicePage = async ({ params }) => {
  const { id } = params;
  const service = await fetchService(id);

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
          <label>Price</label>
          <input type="number" name="price" placeholder={service.price} />
          <label>Category</label>
          <input type="text" name="category" placeholder={service.category} />
          {/* <label>Cat</label> */}
          {/* <select name="category" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select> */}
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            placeholder={service.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
