import React from "react";
import { Form, Link, useActionData } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  
  const data = useActionData();

  return (
    <div> 
        <Form method="POST" className={styles.form}>
            <label className={styles.label}>Sign up</label>
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
            <Link id="signinLink" to={"/login"}>
                <p>Already have an account? Log in.</p>
            </Link>
            { data && data.errors && <label style={{ color: 'red' }}>{ data.errors }</label>}
        </Form>
        
    </div>
  );
}

export default SignUpForm;
