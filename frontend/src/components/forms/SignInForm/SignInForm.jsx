import React from "react";
import { Form, Link } from "react-router-dom";
import styles from "./SignInForm.module.css";

const SignInForm = () => {

  return (
    <div className={styles.formWrapper}>  
        <h1>Sign in</h1>
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
            <button type="submit" className={styles.button}>Sign in</button>
        </Form>
        <Link id="signupLink" to={"/signup"}>
            <p>Dont have an account? Sign up.</p>
        </Link>
    </div>
  );
}

export default SignInForm;
