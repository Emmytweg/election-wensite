import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" id="username" />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
