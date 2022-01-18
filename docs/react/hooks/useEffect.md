---
sidebar_position: 2
---

# useEffect

Con **useEffect**, se invocan **efectos secundarios** desde los componentes funcionales, lo cual es un concepto importante que hay que entender.

Trabajar con los efectos secundarios invocados por el **Hook useEffect** puede parecer engorroso al principio, pero al final aprenderás que todo tiene mucho sentido.

Es clave entender completamente el flujo de componentes de los componentes funcionales.

## Conceptos básicos

En primer lugar, hay que empezar a pensar en los efectos. ¿Qué son realmente los efectos? Algunos ejemplos son:

- **Obtención de datos**
- **Lectura del localStorage**
- **Registrar y anular el registro de event listeners**

**useEffect** fomenta la separación de preocupaciones y reduce la duplicación de código.

### Conceptos clave del uso de los efectos

- Hay que entender **cuándo** se (re)renderizan los componentes porque los efectos se ejecutan **después de cada ciclo de renderizado**.

- Siempre se ejecutan después del renderizado, pero tienes **opciones para optar** por este comportamiento.

- Un efecto **sólo se vuelve a ejecutar** si al menos uno de los valores especificados en sus dependencias **ha cambiado desde el último ciclo de renderizado**.

- Hay que asegurarse de que los componentes no se vuelven a **renderizar innecesariamente**, así omitiremos las repeticiones innecesarias de los efectos.

- Las **funciones** definidas en el cuerpo de tu componente se recrean **en cada render**.

- Hay que pensar en el **estado asociado a los efectos**, ya que ejecutas efectos basados en los cambios de estado a través de los ciclos de renderizado.

### Utilizar siempre para tareas asíncronas

En lugar de escribir **código asíncrono sin useEffect** que podría **bloquear la UI**, utilizar useEffect es un patrón conocido en la comunidad React.

Además, los bloques useEffect son candidatos a extraerse en **Custom Hooks** reutilizables y aún más semánticos.

### Usar múltiples efectos para separar las preocupaciones

Aunque useEffect está diseñado para manejar una sola preocupación, **a veces necesitarás más de un efecto**.

Cuando intentas usar un solo efecto para múltiples propósitos, disminuye la legibilidad de tu código, y algunos casos de uso son directamente irrealizables.

### Momento de ejecución de los efectos

Los efectos definidos con useEffect **se invocan después del renderizado**. Para ser más específicos, se ejecutan tanto **después del primer renderizado** como **después de cada actualización**.

A diferencia de los métodos del ciclo de vida, los efectos **no bloquean** la UI porque se ejecutan de **forma asíncrona**.

Es bastante común "hacer algo" cuando el componente se renderiza por primera vez. Con los **Hooks** no se hace algo después de montar el componente, **se hace algo después de que el componente se presente por primera** vez al usuario.

Los Hooks te obligan a pensar más desde la perspectiva del usuario.

![img alt](/img/react/hooks.png)

## Cómo ejecutar los efectos secundarios con useEffect

Un **useEffect** así:

```jsx
useEffect(
  () => {
    // execute side effect
  },
  // optional dependency array
  [
    // 0 or more entries
  ]
);
```

Ya que el segundo parámetro es opcional la siguiente ejecución es totalmente válida:

```jsx
useEffect(() => {
  // execute side effect
});
```

### Sin array de dependencias

Veamos un ejemplo. El usuario puede cambiar el título del documento con un campo de entrada.

```jsx {7-10,14}
import { useState, useRef, useEffect } from "react";

const EffectsDemoNoDependency = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();

  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  });

  const handleClick = () => setTitle(titleRef.current.value);

  console.log("render");

  return (
    <div>
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
```

Como hemos omitido el segundo argumento (`[]`), este useEffect es llamado después de cada renderización. Como hemos implementado un input no controlado con la ayuda del hook **useRef**, `handleClick` sólo se invoca después de que el usuario haga clic en el botón. Esto provoca un re-renderizado porque `setTitle` realiza un cambio de estado.

**Después de cada ciclo de renderizado, useEffect se ejecuta de nuevo**.

![img alt](/img/react/render-cycle.gif)

### Renderizados innecesarios

Los dos primeros outputs se deben al renderizado inicial después de montar el componente. Ahora añadimos otro estado al ejemplo para alternar un modo oscuro.

```jsx
const EffectsDemoNoDependency = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  });

  console.log("render");

  const handleClick = () => setTitle(titleRef.current.value);
  const handleCheckboxChange = () => setDarkMode((prev) => !prev);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <label htmlFor="darkMode">dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
```

Sin embargo, este ejemplo conduce a **efectos innecesarios** cuando se hace click en darkMode.

![img alt](/img/react/dark-mode.gif)

### Bucle infinito de efectos

Echemos un vistazo al siguiente ejemplo e intentemos leer el título inicial del `localStorage`, si está disponible, en un useEffect adicional.

```jsx {5-8,10-14}
const EffectsDemoInfiniteLoop = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();

  useEffect(() => {
    console.log("useEffect title");
    document.title = title;
  });

  useEffect(() => {
    console.log("useEffect local storage");
    const persistedTitle = localStorage.getItem("title");
    setTitle(persistedTitle || []);
  });

  console.log("render");

  const handleClick = () => setTitle(titleRef.current.value);
  return (
    <div>
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
```

Como puedes ver, tenemos un **bucle infinito** de efectos porque **cada cambio** de estado con `setTitle` desencadena **otro efecto**, que actualiza el estado de nuevo.

![img alt](/img/react/loop.gif)

### La importancia del array de dependencias

Volviendo al ejemplo de **darkMode**. ¿Por qué tenemos el problema de los efectos innecesarios?

**Si no** se proporciona un array de dependencia, se ejecuta cada useEffect **después de cada ciclo de renderizado**.

Esto se gestiona con el **array de dependencias**. React sólo ejecuta el useEffect **si al menos una de las dependencias proporcionadas ha cambiado desde la ejecución anterior**.

La mayoría de las veces, queremos ejecutar los efectos secundarios **después de condiciones específicas**, por ejemplo, los datos han cambiado, una prop cambió, o el usuario ve por primera vez nuestro componente.

```jsx {6-9}
const EffectsDemoTwoStatesWithDep = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);

  console.log("render");

  const handleClick = () => setTitle(titleRef.current.value);
  const handleCheckboxChange = () => setDarkMode((prev) => !prev);

  return (
    <div className={darkMode ? "view dark-mode" : "view"}>
      <label htmlFor="darkMode">dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
```

Como ves los efectos sólo se invocan como se esperaba al pulsar el botón.

![img alt](/img/react/render-good.gif)

### Ejecutar el efecto solo una vez

También es posible añadir un **array de dependencias vacío**. En este caso, los efectos sólo se ejecutan una vez.

```jsx {5-8,10-14}
const EffectsDemoEffectOnce = () => {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();

  useEffect(() => {
    console.log("useEffect title");
    document.title = title;
  });

  useEffect(() => {
    console.log("useEffect local storage");
    const persistedTitle = localStorage.getItem("title");
    setTitle(persistedTitle || []);
  }, []);

  console.log("render");

  const handleClick = () => setTitle(titleRef.current.value);
  return (
    <div>
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
};
```

Acabamos de añadir un **array vacío** como segundo argumento. Debido a esto, **el efecto sólo se ejecuta una vez después del primer renderizado** y se omite para los siguientes ciclos de renderizado.

![img alt](/img/react/only-once.gif)

**El array de dependencias dice**: "Ejecuta el efecto proporcionado por el primer argumento después del siguiente ciclo de renderizado **siempre que uno de los argumentos cambie**". Sin embargo, **no tenemos ningún argumento**, por lo que las dependencias nunca cambiarán en el futuro.

### ¿Qué elementos deben incluirse en el array de dependencias?

Según la documentación de React, hay que incluir **todos los valores del ámbito del componente que cambian sus valores entre las repeticiones**.

Todos los valores externos referenciados dentro de la función callback useEffect, como props, variables de estado o variables de contexto, son dependencias del efecto. Los contenedores de ref (es decir, lo que se obtiene directamente de useRef() y no la propiedad actual) también son dependencias válidas. Incluso las variables locales, que se derivan de los valores mencionados, tienen que ser listadas en el array de dependencias.

Así que incluso si utilizas un valor no funcional dentro del efecto, y estás bastante seguro de que este valor es poco probable que cambie, debes incluir el valor en el array de dependencias.

## Utilización de cleanup functions

### Desmontar el componente hijo.

El siguiente código implementa un componente React que representa un contador que incrementa un número cada segundo. El componente padre renderiza el contador y permite destruirlo haciendo clic en un botón.

```jsx {4-8}
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(function () {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);

  return <p>and the counter counts {count}</p>;
};

const EffectsDemoUnmount = () => {
  const [unmount, setUnmount] = useState(false);
  const renderDemo = () => !unmount && <Counter />;

  return (
    <div>
      <button onClick={() => setUnmount(true)}>Unmount child component</button>
      {renderDemo()}
    </div>
  );
};
```

El componente hijo ha registrado un intervalo que invoca una función cada segundo. Sin embargo, el componente fue destruido sin anular el registro del intervalo. Después de destruir el componente, el intervalo sigue activo y quiere actualizar la variable de estado del componente (count), que ya no existe.

![img alt](/img/react/component-error.gif)

### Desmontar componente hijo y cleanup function

La solución es anular el registro del intervalo justo antes de desmontarlo.

Esto es posible con una **cleanup function**. Por lo tanto, hay que devolver una función de callback dentro del cuerpo de callback del efecto.

```jsx {7}
useEffect(() => {
  const interval = setInterval(function () {
    setCount((prev) => prev + 1);
  }, 1000);
  // return optional function for cleanup
  // in this case acts like componentWillUnmount
  return () => clearInterval(interval);
}, []);
```

Las **cleanup functions** no sólo se invocan **antes de destruir el componente** React, también se invocan cada vez, **justo antes de la ejecución del siguiente efecto programado**.

```jsx
useEffect(() => {
  console.log("useEffect");
  const interval = setInterval(function () {
    setCount(count + 1);
  }, 1000);
  // return optional function for cleanup
  // in this case, this cleanup fn is called every time count changes
  return () => {
    console.log("cleanup");
    clearInterval(interval);
  };
}, [count]);
```

![img alt](/img/react/multiple-times.gif)
