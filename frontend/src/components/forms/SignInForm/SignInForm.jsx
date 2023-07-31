import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  
  const data = useActionData();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div>
        <Form method="POST" className={styles.form}>
            <label className={styles.label}>Sign in</label>
            <div>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username..."
                    required
                    className={styles.input}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password..."
                    required
                    className={styles.input}
                />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.button}>{isSubmitting ? 'Submitting...' : 'Sign In'}</button>
            <Link id="signupLink" to={"/signup"} style={{ marginTop: "2rem"}} className={styles.link}>
                <p>Dont have an account? Sign up.</p>
            </Link>
            { data && data.errors && <label style={{ color: 'red' }}>{ data.errors }</label>}
        </Form>
    </div>
  );
}

export default SignInForm;
