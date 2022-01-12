---
sidebar_position: 1
---

# useState

**useState** es un Hook que necesita ser llamado dentro de un **functional component** para añadir algún estado local a él. React preservará este estado en los renders del componente.

Hay muchos casos de uso para el hook useState, aquí veremos los siguientes:

## State management

Empecemos con una **advertencia**: no escribas el código de esta manera, porque creará un bucle infinito:

```jsx {4,6}
import { useState } from "react";

const UseCaseStateManagement = (props) => {
  const [state, setState] = useState("initial value");

  setState("new value");

  return (
    <>
      <h2>useState use case</h2>
      <h3>State management</h3>
      <hr />
      <p>{state}</p>
    </>
  );
};

export default UseCaseStateManagement;
```

El bucle se crea porque el renderizado inicial llama a la función de actualización de estado `setState`, que a su vez **desencadena un re-render y una nueva evaluación de la función**.

Si queremos cambiar un estado debido a una acción realizada por el usuario, **podemos hacerlo de la siguiente manera**:

```jsx {4,8-10}
import { useState } from "react";

const UseCaseStateManagement = (props) => {
  const [state, setState] = useState("initial value");

  console.log("🔄 This is a re-render");

  const clickHandler = () => {
    setState("new value");
  };

  return (
    <>
      <h2>useState use case</h2>
      <h3>State management</h3>
      <hr />
      <button onClick={clickHandler}>Set state</button>
      <p>{state}</p>
    </>
  );
};

export default UseCaseStateManagement;
```

Ese estado se conservará a lo largo de los re-renders de los componentes y podremos hacer uso de él en el re-render más reciente.

## Renderizado condicional

Podemos utilizar un estado para **renderizar condicionalmente** un componente o parte de él.

```jsx {4,16}
import { useState } from "react";

const UseCaseConditionalRender = (props) => {
  const [condition, setCondition] = useState(false);

  const clickHandler = () => {
    setCondition(true);
  };

  return (
    <>
      <hr />
      <h2>useState use case</h2>
      <h3>Conditional Rendering</h3>
      <button onClick={clickHandler}>Set condition</button>
      {condition && <p>Hello!</p>}
    </>
  );
};

export default UseCaseConditionalRender;
```

## Toggle flags (true/false)

**useState** se puede utilizar para alternar entre **dos valores**, normalmente **true y false**, con el fin de alternar una bandera, como el modo de visualización:

```jsx {5,12}
import { useState } from "react";
import classes from "./UseCaseToggle.module.css";

const UseCaseToggle = (props) => {
  const [mode, setMode] = useState(false);

  // Utiliza la forma de la función setState porque el nuevo estado depende del anterior
  const clickHandler = () => {
    setMode((prevState) => !prevState);
  };

  const toggledClass = mode ? classes.light : classes.dark;

  return (
    <div className={toggledClass}>
      <hr />
      <h2>useState use case</h2>
      <h3>Toggle flags</h3>
      <button onClick={clickHandler}>Toggle display mode</button>
    </div>
  );
};

export default UseCaseToggle;
```

El resultado será una **alternancia** entre el modo oscuro y el modo claro en el componente.

## Contador

**useState** se puede utilizar para realizar un **seguimiento de una variable** a través de **múltiples re-renders**, como en una aplicación de **contador**:

```jsx {4,7-10,12-14}
import { useState } from "react";

const UseCaseCounter = (props) => {
  const [counter, setCounter] = useState(0);

  // Utiliza la forma de la función setState porque el nuevo estado depende del anterior
  const clickHandlerDecrease = () => {
    // Convertir el prevState a número para evitar errores
    setCounter((prevState) => +prevState - 1);
  };

  const clickHandlerIncrease = () => {
    setCounter((prevState) => +prevState + 1);
  };

  return (
    <>
      <hr />
      <h2>useState use case</h2>
      <h3>Counter</h3>
      <button onClick={clickHandlerDecrease}>--</button>
      <span> {counter} </span>
      <button onClick={clickHandlerIncrease}>++</button>
    </>
  );
};

export default UseCaseCounter;
```

## Pedir datos a una API y almacenarlos

Un uso más complejo de este hook se presenta cuando necesitamos **interactuar con una API**.

En este caso, podemos utilizar un estado para almacenar la respuesta de un `fetch()` a la API, y el **estado de un spinner** que indicará si los datos están siendo recuperados.

```jsx {7-15}
import { useState } from "react";

const UseCaseApi = (props) => {
  const [starship, setStarship] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async () => {
    setIsLoading(true);

    const response = await fetch("https://swapi.dev/api/starships/10");
    const data = await response.json();
    setStarship(JSON.stringify(data, null, "\t"));

    setIsLoading(false);
  };

  let message = "";
  if (isLoading) {
    message = <p>Getting data... 🚀</p>;
  }

  return (
    <>
      <hr />
      <h2>useState use case</h2>
      <h3>Get API data and store it in state</h3>
      <button onClick={clickHandler}>Get Millennium Falcon data</button>
      <p>{message}</p>
      <pre>{starship}</pre>
    </>
  );
};

export default UseCaseApi;
```
