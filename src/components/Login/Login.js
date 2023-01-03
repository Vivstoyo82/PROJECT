import React, { useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    // yeh isliye kyunki niche validateEmailHandler main humne action.type ko kuch aur set kar rakha hai
    return { value: state.value, isValid: state.value.includes("@") }; // here we will use last snapshot of state or
    // to access the last value that was entered for the email. and we will check validity by also state.value
  }
  return { value: "", isValid: false };
};

// Here we can use same as above values like USER_INPUT INPUT_BLUR this in below if we want

const passwordReducer = (state,action) => {
  if(action.type === "INPUT_PASSWORD")
  {
    return {value : action.val, passIsValid : action.val.trim().length > 6}
  }
  if(action.type === "PASSWORD_BLUR")
  {
    return { value: state.value, passIsValid : state.value.trim().length > 6}
  }
  return { value: "", passIsValid : false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null, //This second argument is the initial state we set here for our emailState snapshot
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    passIsValid: null,
  });
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity');
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP')
  //     clearTimeout(identifier);
  //     //whenever the cleanup function runs, I clear the timer that was set before this cleanup function ran,
  //     // so in the last side effect function execution, so that when the next side-effect execution is due,
  //     //we are able to set a new timer.So we clear the last timer before we set a new one.
  //   }
  // }, [enteredPassword, enteredEmail]);
  //since we are using enteredEmail and enteredPassword as dependencies whenever
  // enteredemail and enteredPassword executes that will make a trigger for executing setFormVald inside the useEffect

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.passIsValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type : "INPUT_PASSWORD", val: event.target.value});

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
      dispatchPassword({type : "PASSWORD_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
