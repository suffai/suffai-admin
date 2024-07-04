import { addService } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/services/addService/addService.module.css";

const AddServicePage = () => {
  return (
    <div className={styles.container}>
      <form action={addService} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        {/* <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select> */}
        <input type="number" placeholder="price" name="price" required />
        <input type="text" placeholder="category" name="category" required />
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddServicePage;
