import React from "react";
import { useState } from "react";

export default function Form() {
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let error = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(error);
  };

  return (
    <div>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            className={errors.username && 'danger'}
            value={input["username"]}
          />
          {errors.username && <p className="danger">{errors.username}</p>}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className={errors.password && 'danger'}
            value={input["password"]}
          />
          {errors.password && <p className="danger">{errors.password}</p>}
          <input type="submit" value="Submit" />'
        </div>
        ...
      </form>
    </div>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = "Username is required";
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = "Username is invalid";
  }
  if (!input.password) {
    errors.password = "Password is required";
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = "Password is invalid";
  }
  return errors;
}
