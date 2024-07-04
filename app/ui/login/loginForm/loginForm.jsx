"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <>
      <form action={formAction} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <p>Login as:</p>
        <div className={styles.loginRole}>
          <div className={styles.loginRoleBlock}>
            <input className="form-check-input" type="radio" name="userRole" id="roleAdmin" value="Admin" />
            <label className="form-check-label" htmlFor="roleAdmin">
              Admin
            </label>
          </div>
          <div className={styles.loginRoleBlock}>
            <input className="form-check-input" type="radio" name="userRole" id="roleRider" value="Rider" />
            <label className="form-check-label" htmlFor="roleRider">
              Rider
            </label>
          </div>
          <div className={styles.loginRoleBlock}>
            <input className="form-check-input" type="radio" name="userRole" id="roleShop" value="Shop" />
            <label className="form-check-label" htmlFor="roleShop">
              Shop
            </label>
          </div>
        </div>
        <button>Login</button>
        {state && state}
      </form>
    </>
  );
};

export default LoginForm;
