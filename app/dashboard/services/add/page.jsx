import { addService } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/services/addService/addService.module.css";
import { auth } from "@/app/auth";

const AddServicePage = async () => {
  const { user } = await auth();
  let shopId = user._id

  return (
    <div className={styles.container}>
      <form action={addService} className={styles.form}>
        <input type="hidden" name="shopId" value={shopId} />
        <input type="text" placeholder="title" name="title" required />
        <select name="category" id="category" required>
          <option value="wash_and_fold">Category</option>
          <option value="wash_and_fold">Wash and Fold</option>
          <option value="wash_and_iron">Wash and Iron</option>
          <option value="ironing">Ironing</option>
          <option value="dry_cleaning">Dry Cleaning</option>
          <option value="shoe_cleaning">Shoe Cleaning</option>
          <option value="home_textile">Home Textile</option>
        </select>
        <input type="number" placeholder="Price of per shirt" name="shirt" />
        <input type="number" placeholder="Price of per pant" name="pant" />
        <input type="number" placeholder="Price of per kurti" name="kurti" />
        <input type="number" placeholder="Price of per pajama" name="pajama" />
        <input type="number" placeholder="Price of per t-shirt" name="t_shirt" />
        <input type="number" placeholder="Price of per cotton t-shirt" name="cotton_t_shirt" />
        <input type="number" placeholder="Price of per kilo washing" name="washing_per_kilo_price" />
        <input type="number" placeholder="Minimum kilo criteria" name="min_kilo_crit" />
        <input type="number" placeholder="Additional kilo price" name="additional_kilo_price" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddServicePage;
