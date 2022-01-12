---
sidebar_position: 2
---

# useReducer

**useReducer** es un Hook que nos permite gestionar múltiples estados de forma más eficiente, crear una lógica de estados compleja y gestionar estados que dependen de estados anteriores.

## Manejar múltiples estados

**useReducer** se puede utilizar para simplificar la forma en que múltiples estados impactan en una pieza de datos.

En este caso, la **adición**, la **eliminación** y el **borrado** de un array se pueden lograr mediante el uso de **useReducer** en lugar de tres estados separados.

```jsx {22,25-33}
import { useReducer } from "react";

const myReducer = (prevState, action) => {
  let array;
  switch (action.type) {
    case "ADD":
      array = [...prevState];
      array.push(action.payload);
      return array;
    case "REMOVE":
      array = [...prevState];
      array.pop();
      return array;
    case "CLEAR":
      return (prevState = []);
    default:
      break;
  }
};

const UseCaseMultipleStates = (props) => {
  const [state, dispatcher] = useReducer(myReducer, ["initial value"]);

  // Tres triggers de estado diferentes
  const addHandler = () => {
    dispatcher({ type: "ADD", payload: Math.round(Math.random() * 100 + 100) });
  };
  const removeHandler = () => {
    dispatcher({ type: "REMOVE" });
  };
  const clearHandler = () => {
    dispatcher({ type: "CLEAR" });
  };

  return (
    <>
      <hr />
      <h2>useReducer use case</h2>
      <h3>Manage multiple states: modify an array</h3>
      <button onClick={addHandler}>[+] Add random value to array</button>
      <button style={{ margin: "0 2rem" }} onClick={removeHandler}>
        [-] Remove last value from array
      </button>
      <button onClick={clearHandler}>[x] Clear array</button>
      <p>Shopping cart array:</p>
      <p>
        <b>
          {state.length === 0 && "(empty)"}
          {state.join(" - ")}
        </b>
      </p>
    </>
  );
};

export default UseCaseMultipleStates;
```

## Modificar estados complejos

**useReducer** puede ser especialmente útil cuando se trata de múltiples estados y una lógica de estado compleja.

Al manejar un formulario de inicio de sesión con este hook en lugar de múltiples hooks useState podemos apreciar lo poderoso que es este hook.

```jsx
export async function loginHelper({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
```

```jsx {50-56,59,61-71}
import { useReducer } from "react";
import { loginHelper } from "./loginHelper";

const myReducer = (prevState, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...prevState,
        username: action.payload,
      };
    case "PASSWORD":
      return {
        ...prevState,
        password: action.payload,
      };
    case "LOGGED_IN":
      return {
        ...prevState,
        isLoggedIn: true,
      };
    case "LOGGED_OUT":
      return {
        ...prevState,
        isLoggedIn: false,
        username: "",
        password: "",
      };
    case "IS_LOADING":
      return {
        ...prevState,
        isLoading: true,
      };
    case "IS_NOT_LOADING":
      return {
        ...prevState,
        isLoading: false,
      };
    case "ERROR":
      return {
        ...prevState,
        isError: true,
        isLoading: false,
      };

    default:
      break;
  }
};

const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const UseCaseComplexStates = (props) => {
  const [state, dispatcher] = useReducer(myReducer, initialState);

  const usernameHandler = (e) => {
    dispatcher({ type: "USERNAME", payload: e.target.value });
  };

  const passwordHandler = (e) => {
    dispatcher({ type: "PASSWORD", payload: e.target.value });
  };

  const logoutHandler = (e) => {
    dispatcher({ type: "LOGGED_OUT" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check credentials (simulated)
    try {
      dispatcher({ type: "IS_LOADING" });
      await loginHelper({ username: state.username, password: state.password });
      dispatcher({ type: "IS_NOT_LOADING" });
      dispatcher({ type: "LOGGED_IN" });
    } catch {
      dispatcher({ type: "ERROR" });
      alert("🚨 Incorrect username or password");
    }
  };

  return (
    <>
      <hr />
      <h2>useReducer use case</h2>
      <h3>Modify complex states, such as arrays or objects: login form</h3>
      <div
        style={{
          maxWidth: "50%",
          backgroundColor: "#a8dadc",
          borderRadius: "1rem",
          padding: "2rem",
        }}
      >
        {state.isLoggedIn ? (
          <>
            <p>Welcome!</p>
            <button onClick={logoutHandler}>Log out!</button>
          </>
        ) : (
          <form onSubmit={submitHandler}>
            <div style={{ margin: "1rem 0" }}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={usernameHandler}
                value={state.username}
                style={{ margin: "0 1rem" }}
                placeholder="user"
              />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={passwordHandler}
                value={state.password}
                style={{ margin: "0 1rem" }}
                placeholder="password"
              />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <button type="submit" disabled={state.isLoading}>
                {state.isLoading ? "Logging you in..." : "Log in"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default UseCaseComplexStates;
```
