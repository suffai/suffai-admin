import { addShop } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addShop} className={styles.form}>
        <input type="text" placeholder="Store Name" name="store_name" required />
        <input type="text" placeholder="Owner Name" name="owner_name" required />
        <input type="email" placeholder="email" name="email" required />
        <input type="password" placeholder="password" name="password" required />
        <input type="phone" placeholder="Store Phone No." name="store_contact" />
        <input type="phone" placeholder="Owner Phone No." name="owner_contact" />
        <select name="status" id="status">
          <option value={true}>
            Status?
          </option>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
        <input type="text" name="store_address" id="store_address" placeholder="Store Address" />
        <input type="text" name="area" id="area" placeholder="Area" />
        <input type="text" name="city" id="city" placeholder="City" />
        <input type="text" name="contact_1" id="contact_1" placeholder="Additional Contact info" />
        <input type="text" name="contact_2" id="contact_2" placeholder="Additional Contact info" />
        <input type="text" placeholder="Store Category" name="store_category" />
        <select name="express_laundry" id="express_laundry">
          <option value={true}>
            Express Laundry?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="premium_laundry" id="premium_laundry">
          <option value={true}>
            Premium Laundry?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="wash_and_fold" id="wash_and_fold">
          <option value={true}>
            Do you provide wash and fold?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="wash_and_iron" id="wash_and_iron">
          <option value={true}>
            Do you provide wash and iron?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="ironing" id="ironing">
          <option value={true}>
            Do you provide ironing?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="dry_cleaning" id="dry_cleaning">
          <option value={true}>
            Do you provide dry cleaning?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="shoe_cleaning" id="shoe_cleaning">
          <option value={true}>
            Do you provide shoe cleaning?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="home_textile" id="home_textile">
          <option value={true}>
            Do you provide home textile?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <input type="text" placeholder="Your store open time" name="store_open_time" />
        <input type="text" placeholder="Your store close time" name="store_close_time" />
        <input type="text" placeholder="Your store off days" name="days_off" />
        <input type="text" placeholder="Pin code of the area" name="pin_code" />
        <input type="text" placeholder="Landmark of the store location" name="landmark" />
        <input type="text" placeholder="Your outlets info and location" name="outlets" />
        <input type="text" placeholder="Minimum wight of wash and fold" name="Wash_N_fold_min_weight" />
        <input type="text" placeholder="Minimum wight of wash and iron" name="Wash_N_iron_min_weight" />
        <input type="text" placeholder="Minimum price of wash and fold" name="Wash_N_fold_min_price" />
        <input type="text" placeholder="Minimum price of wash and iron" name="Wash_N_iron_min_price" />
        <input type="text" placeholder="Wash and fold additional price for per kg" name="Wash_N_fold_additional_price_kg" />
        <input type="text" placeholder="Wash and iron additional price for per kg" name="Wash_N_iron_additional_price_kg" />
        <input type="text" placeholder="Express laundry price" name="express_laundry_price" />
        <input type="text" placeholder="Premium laundry price" name="premium_laundry_price" />
        <input type="text" placeholder="shop" name="shop" value="shop" readOnly />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
