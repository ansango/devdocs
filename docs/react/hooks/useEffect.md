---
sidebar_position: 3
---

# useEffect

Siempre que necesitemos hacer uso de **efectos secundarios** en nuestra aplicación, **useEffect** es el camino a seguir.

Los efectos se ejecutan **después de cada renderización completa**, pero se puede elegir dispararlos sólo cuando ciertos valores han cambiado.

Para ello este hook utiliza una **array de dependencias**: **(variables o estados que useEffect escucha para los cambios)**. Cuando sus valores cambian, el cuerpo principal del hook se ejecuta.

El `return` de este hook se utiliza para limpiar los métodos que ya se están ejecutando, como los temporizadores. La **primera vez que se llama a este hook**, se evalúa el **cuerpo principal** del mismo.

**El resto de veces** que se llame al hook, se evaluará **primero** el `return` y **después** el cuerpo principal. Este comportamiento es especialmente útil para limpiar el código que ya se está ejecutando antes de volver a ejecutarlo, lo que nos permite evitar fugas de memoria.

## Ejecutar una vez en el montaje

### Obtener datos de una API

El siguiente ejemplo en el que **obtenemos datos de una API** solo se ejecutará una vez, debido al array vacio `[]` de dependencias.

```jsx {7-15}
import { useState, useEffect } from "react";

const UseCaseFetchApi = (props) => {
  // useState es necesario para mostrar el resultado en la pantalla
  const [bio, setBio] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://swapi.dev/api/people/1/");
      const data = await response.json();
      console.log(data);
      setBio(data);
    };
    fetchData();
  }, []);

  // Un array de dependencias vacío hará que useEffect se ejecute sólo una vez al inicio porque ese array nunca cambia

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>Running once on mount: fetch API data</h3>
      <p>Luke Skywalker's bio:</p>
      <pre>{JSON.stringify(bio, null, "\t")}</pre>
    </>
  );
};

export default UseCaseFetchApi;
```

La obtención de datos de la API en useEffect siempre es **complicada** y siempre debes recordar **cancelar tu suscripción**.

```jsx {7,15}
import { useState, useEffect } from "react";

const UseCaseFetchApi = (props) => {
  const [bio, setBio] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const response = await fetch("https://swapi.dev/api/people/1/");
      const data = await response.json();
      console.log(data);
      setBio(data);
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>Running once on mount: fetch API data</h3>
      <p>Luke Skywalker's bio:</p>
      <pre>{JSON.stringify(bio, null, "\t")}</pre>
    </>
  );
};

export default UseCaseFetchApi;
```

El componente puede ser desmontado cuando la promesa se resuelve y esto tratará de setear el estado que causará **fugas de memoria**.

## Ejecutar en el cambio de estado

### Validación de un input

La **validación de un input** mientras recibe caracteres es otra gran aplicación para **useEffect**.

Mientras la entrada se almacena en un estado usando **useState**, la validación tiene lugar cada vez que la entrada cambia, dando una **respuesta inmediata al usuario**.

```jsx {11-17}
import { useEffect, useState } from "react";

const UseCaseInputValidation = (props) => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length < 5 || /\d/.test(input)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [input]);

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>Running on state change: validating input field</h3>
      <form>
        <label htmlFor="input">
          Write something (more than 5 non numerical characters is a valid
          input)
        </label>
        <br />
        <input
          type="text"
          id="input"
          autoComplete="off"
          onChange={inputHandler}
          style={{ height: "1.5rem", width: "20rem", marginTop: "1rem" }}
        />
      </form>
      <p>
        <span
          style={
            isValid
              ? { backgroundColor: "lightgreen", padding: ".5rem" }
              : { backgroundColor: "lightpink", padding: ".5rem" }
          }
        >
          {isValid ? "Valid input" : "Input not valid"}
        </span>
      </p>
    </>
  );
};

export default UseCaseInputValidation;
```

### Live Filtering

Podemos utilizar **useEffect** para filtrar un array **sobre la marcha** escribiendo letras en un input.

Para ello, necesitaremos utilizar **useState** para guardar el input, y una implementación del **filtro dentro del useEffect** que se activará cuando la entrada cambie, gracias a las **dependencias** de useEffect.

```jsx {24-31}
import { useEffect, useState } from "react";

const array = [
  { key: "1", type: "planet", value: "Tatooine" },
  { key: "2", type: "starship", value: "Death Star" },
  { key: "3", type: "person", value: "Luke Skywalker" },
  { key: "4", type: "person", value: "Darth Vader" },
  { key: "5", type: "person", value: "Leia Organa" },
];

const UseCaseLiveFilter = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [filteredArray, setFilteredArray] = useState(array);

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const inputTypeHandler = (e) => {
    setInputType(e.target.value);
  };

  useEffect(() => {
    setFilteredArray((_) => {
      const newArray = array
        .filter((item) => item.value.includes(inputValue))
        .filter((item) => item.type.includes(inputType));
      return newArray;
    });
  }, [inputValue, inputType]);

  const listItems = filteredArray.map((item) => (
    <tr>
      <td style={{ border: "1px solid lightgray", padding: "0 1rem" }}>
        {item.type}
      </td>
      <td style={{ border: "1px solid lightgray", padding: "0 1rem" }}>
        {item.value}
      </td>
    </tr>
  ));

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>Running on state change: live filtering</h3>
      <form
        style={{
          maxWidth: "23rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <label htmlFor="input-type">
            Filter by <b>type</b>
          </label>
          <br />
          <input
            type="text"
            id="input-type"
            autoComplete="off"
            onChange={inputTypeHandler}
            style={{ height: "1.5rem", width: "10rem", marginTop: "1rem" }}
          />
        </div>
        <div>
          <label htmlFor="input-value">
            Filter by <b>value</b>
          </label>
          <br />
          <input
            type="text"
            id="input-value"
            autoComplete="off"
            onChange={inputValueHandler}
            style={{ height: "1.5rem", width: "10rem", marginTop: "1rem" }}
          />
        </div>
      </form>
      <br />
      <table
        style={{ width: "20rem", border: "1px solid gray", padding: "0 1rem" }}
      >
        <tr>
          <th>Type</th>
          <th>Value</th>
        </tr>
        {listItems}
      </table>
    </>
  );
};

export default UseCaseLiveFilter;
```

### Disparar una animación

Necesitaremos un **useState** para un **array de artículos**, y otro **useState** para disparar la animación.

Utilizando un temporizador dentro del **useEffect**, deberemos limpiarlo antes de que se establezca de nuevo utilizando el `return` del useEffect, que se ejecuta antes de que el cuerpo principal del gancho useEffect sea evaluado (excepto para el primer render).

```jsx {13,14,33-42}
import { useState, useEffect } from "react";
import classes from "./UseCaseAnimation.module.css";

const products = [
  "Death Star",
  "CR90 corvette",
  "Millennium Falcon",
  "X-wing fighter",
  "TIE fighter",
];

const UseCaseAnimation = (props) => {
  const [cart, setCart] = useState([]);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // Añadir artículo al carrito (array)
  const clickHandler = (e) => {
    e.preventDefault();
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.push(e.target.value);
      return newCart;
    });
  };

  // Borrar el carro (array)
  const clearHandler = (e) => {
    e.preventDefault();
    setCart([]);
  };

  // Activar la animación del carro
  useEffect(() => {
    setTriggerAnimation(true);

    const timer = setTimeout(() => {
      setTriggerAnimation(false);
    }, 900);

    // Borrar el temporizador antes de establecer uno nuevo
    return () => clearTimeout(timer);
  }, [cart]);

  const cartClasses = triggerAnimation
    ? `${classes["jello-horizontal"]} ${classes.cart}`
    : classes.cart;

  const itemsOnSale = products.map((itemOnSale) => {
    return (
      <li>
        <form>
          <span className={classes.item}>
            {itemOnSale}{" "}
            <button onClick={clickHandler} value={`"${itemOnSale}"`}>
              Add to cart
            </button>
          </span>
        </form>
      </li>
    );
  });

  const cartItems = cart.map((item) => {
    return <li>{item}</li>;
  });

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>Running on state change: trigger animation on new array value</h3>
      <h4 style={{ color: "blue" }}>Starship Marketplace</h4>
      <ul>{itemsOnSale}</ul>
      <div className={cartClasses}>
        <span>Cart</span>
      </div>
      <div>
        <p>Elements in cart:</p>
        <ul>{cartItems}</ul>
      </div>
      <form>
        <button className={classes.margin} onClick={clearHandler} value="clear">
          Clear cart
        </button>
      </form>
    </>
  );
};

export default UseCaseAnimation;
```

## Ejecutar en el cambio de props

### Actualizar lista en fetch API

Aquí estamos **enviando los datos** obtenidos a un **componente hijo**, y cada vez que esos datos cambian, el componente hijo los vuelve a procesar.

```jsx {6-10,33,64}
import { useState, useEffect } from "react";

const BaconParagraphs = ({ chopBacon }) => {
  const [baconParagraphText, setBaconParagraphText] = useState([]);

  useEffect(() => {
    setBaconParagraphText(
      chopBacon.map((piece) => <p key={Math.random()}>{piece}</p>)
    );
  }, [chopBacon]);

  return (
    <>
      <p>Number of paragraphs: {baconParagraphText.length}</p>
      {baconParagraphText}
    </>
  );
};

const UseCaseUpdateFetch = () => {
  const [bacon, setBacon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${e.target.paragraphs.value}&start-with-lorem=1`
    );
    const data = await response.json();
    setIsLoading(false);
    setBacon(data);
  };

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>
        Running on props change: update paragraph list on fetched API data
        update
      </h3>
      <form onSubmit={submitHandler}>
        <label
          htmlFor="paragraphs"
          style={{ display: "block", marginBottom: "1rem" }}
        >
          How many paragraphs of "Bacon ipsum" do you want?
        </label>
        <select id="paragraphs" name="paragraphs">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <input
          type="submit"
          value="Show me the bacon!"
          style={{ marginLeft: "1rem" }}
        />
        {isLoading && <span>Getting paragraphs... 🐷</span>}
      </form>
      <BaconParagraphs chopBacon={bacon} />
    </>
  );
};

export default UseCaseUpdateFetch;
```

### Actualizar precios BTC en fetch API

En este ejemplo, **useEffect** se utiliza para obtener nuevos datos de una API cada **3 segundos**.

El componente hijo useEffect recibe la hora como dependencia y cada vez que esa dependencia cambia, se lanza un nuevo fetch(). De esta manera, podemos tener un tipo de cambio de BTC actualizado en nuestra aplicación.

```jsx {19-36,52-57,68}
import { useState, useEffect } from "react";
import classes from "./UseCaseUpdateApi.module.css";

const getCurrentTime = () => {
  const now = new Date();
  const time =
    now.getHours() +
    ":" +
    ("0" + now.getMinutes()).slice(-2) +
    ":" +
    ("0" + now.getSeconds()).slice(-2);
  return time;
};

const ExchangeRate = ({ onTime }) => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const getExchangeRate = async () => {
      const response = await fetch("https://api.nomics.com/v1/23546");
      const data = await response.json();
      setExchangeRate(data.find((item) => item.currency === "BTC").rate);
    };
    getExchangeRate();

    setIsAnimated(true);
    const classTimer = setTimeout(() => {
      setIsAnimated(false);
    }, 1500);

    return () => {
      clearTimeout(classTimer);
      setExchangeRate(exchangeRate);
    };
  }, [onTime]);

  const priceClasses = isAnimated
    ? `${classes.price} ${classes.heartbeat}`
    : `${classes.price}`;

  return (
    <div className={priceClasses}>
      USD <b>{exchangeRate}</b>
    </div>
  );
};

const UseCaseUpdateApi = (props) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <hr />
      <h2>useEffect use case</h2>
      <h3>
        Running on props change: updating fetched API data to get updated BTC
        price
      </h3>
      <span>Last updated: {time} (polling every 3 seconds)</span>
      <ExchangeRate onTime={time} />
    </>
  );
};

export default UseCaseUpdateApi;
```
