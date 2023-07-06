import React from "react";
import { Form, Link } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {

  return (
    <div className={styles.formWrapper}>  
        <h1>Sign up</h1>
        <Form method="POST" className={styles.form}>
            <div>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username..."
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password..."
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm password..."
                    required
                />
            </div>
            <button type="submit" className={styles.button}>Sign up</button>
        </Form>
        <Link id="signinLink" to={"/login"}>
            <p>Already have an account? Log in.</p>
        </Link>
    </div>
  );
}

export default SignUpForm;
