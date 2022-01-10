---
sidebar_position: 2
---

# Javascript Array

Esta chuleta es un pequeño resumen sobre arrays en JavaScript, me la mandó mi compañero David y me parece tan intuitiva que he decidido apuntármela.

## Propiedades estáticas

```javascript
//Crea un array desde un string

Array.from("🍐🍉🍒"); // output: ['🍐', '🍉', '🍒']
```

```javascript
// Comprueba si es un array

Array.isArray(["🍐", "🍉", "🍒"]); // output: true
```

```javascript
// Crea un array con los elementos pasados

Array.of("🍐", "🍉", "🍒"); // output: ['🍐', '🍉', '🍒']
```

## Propiedades de la instancia

```javascript
// Une dos arrays

["🍐", "🍉"].concat(["🍒", "🍌"]); // output: ['🍐', '🍉','🍒', '🍌']
```

```javascript
// Copia los dos primeros elementos en la posición de los dos últimos

["🍐", "🍉", "🍒", "🍌"].copyWithin(2, 0); // output: ['🍐', '🍉', '🍐', '🍉']
```

```javascript
// Devuelve un array si hay match ❤️

["🍐", "🍉", "🍒"].filter((fruit) => fruit === "🍒"); // output: ['🍒']
```

```javascript
//Rellena un array con 🍑

["🍐", "🍉", "🍒"].fill("🍑"); // output: ['🍑', '🍑', '🍑', '🍑']
```

```javascript
// Busca el primer elemento en el array que coincida con '🍒'

["🍐", "🍉", "🍒"].find((fruit) => fruit === "🍒"); // output: '🍒'
```

```javascript
// Obtiene la posición de '🍒'

["🍐", "🍉", "🍒"].indexOf("🍒"); // output: 2
```

```javascript
// Devuelve la posición de la condición

["🍐", "🍉", "🍒"].findIndex((fruit) => fruit === "🍒"); // output: 2
```

```javascript
// Ejecuta una función por cada elemento del array

["🍐", "🍉", "🍒"].forEach((fruit) => console.log(fruit)); // output: 🍐, 🍉, 🍒
```

```javascript
// Devuelve un nuevo array al ejecutar una función por cada elemento del array

["🍐", "🍉", "🍒"].map((fruit) => console.log(fruit)); // output: 🍐, 🍉, 🍒
```

```javascript
// Comprueba si cada elemento del array tiene el valor de 🍒

["🍐", "🍉", "🍒"].every((fruit) => fruit === "🍒"); // output: false
```

```javascript
// Comprueba si al menos un elemento del array tiene el valor de 🍒

["🍐", "🍉", "🍒"].some((fruit) => fruit === "🍒"); // output: true
```

```javascript
// Comprueba si el array tiene '🍇'

["🍐", "🍉", "🍒"].includes("🍇"); // output: false
```

```javascript
// Une los elementos del array en un string

["🍐", "🍉", "🍒"].join(" - "); // output: '🍐 - 🍉 - 🍒'
```

```javascript
// Elimina y devuelve el último elemento del array

["🍐", "🍉", "🍒"].pop(); // output: 🍒
```

```javascript
// Añade un nuevo elemento al final del array y devuelve si longitud

["🍐", "🍉", "🍒"].push("🍌"); // output: 4
```

```javascript
// Invierte el orden de los elementos del array

["🍐", "🍉", "🍒"].reverse(); // output: ['🍒', '🍉', '🍐']
```

```javascript
// Añade / Elimina elementos

["🍐", "🍉", "🍒"].splice(1, 2); // output: ['🍐']
```

```javascript
// Selecciona una parte de un array y devuelve el nuevo array

["🍐", "🍉", "🍒"].slice(1, 2); // output: ['🍉']
```

```javascript
// Convierte un array en un string y devuelve su resultado

["🍐", "🍉", "🍒"].toString(); // output: '🍐, 🍉, 🍒'
```

```javascript
// Elimina el primer elemento de un array devuelve el resultado

["🍐", "🍉", "🍒"].shift(); // output: '🍐'
```

```javascript
// Añade nuevos elementos al inicio del array y devuelve la nueva longitud

["🍐", "🍉", "🍒"].unshift("🍌"); // output: 4
```

```javascript
// Reduce los valores de un array a un único valor

["🍐", "🍉", "🍒"].reduce((acc, el) => acc + el, "🍉"); // output: '🍉 🍐 🍉 🍒'
```

Puedes ver los siguientes artículos para completar info si te quedaste corto:

- <a href="/chuletas/javascript" target="_blank" rel="noopener noreferrer">
    Javascript 📑
  </a>
- <a href="/javascript/array-methods" target="_blank" rel="noopener noreferrer">
    Array Medthods ⭐
  </a>
