import { updateUser } from "@/app/lib/actions";
import { fetchShop } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  
  const { id } = params;
  const user = await fetchShop(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>Store Name</label>
          <input type="text" name="store_name" placeholder={user.store_name} />

          <label>Owner Name</label>
          <input type="text" name="owner_name" placeholder={user.owner_name} />

          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />

          <label>Password</label>
          <input type="password" name="password" />

          <label>Store Phone</label>
          <input type="text" name="store_contact" placeholder={user.store_contact} />

          <label>Owner Phone</label>
          <input type="text" name="owner_contact" placeholder={user.owner_contact} />

          <label>Status</label>
          <select name="status" id="status">
            <option value={true} selected={user.status}>Active</option>
            <option value={false} selected={!user.status}>Inactive</option>
          </select>

          <label>Store Address</label>
          <input type="text" name="store_address" placeholder={user.store_address} />

          <label>Area</label>
          <input type="text" name="area" placeholder={user.area} />

          <label>City</label>
          <input type="text" name="city" placeholder={user.city} />

          <label>Additional Contact Info</label>
          <input type="text" name="contact_1" placeholder={user.contact_1} />

          <label>Additional Contact Info</label>
          <input type="text" name="contact_2" placeholder={user.contact_2} />

          <label>Store Category</label>
          <input type="text" name="store_category" placeholder={user.store_category} />
          
          <label>Express Laundry?</label>
          <select name="express_laundry" id="express_laundry">
            <option value={true} selected={user.express_laundry}>Yes</option>
            <option value={false} selected={!user.express_laundry}>No</option>
          </select>

          <label>Premium Laundry?</label>
          <select name="premium_laundry" id="premium_laundry">
            <option value={true} selected={user.premium_laundry}>Yes</option>
            <option value={false} selected={!user.premium_laundry}>No</option>
          </select>

          <label>Do you provide wash and fold?</label>
          <select name="wash_and_fold" id="wash_and_fold">
            <option value={true} selected={user.wash_and_fold}>Yes</option>
            <option value={false} selected={!user.wash_and_fold}>No</option>
          </select>

          <label>Do you provide wash and iron?</label>
          <select name="wash_and_iron" id="wash_and_iron">
            <option value={true} selected={user.wash_and_iron}>Yes</option>
            <option value={false} selected={!user.wash_and_iron}>No</option>
          </select>

          <label>Do you provide ironing?</label>
          <select name="ironing" id="ironing">
            <option value={true} selected={user.ironing}>Yes</option>
            <option value={false} selected={!user.ironing}>No</option>
          </select>

          <label>Do you provide dry cleaning?</label>
          <select name="dry_cleaning" id="dry_cleaning">
            <option value={true} selected={user.dry_cleaning}>Yes</option>
            <option value={false} selected={!user.dry_cleaning}>No</option>
          </select>

          <label>Do you provide shoe cleaning?</label>
          <select name="shoe_cleaning" id="shoe_cleaning">
            <option value={true} selected={user.shoe_cleaning}>Yes</option>
            <option value={false} selected={!user.shoe_cleaning}>No</option>
          </select>

          <label>Do you provide home textile?</label>
          <select name="home_textile" id="home_textile">
            <option value={true} selected={user.home_textile}>Yes</option>
            <option value={false} selected={!user.home_textile}>No</option>
          </select>

          <label>Your store open time</label>
          <input type="text" name="store_open_time" placeholder={user.store_open_time} />

          <label>Your store close time</label>
          <input type="text" name="store_close_time" placeholder={user.store_close_time} />

          <label>Your store off days</label>
          <input type="text" name="days_off" placeholder={user.days_off} />

          <label>Pin code of the area</label>
          <input type="text" name="pin_code" placeholder={user.pin_code} />

          <label>Landmark of the store location</label>
          <input type="text" name="landmark" placeholder={user.landmark} />

          <label>Your outlets info and location</label>
          <input type="text" name="outlets" placeholder={user.outlets} />

          <label>Minimum wight of wash and fold</label>
          <input type="text" name="Wash_N_fold_min_weight" placeholder={user.Wash_N_fold_min_weight} />

          <label>Minimum wight of wash and iron</label>
          <input type="text" name="Wash_N_iron_min_weight" placeholder={user.Wash_N_iron_min_weight} />

          <label>Minimum price of wash and fold</label>
          <input type="text" name="Wash_N_fold_min_price" placeholder={user.Wash_N_fold_min_price} />

          <label>Minimum price of wash and iron</label>
          <input type="text" name="Wash_N_iron_min_price" placeholder={user.Wash_N_iron_min_price} />

          <label>Wash and fold additional price for per kg</label>
          <input type="text" name="Wash_N_fold_additional_price_kg" placeholder={user.Wash_N_fold_additional_price_kg} />

          <label>Wash and iron additional price for per kg</label>
          <input type="text" name="Wash_N_iron_additional_price_kg" placeholder={user.Wash_N_iron_additional_price_kg} />

          <label>Express laundry price</label>
          <input type="text" name="express_laundry_price" placeholder={user.express_laundry_price} />

          <label>Premium laundry price</label>
          <input type="text" name="premium_laundry_price" placeholder={user.premium_laundry_price} />

          <label>Role</label>
          <input type="shop" name="shop" placeholder="shop" value="shop" readOnly />
          
          <button>Update</button>
        </form>
        {/* <button id={styles.editButton}>Edit</button> */}
      </div>
    </div>
  );
};

export default SingleUserPage;
