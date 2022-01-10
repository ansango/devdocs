---
sidebar_position: 3
---

# Javascript Spread Tricks

`spread` permite a un elemento iterable como un array o cadena ser expandido en lugares donde cero o más argumentos o elementos son esperados, o a un objeto ser expandido en lugares donde cero o más pares de valores clave son esperados.

## Copiar

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1,2,3]
```

## Merge

```javascript
const fruits = ["🍉", "🍎"];
const vegetables = ["🥕"];
const fruitsAndVeg = [...fruits, ...vegetables]; // ['🍉', '🍎','🥕']
```

## Eliminar duplicados

```javascript
const arr = [1, 1, 1, 2];
const uniqueArr = [...new Set(arr)]; // [1, 2]
```

## Pasar como argumentos

```javascript
const arr = [1, 2, 3, 4, 5];
const minNum = Math.min(...arr); // 1
```

## Convertir un string a char

```javascript
const firstName = "Anibal";
const arrSplit = [...firstName]; // ['A', 'n', 'i', 'b', 'a', 'l']
```

Espero que te hayan gustado estos pequeños tips para utilizar `spread` ❤️
