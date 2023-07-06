import React from "react";
import { Form, Link } from "react-router-dom";

const LoginForm = () => {

  return (
    <>  
        <h3>Sign in</h3>
        <Form method="POST">
            <div>
                <input
                    type="text"
                    name="username"
                    id="username"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                />
            </div>
            <button type="submit">Sign in</button>
        </Form>
        <Link id="signupLink" to={"/signup"}>
            <p>Don't have an account? Sign up.</p>
        </Link>
    </>
  );
}

export default LoginForm;
